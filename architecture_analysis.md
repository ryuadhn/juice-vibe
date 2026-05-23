# Analisis Arsitektur VibeJuice

Dokumen ini mendeskripsikan arsitektur sistem dari web-app VibeJuice, memetakan hubungan antara komponen frontend, alur state management, serta integrasi dengan API backend berbasis AI.

---

## Arsitektur Sistem Utama

VibeJuice dibangun dengan arsitektur **Single Page Application (SPA)** berbasis **Next.js App Router** pada sisi frontend, dengan **Serverless API Routes** di sisi backend untuk mengelola fitur-fitur bertenaga AI secara aman.

### 1. Komponen Frontend (Client-Side)
* **`app/page.jsx`**: Satu-satunya entry point visual (SPA) yang mencakup seluruh seksi interaktif:
  * **Header**: Navigasi, keranjang belanja dinamis, profil login Google Simulator.
  * **Hero & Our Values**: Pengenalan brand dan nilai kesehatan.
  * **AI Station Workspace**: Integrasi modul kustomisasi mood dan chat interaktif dengan AI Barista.
  * **Menu Showcase**: Etalase produk jus Kombinasi (Combo) dan Jus Tunggal (Single).
  * **Modals Layer**: Modal Kustomisasi Es/Gula, Ulasan Pelanggan, Login Simulator, AI Upsell, Metode Pembayaran (QRIS/Transfer), dan Preskripsi Nutrisi AI (Unduh PDF).

### 2. Komponen Backend (Server-Side API Routes)
* **`/api/chat/route.js`**: Endpoint API yang menerima prompt masukan suasana hati (mood) pengguna dan memproses resep jus rekomendasi personal secara real-time.
* **`/api/upsell/route.js`**: Endpoint rekomendasi belanja pintar yang menganalisis isi keranjang belanja dan menawarkan produk pelengkap bernutrisi tinggi dengan diskon paket khusus.

---

## Diagram Alur Arsitektur (Flowchart)

Berikut adalah flowchart arsitektur lengkap VibeJuice menggunakan sintaksis Mermaid:

```mermaid
graph TD
    %% Penyetelan Gaya Visual Premium (Dark Theme Style)
    classDef client fill:#0f172a,stroke:#334155,stroke-width:2px,color:#f8fafc;
    classDef component fill:#1e293b,stroke:#475569,stroke-width:2px,color:#f1f5f9;
    classDef server fill:#022c22,stroke:#065f46,stroke-width:2px,color:#34d399;
    classDef modal fill:#1e1b4b,stroke:#3730a3,stroke-width:2px,color:#e0e7ff;

    %% Definisi Node
    Client["Klien Peramban (Next.js SPA)"]:::client
    Header["Header Bar (Navigasi, Keranjang, Profil)"]:::component
    Hero["Hero Section (Branding & Spark AI)"]:::component
    Values["Nilai Kami (Values Section)"]:::component
    
    subgraph AI_Workspace ["AI Workspace (Barista AI)"]
        AIStation["AI Station UI"]:::component
        MoodToggle["Mood Toggles & Input Fisik"]:::component
        BaristaChat["Modul Chat Barista AI"]:::component
        RecommendationCard["Kotak Resep Rekomendasi AI"]:::component
    end

    subgraph Menu_Section ["Etalase Menu & Kustomisasi"]
        ComboJuice["Seksi Jus Combo (Filter Kategori)"]:::component
        SingleJuice["Seksi Jus Single (Detail Akordeon)"]:::component
        CustomizeModal["Modal Kustomisasi (Gula & Es)"]:::modal
    end

    subgraph Cart_Flow ["Alur Transaksi & Pembayaran"]
        CartDrawer["Cart Drawer (Nama & Tipe Pesanan)"]:::component
        UpsellModal["Modal AI Upsell (Rekomendasi Pintar)"]:::modal
        PaymentSelection["Modal Metode Pembayaran"]:::modal
        QRISModal["Simulasi QRIS (Download Resep)"]:::modal
        BankModal["Virtual Account Transfer"]:::modal
        SuccessModal["Modal Transaksi Berhasil"]:::modal
        PrescriptionModal["Preskripsi Nutrisi AI (PDF/PNG)"]:::modal
    end

    subgraph Backend_APIs ["API Backend Serverless"]
        APIChat["/api/chat (Proses Konsultasi AI)"]:::server
        APIUpsell["/api/upsell (Mesin Upsell Paket)"]:::server
    end

    %% Hubungan Alur Arsitektur
    Client --> Header
    Client --> Hero
    Client --> Values
    Client --> AIStation
    Client --> Menu_Section
    Client --> Cart_Flow

    %% AI Station Flow
    MoodToggle --> |"Mengatur State Mood"| BaristaChat
    BaristaChat --> |"POST prompt masukan"| APIChat
    APIChat --> |"Kirim respon chat AI"| BaristaChat
    BaristaChat --> |"Kirim spesifikasi resep"| RecommendationCard
    RecommendationCard --> |"Masukkan Keranjang"| CartDrawer

    %% Menu Flow
    ComboJuice --> |"Kustomisasi Es/Gula"| CustomizeModal
    SingleJuice --> |"Kustomisasi Es/Gula"| CustomizeModal
    CustomizeModal --> |"Simpan & Tambahkan"| CartDrawer

    %% Checkout & Upsell Flow
    CartDrawer --> |"Lanjutkan ke Pembayaran"| APIUpsell
    APIUpsell --> |"Tawarkan item upsell"| UpsellModal
    UpsellModal --> |"Diterima / Ditolak"| PaymentSelection
    PaymentSelection --> |"Metode QRIS"| QRISModal
    PaymentSelection --> |"Metode Bank Transfer"| BankModal
    QRISModal --> |"Pembayaran Divalidasi"| SuccessModal
    BankModal --> |"Pembayaran Divalidasi"| SuccessModal
    SuccessModal --> |"Unduh Preskripsi"| PrescriptionModal
```
