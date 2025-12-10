#!/usr/bin/env node
/**
 * Google Ads API Test Script
 * Bu script Google Ads API bağlantısını test eder
 */

const axios = require('axios');
require('dotenv').config();

async function getAccessToken() {
  console.log('🔄 Access token alınıyor...');

  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    });

    console.log('✅ Access token başarıyla alındı!\n');
    return response.data.access_token;
  } catch (error) {
    console.error('❌ Access token hatası:', error.response?.data || error.message);
    throw error;
  }
}

async function testGoogleAdsAPI() {
  console.log('🚀 Google Ads API Test Başlıyor...\n');
  console.log('📋 Kullanılan bilgiler:');
  console.log('   Customer ID:', process.env.GOOGLE_CUSTOMER_ID);
  console.log('   Developer Token:', process.env.GOOGLE_DEVELOPER_TOKEN?.substring(0, 10) + '...');
  console.log('');

  try {
    // 1. Access token al
    const accessToken = await getAccessToken();

    // 2. Google Ads API'ye basit bir sorgu gönder (hesap bilgisi)
    console.log('📊 Hesap bilgileri çekiliyor...');

    const query = `
      SELECT
        customer.id,
        customer.descriptive_name,
        customer.currency_code,
        customer.time_zone,
        customer.status
      FROM customer
      LIMIT 1
    `;

    const response = await axios.post(
      `https://googleads.googleapis.com/v18/customers/${process.env.GOOGLE_CUSTOMER_ID}/googleAds:search`,
      { query },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'developer-token': process.env.GOOGLE_DEVELOPER_TOKEN,
          'login-customer-id': process.env.GOOGLE_CUSTOMER_ID,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('\n✅ API BAĞLANTISI BAŞARILI!\n');

    if (response.data.results && response.data.results.length > 0) {
      console.log('📈 Hesap Bilgileri:\n');

      const customer = response.data.results[0].customer;

      console.log(`   ID: ${customer.id}`);
      console.log(`   İsim: ${customer.descriptiveName || 'N/A'}`);
      console.log(`   Para Birimi: ${customer.currencyCode}`);
      console.log(`   Zaman Dilimi: ${customer.timeZone}`);
      console.log(`   Durum: ${customer.status}`);
      console.log('');
    } else {
      console.log('ℹ️  Hesap bilgisi bulunamadı.');
    }

    console.log('═══════════════════════════════════════════════');
    console.log('🎉 TEST BAŞARILI! Google Ads API çalışıyor!');
    console.log('═══════════════════════════════════════════════\n');

  } catch (error) {
    console.log('\n═══════════════════════════════════════════════');
    console.error('❌ HATA:', error.response?.data?.error || error.message);
    console.log('═══════════════════════════════════════════════\n');

    if (error.response?.data) {
      console.log('Detaylı Hata:', JSON.stringify(error.response.data, null, 2));
    }

    // Yaygın hatalar için çözüm önerileri
    if (error.response?.status === 401) {
      console.log('\n💡 Çözüm: Developer token henüz onaylanmamış olabilir.');
      console.log('   Test account ile deneyin veya onay bekleyin.');
    }

    process.exit(1);
  }
}

// Script'i çalıştır
testGoogleAdsAPI();
