# Dokumentasi & Penjelasan Kode Sistem VibeJuice

Berkas ini menyediakan panduan teknis yang menjelaskan setiap bagian utama kode program di dalam proyek **VibeJuice**, meliputi berkas `layout.tsx`, `globals.css`, dan `page.jsx`, serta rasionalitas (alasan) di balik keputusan arsitektur dan pemilihan teknologi yang digunakan.

---

## 1. `app/layout.tsx` (Root Layout)

Berkas ini mendefinisikan struktur HTML dasar pembungkus (wrapper) untuk seluruh halaman aplikasi di Next.js.

### Penjelasan Kode & Alasan Penggunaan:

* **Pemuatan Font Google (`next/font/google`)**:
  ```typescript
  import { Outfit, Playfair_Display } from 'next/font/google';
  const outfit = Outfit({ subsets: ['latin'] });
  const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
  ```
  * **Mengapa digunakan?**: Next.js secara otomatis mengoptimalkan Google Fonts saat build time (mengunduhnya secara lokal dan menyisipkannya melalui CSS internal). Ini mengeliminasi request jaringan eksternal dari browser klien ke server Google Fonts, meningkatkan kecepatan loading halaman (FCP) secara signifikan.
  * **Outfit**: Digunakan sebagai font sans-serif utama karena memiliki keterbacaan yang sangat tinggi dan tampilan modern yang bersih pada layar digital.
  * **Playfair Display**: Digunakan sebagai variabel font serif khusus untuk bagian logo brand (`JuiceVibe`) dan judul utama guna memberikan aksen premium, mewah, dan berkelas tinggi (*high-end wellness bar*).

* **Metadata Konfigurasi**:
  ```typescript
  export const metadata = {
      title: "JuiceVibe",
      description: "AI-Powered Wellness Juice Bar",
  };
  ```
  * **Mengapa digunakan?**: Mendukung praktik terbaik SEO secara bawaan di Next.js dengan menghasilkan tag `<title>` dan `<meta name="description">` yang ramah terhadap mesin telusur (search engines).

* **RootLayout Component**:
  ```typescript
  export default function RootLayout({ children }) {
      return (
          <html lang="en">
              <body className={`${outfit.className} ${playfair.variable} antialiased`}>
                  {children}
              </body>
          </html>
      );
  }
  ```
  * **`children`**: Tempat Next.js menyisipkan halaman (`page.jsx`) ke dalam struktur template utama.
  * **`antialiased`**: Utilitas Tailwind CSS untuk mengaktifkan rendering font sub-pixel *smoothing* di peramban, membuat tampilan teks terlihat lebih halus dan tajam di layar resolusi tinggi.

---

## 2. `app/globals.css` (Global Styles & Design Tokens)

Berkas ini mengintegrasikan **Tailwind CSS** dan mendefinisikan *Design System* khusus (seperti skema warna gelap, tombol komponen, dan utilitas animasi).

### Penjelasan Kode & Alasan Penggunaan:

* **Integrasi Tailwind CSS**:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
  * **Mengapa digunakan?**: Menyediakan pustaka gaya utilitas atomik Tailwind CSS secara global.

* **Base Custom Styles**:
  ```css
  html {
      scroll-behavior: smooth;
  }
  body {
      @apply bg-gradient-to-br from-slate-950 via-emerald-950/90 to-slate-950;
      @apply font-sans text-slate-100;
  }
  ```
  * **`scroll-behavior: smooth`**: Memberikan efek transisi gulir (scroll) yang mulus saat pengguna menekan link jangkar internal (seperti `#about`, `#ai-station`).
  * **Body Gradient**: Menerapkan latar belakang gelap premium (`slate-950` ke `emerald-950` gelap) secara merata, menjamin tidak ada kebocoran warna putih yang dapat mengganggu mata saat perekaman layar dilakukan.

* **Komponen & Utilitas Kustom (`@layer components`)**:
  Untuk menghindari penulisan puluhan kelas Tailwind yang berulang-ulang pada elemen HTML sejenis, berkas ini membuat sistem kelas komponen:
  * **`.btn-primary` & `.btn-secondary`**: Mengontrol standar visual tombol belanja dan navigasi dengan transisi hover mikro (`active:scale-95`).
  * **`.card-base` & `.card-hover`**: Mengatur tata letak kartu dengan border gelap (`border-slate-800/80`) dan pendaran cahaya hijau modern pada hover guna mendukung tema *glassmorphic*.
  * **`.input-primary`**: Menjamin input teks memiliki visual gelap yang seragam dengan ring fokus emerald yang tidak menyilaukan mata.

