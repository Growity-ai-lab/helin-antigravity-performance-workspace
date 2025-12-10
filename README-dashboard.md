# Helin Performance Dashboard

## 🚀 Canlı Dashboard
Dashboard GitHub Pages üzerinden yayında: `https://growity-ai-lab.github.io/helin-antigravity-performance-workspace/dashboard.html`

## 📊 Özellikler

### ✅ Tamamlananlar
- **Monokrom Tasarım**: Profesyonel tek renk (#2c3e50) tema
- **TRY Para Birimi**: Tüm metrikler Türk Lirası olarak gösteriliyor
- **Görev Takibi**: Learning, Execution, Analysis görevleri
- **İlerleme Çubuğu**: Tamamlanan görevleri görsel olarak takip
- **ROAS Hesaplayıcı**: Gelir ve harcama bazlı ROAS hesaplama
- **Haftalık Reflection**: Öğrenilenleri kaydetme sistemi
- **LocalStorage**: Veriler tarayıcıda kaydediliyor

### 🔌 API Entegrasyonu (Hazır)
Dashboard API ile otomatik güncelleme yapabilir:

1. **API'yi Aktifleştirme**:
```javascript
// dashboard.html içinde:
const API_CONFIG = {
    enabled: true, // false'tan true'ya çevirin
    metaAdsEndpoint: 'https://your-api.com/meta-ads',
    googleAdsEndpoint: 'https://your-api.com/google-ads',
    updateInterval: 300000, // 5 dakikada bir güncelle
    exchangeRate: 34.0 // USD to TRY kuru
};
```

2. **API Formatı** (`api-example.json`):
```json
{
  "meta_ads": {
    "spend": 12500,
    "conversions": 480,
    "cpa": 26.0,
    "cpc": 0.76
  },
  "google_ads": {
    "spend": 9800,
    "conversions": 220,
    "cpa": 44.5,
    "cpc": 1.36
  }
}
```

3. **Otomatik Güncelleme**:
- 5 dakikada bir API'den veri çeker
- TRY'ye otomatik dönüştürür
- Real-time dashboard güncellemesi

## 👥 Ortak Kullanım

### GitHub Pages ile Paylaşım
1. Dashboard linki tüm ekiple paylaşın
2. Herkes aynı anda görüntüleyebilir
3. Güncellemeler anında yansır

### API ile Canlı Veri
- Helin metrikleri API'ye yükler
- Dashboard otomatik güncellenir
- Herkes real-time verileri görür

## 🛠️ Kurulum

### GitHub Pages Aktifleştirme
1. GitHub repo → Settings → Pages
2. Source: `main` branch
3. Folder: `/ (root)`
4. Save → Dashboard yayında!

### Lokal Kullanım
```bash
# Dosyayı tarayıcıda aç
open dashboard.html
```

## 📝 Güncellemeler

### Metrikleri Manuel Güncelleme
HTML içinde değerleri düzenleyin:
```html
<div class="metric-value" id="meta-spend">₺425,000</div>
```

### API ile Otomatik Güncelleme
1. API endpoint'inizi hazırlayın
2. `API_CONFIG.enabled = true` yapın
3. Dashboard otomatik güncellenecek

## 🎨 Özelleştirme

### Renk Değiştirme
```css
/* Ana renk */
background: #2c3e50;

/* Hover rengi */
background: #34495e;
```

### Döviz Kuru Güncelleme
```javascript
exchangeRate: 34.0 // Güncel kuru girin
```

## 🔐 Güvenlik
- API authentication ekleyin
- CORS ayarlarını yapılandırın
- Hassas verileri environment variables'da tutun

## 📞 Destek
Sorularınız için repo'da issue açabilirsiniz.

---
Made with 💜 for Helin Antigravity Performance
