# 🎉 Google Ads API Kurulum Özeti

## ✅ Tamamlanan Adımlar

### 1. Google Cloud Project
- ✓ Project oluşturuldu: "Helin Performance Dashboard"
- ✓ Google Ads API enable edildi
- ✓ OAuth 2.0 credentials oluşturuldu

### 2. OAuth Kimlik Bilgileri
- ✓ **Client ID**: Oluşturuldu ve `.env` dosyasına kaydedildi
- ✓ **Client Secret**: Oluşturuldu ve `.env` dosyasına kaydedildi
- ✓ Redirect URIs yapılandırıldı:
  - `http://localhost:8080/`
  - `https://developers.google.com/oauthplayground`

### 3. OAuth Consent Screen
- ✓ App published (Production mode)
- ✓ Scopes eklendi: `https://www.googleapis.com/auth/adwords`

### 4. Refresh Token
- ✓ Python script ile başarıyla oluşturuldu
- ✓ Token `.env` dosyasına kaydedildi

### 5. Google Ads Bilgileri
- ✓ **Customer ID**: Oluşturuldu ve `.env` dosyasına kaydedildi
- ✓ **Developer Token**: Başvuru yapıldı ve `.env` dosyasına kaydedildi
- ⏳ Developer Token başvurusu yapıldı (1-2 gün içinde onaylanacak)

### 6. Proje Dosyaları
- ✓ `.env` - Environment variables (güvenlik için .gitignore'da)
- ✓ `get-refresh-token.py` - OAuth token generator script
- ✓ `test-google-ads-api.js` - API test script
- ✓ `google-ads-setup-checklist.md` - Detaylı kurulum rehberi
- ✓ `package.json` - Node.js dependencies

---

## 📋 .env Dosyası Formatı

Tüm credentials `.env` dosyasında güvenli bir şekilde saklanıyor:

```env
# Google Ads API Credentials
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_DEVELOPER_TOKEN=your_developer_token_here
GOOGLE_CUSTOMER_ID=your_customer_id_here
GOOGLE_REFRESH_TOKEN=your_refresh_token_here

# Meta Ads API Credentials
META_ACCESS_TOKEN=your_meta_access_token_here
META_AD_ACCOUNT_ID=act_your_account_id_here

# Configuration
USD_TO_TRY_RATE=34.0
PORT=3000
```

**NOT**: Gerçek değerler `.env` dosyasında mevcuttur ve `.gitignore` ile korunmaktadır.

---

## ⏳ Bekleyen İşlemler

### Developer Token Onayı
- **Durum**: Başvuru yapıldı
- **Beklenen süre**: 1-2 iş günü
- **Kontrol**: https://ads.google.com/ → Tools → API Center

**Not**: Developer token onaylanana kadar API sorguları çalışmayacak. Test account kullanabilir veya onay bekleyebilirsiniz.

### API Test Durumu
- ✓ OAuth bağlantısı başarılı (Access token alınıyor)
- ⏳ API sorguları "501 UNIMPLEMENTED" hatası veriyor
- 📌 Sebep: Developer token henüz onaylanmadı

---

## 🧪 Test Nasıl Yapılır?

### 1. Dependencies Kurulumu
```bash
npm install
```

### 2. API Test
```bash
node test-google-ads-api.js
```

### Beklenen Çıktı (Developer Token Onaylandıktan Sonra):
```
🚀 Google Ads API Test Başlıyor...
🔄 Access token alınıyor...
✅ Access token başarıyla alındı!
📊 Hesap bilgileri çekiliyor...
✅ API BAĞLANTISI BAŞARILI!
📈 Hesap Bilgileri:
   ID: YOUR_CUSTOMER_ID
   İsim: Your Account Name
   Para Birimi: USD
   ...
🎉 TEST BAŞARILI!
```

---

## 🚀 Sonraki Adımlar

### 1. Developer Token Onayını Bekle (1-2 gün)
- Google'dan email gelecek
- API Center'da token durumu "Approved" olacak

### 2. API Test Et
```bash
node test-google-ads-api.js
```

### 3. Dashboard'a Entegre Et
`dashboard.html` dosyasında:
```javascript
const API_CONFIG = {
    enabled: true,  // false → true
    googleAdsEndpoint: 'http://localhost:3000/api/google-ads',
    // ...
};
```

### 4. API Server Başlat
```bash
node api-server-example.js
```

### 5. Meta Ads API Kurulumu
- Şimdi sıra Meta Ads API'de
- Benzer süreç, daha hızlı

---

## 📞 Sorun Giderme

### Hata: 501 UNIMPLEMENTED
**Çözüm**: Developer token onayını bekleyin

### Hata: 401 Unauthorized
**Çözüm**: Refresh token'ı yenileyin:
```bash
python3 get-refresh-token.py
```

### Hata: 400 Invalid Customer ID
**Çözüm**: Customer ID'yi kontrol edin (tire olmadan)

---

## 📚 Kaynaklar

- **Google Ads API Docs**: https://developers.google.com/google-ads/api/docs
- **Query Builder**: https://developers.google.com/google-ads/api/fields/v18/overview
- **OAuth Playground**: https://developers.google.com/oauthplayground/
- **Support**: https://developers.google.com/google-ads/api/support

---

## 🔐 Güvenlik Notları

1. ✅ `.env` dosyası `.gitignore`'a eklendi
2. ✅ Hassas veriler GitHub'a yüklenmedi
3. ✅ Credentials hardcode edilmedi
4. ⚠️ Production'da:
   - Environment variables kullan
   - API keys'i asla loglamayın
   - HTTPS kullanın
   - Rate limiting ekleyin

---

**Son Güncelleme**: 2025-12-10
**Durum**: Kurulum tamamlandı, Developer Token onayı bekleniyor ⏳
