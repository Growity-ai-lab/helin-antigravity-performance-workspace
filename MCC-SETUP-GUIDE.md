# 🏢 Google Ads Manager Account (MCC) Kurulum Rehberi

## Manager Account (MCC) Nedir?

**Manager Account**, ajanslar için Google Ads hesaplarını merkezi yönetme sistemidir.

### Avantajları:
- ✅ Tek API bağlantısı ile tüm client hesaplarına erişim
- ✅ Hesaplar arası kolay geçiş
- ✅ Konsolide raporlama
- ✅ Toplu değişiklikler
- ✅ Tek dashboard'dan tüm hesapları izleme

---

## 🚀 Manager Account Kurulumu

### Adım 1: MCC Hesabı Oluştur

1. **Google Ads Manager hesabı oluştur**:
   - https://ads.google.com/home/tools/manager-accounts/
   - "Create a manager account" tıklayın

2. **Bilgileri doldurun**:
   - Account name: "Helin Antigravity Performance"
   - Billing country: Turkey
   - Time zone: Istanbul
   - Currency: TRY (veya USD)

3. **Hesabı kaydedin**

### Adım 2: Client Hesaplarını Bağla

#### Yöntem A: Mevcut Hesapları Link Et
1. MCC hesabınızda "Accounts" → "Performance"
2. "+ Link existing account"
3. Client'ın Customer ID'sini girin
4. Client hesabında daveti onaylayın

#### Yöntem B: Yeni Hesap Oluştur
1. MCC hesabınızda "+ New account"
2. Client bilgilerini girin
3. Otomatik olarak MCC'ye bağlanır

### Adım 3: API Access

MCC ID'nizi kullanarak tüm client hesaplarına erişin:

```javascript
// Tek MCC ID ile tüm hesaplara erişim
const MCC_ID = "123-456-7890";
const CLIENT_IDS = ["111111", "222222", "333333"];

// Her client için veri çek
for (const clientId of CLIENT_IDS) {
  const data = await fetchGoogleAdsData(clientId, MCC_ID);
}
```

---

## 📊 API ile Tüm Hesapları Çekme

### Tüm Client Hesaplarını Listele

```javascript
const query = `
  SELECT
    customer_client.id,
    customer_client.descriptive_name,
    customer_client.currency_code,
    customer_client.status
  FROM customer_client
  WHERE customer_client.status = 'ENABLED'
`;

// MCC ID ile çalıştır
const response = await axios.post(
  `https://googleads.googleapis.com/v18/customers/${MCC_ID}/googleAds:searchStream`,
  { query },
  { headers: { /* ... */ } }
);
```

### Her Client İçin Metrikleri Çek

```javascript
const clients = response.data.results;

for (const client of clients) {
  const clientId = client.customerClient.id;

  // Client'ın kampanya verilerini çek
  const campaignQuery = `
    SELECT
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros
    FROM campaign
    WHERE segments.date DURING LAST_7_DAYS
  `;

  const campaignData = await fetchWithClient(clientId);
}
```

---

## 🎯 Meta Business Manager Kurulumu

### Adım 1: Business Manager Oluştur

1. **Business Manager'a git**:
   - https://business.facebook.com/
   - "Create Account"

2. **Bilgileri doldurun**:
   - Business name: "Helin Antigravity Performance"
   - Your name
   - Email

### Adım 2: Ad Account'ları Ekle

1. **Business Settings** → **Accounts** → **Ad Accounts**
2. **Add** → "Request Access to an Ad Account"
3. Client'ın Ad Account ID'sini girin
4. İzin türünü seçin: "Manage ad account"

### Adım 3: System User (Kalıcı Token)

1. **Business Settings** → **Users** → **System Users**
2. **Add** → "Helin Performance API"
3. **Assign Assets** → Tüm ad account'ları ekle
4. **Generate Token**:
   - Permissions: `ads_read`, `ads_management`
   - **Token'ı kaydet** (bu token süresi dolmaz!)

---

## 🔧 Dashboard Entegrasyonu

### Multi-Account API Server

```javascript
// api-server-multi-account.js

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const accounts = require('./accounts-config.json');

