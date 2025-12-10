# 📡 API Setup Guide - Helin Performance Dashboard

## 🎯 Meta Ads API Kurulumu

### 1. Meta Developer Hesabı
**Link**: https://developers.facebook.com/

#### Adımlar:
1. **Create App** tıklayın
2. **Use case**: "Other" → "Business"
3. **App name**: "Helin Performance Dashboard"
4. Marketing API ekleyin

### 2. Access Token Alma
1. Tools → Access Token Tool
2. **Permissions**:
   - `ads_read`
   - `ads_management`
   - `business_management`
3. "Generate Token" → Token'ı kaydedin

### 3. Ad Account ID
- Business Manager → Ad Accounts
- URL'deki `act_123456789` formatındaki ID'yi kopyalayın

### 4. Test API
```bash
curl -G \
  -d "access_token=YOUR_TOKEN" \
  -d "fields=name,insights{spend,impressions,clicks}" \
  "https://graph.facebook.com/v18.0/act_YOUR_ACCOUNT_ID/campaigns"
```

---

## 🔍 Google Ads API Kurulumu

### 1. Google Cloud Project
**Link**: https://console.cloud.google.com/

#### Adımlar:
1. "New Project" → "Helin Performance Dashboard"
2. APIs & Services → Library
3. "Google Ads API" → Enable

### 2. OAuth Credentials
1. Credentials → Create Credentials → OAuth client ID
2. **Type**: Web application
3. **Redirect URI**: `http://localhost:3000/callback`
4. **Client ID** ve **Secret** kaydedin

### 3. Developer Token
**Link**: https://ads.google.com/ → Tools → API Center

1. "Apply for Developer Token"
2. **Purpose**: "Performance tracking dashboard"
3. Form doldurun → Submit
4. ⏳ Onay 1-2 gün sürer
5. Onaylandıktan sonra token'ı kaydedin

### 4. Customer ID
- Google Ads hesabınızda sağ üstteki 10 haneli numara
- Örnek: `123-456-7890` → `1234567890` (tire olmadan)

### 5. Refresh Token Alma

**Python Script**:
```python
# pip install google-auth-oauthlib

from google_auth_oauthlib.flow import InstalledAppFlow

CLIENT_ID = "your_client_id"
CLIENT_SECRET = "your_client_secret"

flow = InstalledAppFlow.from_client_config(
    {
        "installed": {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://accounts.google.com/o/oauth2/token",
        }
    },
    scopes=["https://www.googleapis.com/auth/adwords"],
)

credentials = flow.run_local_server(port=0)
print(f"Refresh token: {credentials.refresh_token}")
```

**Veya OAuth Playground kullanın**:
1. https://developers.google.com/oauthplayground/
2. Scope: `https://www.googleapis.com/auth/adwords`
3. "Authorize APIs" → Google hesabınızla giriş
4. "Exchange authorization code for tokens"
5. Refresh token'ı kopyalayın

---

## 🚀 Backend API Server Kurulumu

### 1. Gerekli Paketler
```bash
npm init -y
npm install express axios dotenv cors
```

### 2. .env Dosyası Oluşturma
```bash
cp .env.example .env
```

Ardından `.env` dosyasını düzenleyin:
```env
# Meta Ads
META_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxx
META_AD_ACCOUNT_ID=act_1234567890

# Google Ads
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_DEVELOPER_TOKEN=xxx
GOOGLE_CUSTOMER_ID=1234567890
GOOGLE_REFRESH_TOKEN=xxx

# Config
USD_TO_TRY_RATE=34.0
PORT=3000
```

### 3. API Server Çalıştırma
```bash
node api-server-example.js
```

Test etmek için:
```bash
# Meta Ads
curl http://localhost:3000/api/meta-ads

# Google Ads
curl http://localhost:3000/api/google-ads
```

---

## 🔌 Dashboard'a Bağlama

