#!/usr/bin/env python3
"""
Google Ads API Refresh Token Generator
Bu script OAuth 2.0 refresh token almak için kullanılır.
"""

from google_auth_oauthlib.flow import InstalledAppFlow

# OAuth credentials - .env dosyasından alınmalı veya environment variable olarak ayarlanmalı
# Güvenlik için bu değerleri koda yazmayın!
CLIENT_ID = "YOUR_CLIENT_ID_HERE"  # Google Cloud Console'dan alın
CLIENT_SECRET = "YOUR_CLIENT_SECRET_HERE"  # Google Cloud Console'dan alın

# OAuth scope
SCOPES = ["https://www.googleapis.com/auth/adwords"]

def main():
    """Refresh token oluştur"""

    # OAuth flow yapılandırması
    flow = InstalledAppFlow.from_client_config(
        {
            "installed": {
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://accounts.google.com/o/oauth2/token",
                "redirect_uris": ["http://localhost:8080"]
            }
        },
        scopes=SCOPES,
    )

    # Tarayıcıda authorization başlat
    print("🚀 Tarayıcınızda OAuth ekranı açılacak...")
    print("Google hesabınızla giriş yapın ve izinleri onaylayın.\n")

    credentials = flow.run_local_server(port=8080)

    # Refresh token'ı göster
    print("\n" + "="*60)
    print("✅ BAŞARILI! Refresh Token:")
    print("="*60)
    print(f"\n{credentials.refresh_token}\n")
    print("="*60)
    print("\nBu token'ı .env dosyanıza GOOGLE_REFRESH_TOKEN olarak ekleyin.")
    print("="*60)

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n❌ Hata: {e}")
        print("\nÇözüm:")
        print("1. google-auth-oauthlib kurulu mu kontrol edin:")
        print("   pip3 install google-auth-oauthlib")
        print("2. Port 8080 kullanımda olabilir, başka port deneyin")
