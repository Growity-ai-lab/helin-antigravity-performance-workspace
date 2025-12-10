# ✅ Google Ads API Setup Checklist

## İlerleme Takibi

### 1. Google Cloud Project ✓
- [ ] https://console.cloud.google.com/ ziyaret edildi
- [ ] Yeni proje oluşturuldu: "Helin Performance Dashboard"
- [ ] Proje seçildi

### 2. Google Ads API Enable ✓
- [ ] APIs & Services → Library açıldı
- [ ] "Google Ads API" arandı
- [ ] ENABLE tıklandı
- [ ] API aktif durumda

### 3. OAuth 2.0 Credentials ✓
- [ ] OAuth consent screen yapılandırıldı
  - [ ] User Type: External
  - [ ] App name: Helin Dashboard
  - [ ] Email adresleri eklendi
- [ ] OAuth client ID oluşturuldu
  - [ ] Application type: Web application
  - [ ] Redirect URI: http://localhost:8080
- [ ] **Client ID kaydedildi**: `___________________________`
- [ ] **Client Secret kaydedildi**: `___________________________`

### 4. Developer Token ⏳
- [ ] https://ads.google.com/ → Tools → API Center açıldı
- [ ] "Apply for Developer Token" tıklandı
- [ ] Form dolduruldu:
  - [ ] Token purpose açıklandı
  - [ ] Use case belirtildi
- [ ] Başvuru gönderildi
- [ ] **Onay bekleniyor** (1-2 gün)
- [ ] **Developer Token alındı**: `___________________________`

### 5. Customer ID ✓
- [ ] Google Ads hesabına giriş yapıldı
- [ ] Sağ üstteki 10 haneli numara bulundu
- [ ] Tireler (-) kaldırıldı
- [ ] **Customer ID**: `___________________________`

### 6. Refresh Token ⏳
**Seçenek A: OAuth Playground (Kolay)**
- [ ] https://developers.google.com/oauthplayground/ açıldı
- [ ] Settings → Use your own OAuth credentials işaretlendi
- [ ] Client ID ve Secret girildi
- [ ] Scope eklendi: `https://www.googleapis.com/auth/adwords`
- [ ] "Authorize APIs" tıklandı
- [ ] Google hesabıyla giriş yapıldı
- [ ] "Exchange authorization code for tokens" tıklandı
- [ ] **Refresh Token kaydedildi**: `___________________________`

**Seçenek B: Python Script**
- [ ] Python scripti hazırlandı
- [ ] google-auth-oauthlib kuruldu
- [ ] Script çalıştırıldı
- [ ] **Refresh Token alındı**: `___________________________`

### 7. .env Dosyası Yapılandırması ✓
- [ ] .env.example kopyalandı → .env
- [ ] GOOGLE_CLIENT_ID dolduruldu
- [ ] GOOGLE_CLIENT_SECRET dolduruldu
- [ ] GOOGLE_DEVELOPER_TOKEN dolduruldu
- [ ] GOOGLE_CUSTOMER_ID dolduruldu
- [ ] GOOGLE_REFRESH_TOKEN dolduruldu

### 8. API Test ✓
- [ ] Node.js kurulu
- [ ] Dependencies yüklendi: `npm install`
- [ ] API server başlatıldı: `node api-server-example.js`
- [ ] Test endpoint çağrıldı: `curl http://localhost:3000/api/google-ads`
- [ ] **Başarılı response alındı** ✅

---

## 📝 Notlar

### Developer Token Başvurusu İçin Örnek Metin:
```
Purpose: Performance Marketing Dashboard
Use Case: We are building an internal dashboard to track and analyze Google Ads
performance metrics for our client accounts. The API will be used to fetch campaign
data including spend, conversions, CPA, and ROAS for real-time performance monitoring
and optimization.

Expected API Calls: ~1000 requests per day
Access Level: Read-only access to campaign metrics
```

### Yaygın Hatalar ve Çözümleri:

**Hata 1**: "Developer token is not approved"
- **Çözüm**: Developer token başvurunuz henüz onaylanmamış. Test için
  geçici olarak test account kullanabilirsiniz.

**Hata 2**: "Customer ID is invalid"
- **Çözüm**: Customer ID'yi tire (-) olmadan girin. Örn: 1234567890

**Hata 3**: "Refresh token expired"
- **Çözüm**: OAuth Playground'dan yeni refresh token alın.

**Hata 4**: "Insufficient permissions"
- **Çözüm**: OAuth consent screen'de gerekli scope'ları eklediğinizden emin olun.

---

## 🚀 Hızlı Test

API kurulumu tamamlandıktan sonra:

```bash
# 1. Dependencies kur
npm install express axios dotenv cors

# 2. .env dosyasını kontrol et
cat .env

# 3. Server'ı başlat
node api-server-example.js

# 4. Test et
curl http://localhost:3000/api/google-ads
```

Başarılı response:
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

## 📞 Yardım Linkleri

- **Google Cloud Console**: https://console.cloud.google.com/
- **Google Ads**: https://ads.google.com/
- **OAuth Playground**: https://developers.google.com/oauthplayground/
- **API Documentation**: https://developers.google.com/google-ads/api/docs
- **Support**: https://developers.google.com/google-ads/api/support

---

**Son Güncelleme**: 2025-12-10