### dashboard.html içinde:
```javascript
const API_CONFIG = {
    enabled: true, // false → true yapın
    metaAdsEndpoint: 'http://localhost:3000/api/meta-ads',
    googleAdsEndpoint: 'http://localhost:3000/api/google-ads',
    updateInterval: 300000, // 5 dakika
    exchangeRate: 34.0
};
```

---

## 📊 API Response Formatı

### Meta Ads Response
```json
{
  "spend": 12500,
  "conversions": 480,
  "cpa": 26.0,
  "cpc": 0.76,
  "impressions": 820000,
  "ctr": 2.1,
  "roas": 3.2
}
```

### Google Ads Response
```json
{
  "spend": 9800,
  "conversions": 220,
  "cpa": 44.5,
  "cpc": 1.36,
  "clicks": 7200,
  "roas": 2.1
}
```

---

## 🔐 Güvenlik

### Production'da Yapılması Gerekenler:

1. **Environment Variables**:
   - `.env` dosyasını `.gitignore`'a ekleyin
   - Production'da environment variables kullanın

2. **HTTPS**:
   - API server'ı HTTPS ile çalıştırın
   - SSL sertifikası ekleyin

3. **Rate Limiting**:
   ```bash
   npm install express-rate-limit
   ```

4. **Authentication**:
   - API endpoint'lerine authentication ekleyin
   - API key veya JWT kullanın

---

## 🚀 Production Deployment

### Hosting Seçenekleri:

1. **Heroku** (Kolay):
   ```bash
   heroku create helin-dashboard-api
   heroku config:set META_ACCESS_TOKEN=xxx
   git push heroku main
   ```

2. **Vercel** (Serverless):
   - `vercel.json` oluşturun
   - `vercel deploy`

3. **AWS Lambda** (Scalable):
   - Serverless Framework kullanın
   - API Gateway ile entegre edin

---

## 📝 Troubleshooting

### Meta Ads API Hataları:
- **Error 190**: Token expired → Yeni token alın
- **Error 100**: Invalid parameter → Field names kontrol edin
- **Error 80004**: Rate limit → Request sayısını azaltın

### Google Ads API Hataları:
- **UNAUTHORIZED**: Developer token onaylanmamış
- **INVALID_CUSTOMER_ID**: Customer ID yanlış (tire olmadan yazın)
- **TOKEN_EXPIRED**: Refresh token ile yeni access token alın

---

## 📞 Yardım

### Resmi Dokümantasyonlar:
- **Meta Ads**: https://developers.facebook.com/docs/marketing-apis
- **Google Ads**: https://developers.google.com/google-ads/api/docs

### Meta Ads Test Tool:
https://developers.facebook.com/tools/explorer/

### Google Ads Query Builder:
https://developers.google.com/google-ads/api/fields/v14/overview

---

## ✅ Checklist

### Meta Ads:
- [ ] Developer hesabı oluşturuldu
- [ ] App oluşturuldu
- [ ] Marketing API eklendi
- [ ] Access token alındı
- [ ] Ad Account ID bulundu
- [ ] API test edildi

### Google Ads:
- [ ] Google Cloud project oluşturuldu
- [ ] Google Ads API enabled
- [ ] OAuth credentials oluşturuldu
- [ ] Developer token başvurusu yapıldı
- [ ] Developer token onaylandı
- [ ] Customer ID bulundu
- [ ] Refresh token alındı
- [ ] API test edildi

### Backend:
- [ ] Node.js kurulu
- [ ] Dependencies yüklendi
- [ ] .env dosyası oluşturuldu
- [ ] API server çalışıyor
- [ ] Endpoints test edildi

### Dashboard:
- [ ] API_CONFIG.enabled = true
- [ ] Endpoint URLs güncellendi
- [ ] Dashboard test edildi
- [ ] Auto-refresh çalışıyor

---

**Not**: API token'larınızı asla GitHub'a yüklemeyin! `.gitignore`'a `.env` ekleyin.