* **Sistem Animasi Kustom (`@layer utilities`)**:
  Memberikan nyawa visual pada halaman agar terasa hidup dan interaktif:
  * **`.reveal` (Scroll-to-Reveal)**: Menghubungkan animasi translasi sumbu Y dan opacity dengan Intersection Observer di JavaScript untuk memunculkan elemen secara bertahap saat digulir.
  * **`.animate-float` & `.animate-glow`**: Membuat efek melayang pada ikon AI (Sparkles) dan pendaran cahaya dinamis pada panel checkout, meningkatkan sensasi antarmuka bertenaga AI berteknologi tinggi.
  * **`.animate-gradient-text`**: Menggeser warna teks judul ("Mood Anda") menggunakan gradien pelangi emas-merah-hijau yang dinamis.

---

## 3. `app/page.jsx` (Single Page Application - Front Core)

Berkas utama berukuran ~2600 baris ini mengelola logika aplikasi (State Management), alur interaksi antarmuka pengguna, serta integrasi AI.

### Penjelasan Bagian-Bagian Kode:

* **State Management (React Hooks)**:
  Next.js SPA ini menggunakan `useState` untuk mengontrol interaksi real-time tanpa reload halaman:
  * **`cartItems`**: Menyimpan array produk belanja (termasuk item kustomisasi gula/es dan item AI Upsell).
  * **`userName`, `userAvatar`, `userEmail`**: Menyimpan status data profil pengguna dari Google Simulator Login.
  * **`chatHistory` & `baristaResponse`**: Menyimpan sejarah percakapan chat bertenaga AI dengan Barista AI di lokasi.
  * **`expandedItem`**: Mengelola pembukaan panel akordeon detail bahan jus pada menu Single Juice.

* **Workspace AI Station (Logika Barista AI)**:
  * Pengguna memilih mood (seperti *Stressed, Tired, Focus*) dan memicu chatbot Barista AI.
  * **Mengapa menggunakan integrasi API `/api/chat`?**:
    Saat pengguna menanyakan konsultasi atau mengubah filter mood, aplikasi mengirimkan request `POST` ke endpoint backend. API akan mengembalikan analisis kecocokan nutrisi (misal: "Tubuh Anda membutuhkan asupan magnesium tinggi dari Bayam karena terdeteksi lelah") beserta objek resep jus rekomendasi yang bisa langsung dibeli dalam satu klik.

* **Etalase Menu Dinamis (Combo & Single Juice)**:
  * Menampilkan menu jus kombinasi kaya antioksidan dan menu jus murni.
  * **`p-6` Padding Fix**: Kartu combo diberikan padding seimbang `p-6` agar seluruh teks informasi gizi dan harga tidak menempel kaku ke garis batas kartu.
  * **Soft Glow Effect**: Sesuai perbaikan terbaru, hover pada kartu single juice menggunakan `hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]` dan border slate gelap untuk menghindari visual pembatas kotak kaku (boxy grid) saat disorot kursor.

* **Alur Transaksi & Simulasi Checkout Modals**:
  Ketika menekan bayar, pengguna akan melewati alur modal bertingkat:
  1. **AI Upsell Modal**: Berkas memanggil `/api/upsell` untuk menganalisis isi keranjang dan menawarkan produk komplementer pintar dengan diskon bundle.
  2. **Payment Selection**: Memilih QRIS atau Transfer Bank.
  3. **QRIS / Virtual Account Simulator**: Menampilkan kode pembayaran virtual dan QR untuk disimulasikan.
  4. **Success Screen & AI Prescription**: Menghasilkan struk / resep nutrisi digital resmi yang dapat diunduh (terintegrasi dengan simulator tanda tangan digital platform).

* **Simulasi Login Google (Dark Mode Sign-In)**:
  * **Mengapa dibuat gelap?**: Modal simulator login Google dikonversi dari putih (`bg-white`) menjadi abu-abu gelap pekat (`bg-slate-900`) untuk mencegah pancaran lampu latar putih yang menyilaukan saat perekaman layar dilakukan oleh pengguna.

* **Intersection Observer untuk Efek Scroll**:
  ```javascript
  useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
              }
          });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return () => observer.disconnect();
  }, []);
  ```
  * **Mengapa digunakan?**: Metode berkinerja tinggi untuk memicu animasi masuk elemen-elemen web-app secara dinamis sewaktu digulirkan tanpa membebani thread utama CPU (dibandingkan mendeteksi event listener `scroll` biasa).

---

## Ringkasan Alasan Pemilihan Teknologi & Desain

1. **Mengapa Next.js SPA?**: Menyatukan kecepatan rendering serverless backend dan kehalusan navigasi transisi tanpa reload pada frontend di satu framework tunggal.
2. **Mengapa Skema Warna Gelap (Emerald/Slate Dark)?**: Memberikan kenyamanan visual yang tinggi pada mata pengguna (mengurangi kelelahan mata), menghadirkan estetika premium berkelas tinggi, dan menghilangkan pancaran warna putih menyilaukan saat merekam layar laptop.
3. **Mengapa CSS Variables untuk Fonts?**: Next.js menyuntikkan font dengan CSS variables (`--font-playfair`) secara non-blocking sehingga tidak terjadi *layout shift* (CLS) saat memuat teks pertama kali.