app.get('/api/all-accounts', async (req, res) => {
  const results = [];

  for (const client of accounts.clients) {
    if (client.status !== 'active') continue;

    // Google Ads data
    const googleData = await fetchGoogleAds(
      client.google_ads.customer_id,
      process.env.GOOGLE_MCC_ID
    );

    // Meta Ads data
    const metaData = await fetchMetaAds(
      client.meta_ads.ad_account_id,
      process.env.META_SYSTEM_USER_TOKEN
    );

    results.push({
      client: client.name,
      google: googleData,
      meta: metaData,
      budget: client.budget
    });
  }

  res.json(results);
});
```

### Dashboard'da Hesap Seçici

```html
<select id="clientSelector" onchange="switchClient()">
  <option value="all">Tüm Hesaplar</option>
  <option value="client-001">Prada Turkey</option>
  <option value="client-002">Gucci Istanbul</option>
  <option value="client-003">Sample Client</option>
</select>

<script>
function switchClient() {
  const selectedClient = document.getElementById('clientSelector').value;

  if (selectedClient === 'all') {
    // Tüm hesapların toplamını göster
    showAggregateData();
  } else {
    // Seçilen hesabın datasını göster
    showClientData(selectedClient);
  }
}
</script>
```

---

## 📋 .env Dosyası (Multi-Account)

```env
# Google Ads MCC
GOOGLE_MCC_ID=1234567890
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_DEVELOPER_TOKEN=your_token
GOOGLE_REFRESH_TOKEN=your_refresh_token

# Meta Business Manager
META_BUSINESS_ID=your_business_id
META_SYSTEM_USER_TOKEN=your_system_user_token

# Config
ACCOUNTS_CONFIG_PATH=./accounts-config.json
USD_TO_TRY_RATE=34.0
```

---

## 🎨 Dashboard Özellikleri

### 1. Konsolide View
```
┌─────────────────────────────────────┐
│  Tüm Hesaplar - Özet                │
├─────────────────────────────────────┤
│  Toplam Harcama:     ₺2,450,000    │
│  Toplam Dönüşüm:     3,450         │
│  Ortalama ROAS:      3.8x          │
│  Aktif Kampanya:     127           │
└─────────────────────────────────────┘
```

### 2. Client Bazlı View
```
┌─────────────────────────────────────┐
│  Prada Turkey                       │
├─────────────────────────────────────┤
│  Google Ads:    ₺850,000           │
│  Meta Ads:      ₺650,000           │
│  ROAS:          4.2x               │
│  Status:        🟢 Active          │
└─────────────────────────────────────┘
```

### 3. Karşılaştırma View
```
Client         | Budget    | Spend     | ROAS | Status
─────────────────────────────────────────────────────
Prada Turkey   | ₺50,000  | ₺48,500   | 4.2x | 🟢
Gucci Istanbul | ₺75,000  | ₺72,300   | 3.8x | 🟢
Sample Client  | ₺25,000  | ₺0        | 0.0x | 🔴
```

---

## 🚀 Hızlı Başlangıç

### 1. MCC ve Business Manager Kur
- Google MCC oluştur
- Meta Business Manager oluştur
- Client hesaplarını bağla

### 2. accounts-config.json Düzenle
- Tüm client bilgilerini ekle
- Customer ID ve Ad Account ID'leri gir

### 3. API Token'ları Al
- Google: Mevcut setup ile devam
- Meta: System User token al

### 4. Dashboard'u Güncelle
- Multi-account desteği ekle
- Hesap seçici implement et

---

## 📞 Yardım

**MCC Kurulum Sorunları**:
- https://support.google.com/google-ads/answer/6139186

**Business Manager**:
- https://www.facebook.com/business/help

**API Documentation**:
- Google MCC: https://developers.google.com/google-ads/api/docs/account-management
- Meta Business: https://developers.facebook.com/docs/marketing-api/business-manager

---

**Sonraki Adım**: MCC ve Business Manager kurulumunu yapın, sonra multi-account dashboard'u birlikte implement edelim!
