// API Server Örneği - Node.js + Express
// npm install express axios dotenv

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

// CORS için
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Meta Ads API Endpoint
app.get('/api/meta-ads', async (req, res) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${process.env.META_AD_ACCOUNT_ID}/insights`,
      {
        params: {
          access_token: process.env.META_ACCESS_TOKEN,
          fields: 'spend,impressions,clicks,actions,cpc,cpm,ctr',
          date_preset: 'last_7d',
          time_increment: 1
        }
      }
    );

    const data = response.data.data[0];

    // Conversions hesaplama (actions içinden)
    const conversions = data.actions?.find(
      action => action.action_type === 'purchase'
    )?.value || 0;

    res.json({
      spend: parseFloat(data.spend),
      conversions: parseInt(conversions),
      cpa: parseFloat(data.spend) / parseInt(conversions),
      cpc: parseFloat(data.cpc),
      impressions: parseInt(data.impressions),
      ctr: parseFloat(data.ctr),
      roas: calculateROAS(data) // Kendi hesaplamanız
    });
  } catch (error) {
    console.error('Meta Ads API Error:', error);
    res.status(500).json({ error: 'Failed to fetch Meta Ads data' });
  }
});

// Google Ads API Endpoint
app.get('/api/google-ads', async (req, res) => {
  try {
    const response = await axios.post(
      `https://googleads.googleapis.com/v14/customers/${process.env.GOOGLE_CUSTOMER_ID}/googleAds:search`,
      {
        query: `
          SELECT
            metrics.cost_micros,
            metrics.conversions,
            metrics.clicks,
            metrics.average_cpc
          FROM campaign
          WHERE segments.date DURING LAST_7_DAYS
        `
      },
      {
        headers: {
          'Authorization': `Bearer ${await getGoogleAccessToken()}`,
          'developer-token': process.env.GOOGLE_DEVELOPER_TOKEN,
          'login-customer-id': process.env.GOOGLE_CUSTOMER_ID,
          'Content-Type': 'application/json'
        }
      }
    );

    const metrics = response.data.results[0].metrics;

    res.json({
      spend: metrics.cost_micros / 1000000, // Micros'tan dolara çevir
      conversions: metrics.conversions,
      cpa: (metrics.cost_micros / 1000000) / metrics.conversions,
      cpc: metrics.average_cpc / 1000000,
      clicks: metrics.clicks,
      roas: calculateGoogleROAS(metrics)
    });
  } catch (error) {
    console.error('Google Ads API Error:', error);
    res.status(500).json({ error: 'Failed to fetch Google Ads data' });
  }
});

// Google Access Token yenileme
async function getGoogleAccessToken() {
  const response = await axios.post('https://oauth2.googleapis.com/token', {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  });

  return response.data.access_token;
}

// ROAS hesaplama fonksiyonları (örnek)
function calculateROAS(data) {
  // Kendi revenue tracking sisteminizle entegre edin
  return 3.2; // Placeholder
}

function calculateGoogleROAS(metrics) {
  return 2.1; // Placeholder
}

app.listen(PORT, () => {
  console.log(`✅ API Server running on http://localhost:${PORT}`);
  console.log(`Meta Ads: http://localhost:${PORT}/api/meta-ads`);
  console.log(`Google Ads: http://localhost:${PORT}/api/google-ads`);
});
