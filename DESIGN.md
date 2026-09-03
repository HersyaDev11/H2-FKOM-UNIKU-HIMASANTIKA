# Design System & Color Palette Guidelines
**Landing Page Prodi Teknik Informatika - FKOM UMC**

Dokumen ini mendefinisikan panduan identitas visual, spesifikasi palet warna (*color tokens*), hierarki penggunaan, aksesibilitas kontras, standar adaptasi skala multi-perangkat (*Multi-Scale & Zoom Resilience*), standar optimasi performa web (*Performance Engineering*), serta implementasi Tailwind CSS untuk proyek Landing Page Prodi Teknik Informatika UMC.

---

## 1. Core Color Palette (5 Warna Utama)

| No | Warna | HEX | RGB | HSL | Peran Desain / Semantic Role |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | **Merah** | `#DF1A22` | `rgb(223, 26, 34)` | `hsl(358, 79%, 49%)` | **Primary Brand / Dynamic Accent**: Digunakan untuk Call-to-Action (CTA), highlight penting, badge status, dan elemen interaktif utama. |
| **2** | **Kuning Emas** | `#F2A900` | `rgb(242, 169, 0)` | `hsl(42, 100%, 47%)` | **Secondary Accent / Prestige**: Digunakan untuk aksen prestasi, bintang/rating, badge keunggulan, hover subtle, dan pendaran cahaya (*glow/gradient*). |
| **3** | **Hijau** | `#00853F` | `rgb(0, 133, 63)` | `hsl(148, 100%, 26%)` | **Tertiary Accent / Identity**: Identitas khas institusi/kampus, indikator sukses (*success states*), badge akreditasi, dan aksen alami. |
| **4** | **Putih** | `#FFFFFF` | `rgb(255, 255, 255)` | `hsl(0, 0%, 100%)` | **Base Surface / Contrast Light**: Background bersih (*clean canvas*), teks di atas background gelap, kartu terang, dan border kontras. |
| **5** | **Hitam** | `#111111` | `rgb(17, 17, 17)` | `hsl(0, 0%, 7%)` | **Deep Neutral / Contrast Dark**: Background elegan (*dark canvas*), teks utama pada latar terang, kartu gelap, dan elemen struktural kontras tinggi. |

---

## 2. Accessibility & Contrast Ratio Matrix (WCAG 2.1)

| Foreground (Teks/Elemen) | Background | Rasio Kontras | Status WCAG | Rekomendasi Penggunaan |
| :--- | :--- | :--- | :--- | :--- |
| **Putih (`#FFFFFF`)** | **Hitam (`#111111`)** | `18.2 : 1` | ✅ **AAA Pass** | Teks utama, judul, dan tombol pada background gelap |
| **Hitam (`#111111`)** | **Putih (`#FFFFFF`)** | `18.2 : 1` | ✅ **AAA Pass** | Teks utama pada background terang |
| **Putih (`#FFFFFF`)** | **Merah (`#DF1A22`)** | `4.64 : 1` | ✅ **AA Pass** | Teks pada tombol CTA merah |
| **Hitam (`#111111`)** | **Kuning Emas (`#F2A900`)** | `9.76 : 1` | ✅ **AAA Pass** | Teks gelap di atas tombol/badge emas |
| **Putih (`#FFFFFF`)** | **Hijau (`#00853F`)** | `4.72 : 1` | ✅ **AA Pass** | Teks putih di atas badge/tombol hijau |
| **Merah (`#DF1A22`)** | **Putih (`#FFFFFF`)** | `4.64 : 1` | ✅ **AA Pass** | Teks link / highlight merah di latar putih |
| **Hijau (`#00853F`)** | **Putih (`#FFFFFF`)** | `4.72 : 1` | ✅ **AA Pass** | Teks link / badge hijau di latar putih |

---

## 3. Konfigurasi Tailwind CSS v4 (`src/app/globals.css`)

```css
@import "tailwindcss";

@theme {
  /* --- Brand Color Palette (Hanya 5 Warna Utama) --- */
  --color-merah: #DF1A22;
  --color-kuning-emas: #F2A900;
  --color-hijau: #00853F;
  --color-putih: #FFFFFF;
  --color-hitam: #111111;

  /* --- Typography --- */
  --font-mori: 'Mori-400', 'Mori', sans-serif;
  --font-sans: 'Mori-400', 'Mori', sans-serif;
}
```

---

## 4. Panduan Penerapan per Komponen

### 1. Header / Navigation Bar (`Navbar.tsx`)
- **Latar Belakang**: Glassmorphism semi-transparan (`bg-[#111111]/85 backdrop-blur-xl border-b border-white/[0.08]`).
- **Logo & Nav Links**: Teks `#FFFFFF` dengan font PP Mori (`tracking-[-0.01em]`) dan hover indicator strip merah UMC (`#DF1A22`).
- **CTA Button**: Clean pill button warna merah UMC (`#DF1A22`), tanpa ikon panah, dengan teks `Daftar PMB` / `Apply Now` berbobot `font-medium`.
- **Target Sentuh Mobile**: Tombol hamburger dan tombol bahasa memiliki area sentuh minimal `min-w-[44px] min-h-[44px]`.

### 2. Hero Section (`HeroSection.tsx`)
- **Latar Belakang**: `#111111` dengan giant background watermark typography `"INFORMATIKA"` (17vw, opacity 0.035).
- **Headline**: PP Mori Display 4 baris terstruktur dengan aksen merah `#DF1A22` pada "Teknik Informatika".
- **Visual Stagger**: Pinterest-style vertical masonry 2 kolom bergerak kontinu dengan akselerasi GPU (`transform-gpu`) dan smart LCP image prioritization.

### 3. About Section (`AboutSection.tsx`)
- **Latar Belakang**: `#050505` dengan ambient radial glow merah UMC.
- **Scrubbed Word Reveal**: Animasi teks sinematik di mana kata-kata menyala putih bertahap seiring guliran scroll.
- **Metrics Grid**: 4 kartu statistik serapan kerja (95%), dosen praktisi (15+), konsentrasi studi (3), dan akreditasi (A) dengan pendaran hover glow merah.

### 4. Visi & Misi (`VisiMisiSection.tsx`)
- **Latar Belakang**: Nuansa gelap elegan `#050505`, `#0a0a0a`, `#111111` dengan ambient blur glow merah UMC.
- **Horizontal Scroll Scrub**: 4 panel widescreen (`w-[400vw]`) dengan sinkronisasi ScrollTrigger pin pada desktop dan stacking vertikal responsif pada mobile.

### 5. Facts Section (`FactsSection.tsx`)
- **Background**: `#FFFFFF` (Clean light layout).
- **Grand Headline**: Teks `#111111`.
- **Interactive List Rows**: Hover baris transisi ke warna `#DF1A22` (Merah) dan teks kategori ke `#00853F` (Hijau) dengan rasio kontras tinggi `#334155`.
- **Official Logo**: Menampilkan logo resmi UMC (`/logoprodi/UMC-1.webp`) dengan lazy-load hemat memori.

### 6. Quotes Section (`QuotesSection.tsx`)
- **Badge Subtitle**: Subtitle `{ Teknik Informatika UMC }` dengan SVG kurung kurawal (*Braces*) diperbesar (`clamp(40px, 8vh, 80px)`) dan teks `clamp(16px, 2.8vh, 26px)` berbobot `font-medium`.
- **Grand Quote Headline**: Tipografi editorial display PP Mori rata kiri.
- **GSAP Flower Constellation**:
  - **Tangkai Biru Lengkung (*Royal Blue Stem Curve*)**: Meluncur dari kiri bawah ke puncak kanan atas (durasi 1.2s, `power2.inOut`).
  - **Bunga Hijau 8 Kelopak (*8-Petal Green Blossom*)**: 4 kelopak silang persegi panjang `#00e64f` dengan inti lingkaran putih mekar elastis (`back.out(1.8)`).
  - **Aksen Satelit (*Satellites*)**: Berlian biru (`.flair-diamond`), titik berpendar (`.flair-dot`), dan bintang 4-sudut (`.flair-mini-star`) meletup serentak dengan stagger `0.06s`.
  - **Interaktivitas**: Hover & click pada kata *"membimbing"* memicu ulang animasi mekar dan gelombang pendaran warna huruf `#1E90FF`.

### 7. Peminatan Section (`PeminatanSection.tsx`)
- **Background**: `#FFFFFF` dengan shadow transisi halus `shadow-[0_-40px_90px_rgba(0,0,0,0.7)]`.
- **Interactive Accordion**: 5 domain spesialisasi kurikulum dengan photo backdrop preview dan layout expansion GPU-accelerated.
- **Mobile Locked-Position Layout**: Elemen nomor, ikon, dan judul terkunci di posisi stabil tanpa efek loncat/kaku saat dibuka.

### 8. Gallery Section (`GallerySection.tsx`)
- **Background**: `#111111` dengan grid arsitektural halus dan seamless atmospheric dissolve.
- **3D Coverflow Carousel**: Render interaktif langsung ke DOM via `useRef` + RAF tanpa re-render state React, diobservasi via `ResizeObserver` asinkron, dilengkapi kontrol swipe dan navigasi presisi.

### 9. Testimonials Section (`TestimonialsSection.tsx`)
- **Scroll Reel Testimonial**: Featured photo 185px diapit placeholder 95px, dilengkapi animasi teks per-karakter (*split-character text stagger*), asynchronous image decoding, dan tombol navigasi 44px.

### 10. Kemitraan / Mitra Section (`MitraSection.tsx`)
- **Infinite Marquee Ticker**: Logo SVG monokrom dengan hover warna asli industri, berjalan di GPU Compositor Layer (`will-change-transform transform-gpu`) dengan duplikasi hemat 2x (14 partner).

### 11. Footer (`Footer.tsx`)
- **Brand Identity & Links**: Identitas prodi, tautan resmi PMB & universitas, serta social links dengan padding sentuh minimal 44px di mobile.

### 12. Floating Virtual Assistant (`Chatbot.tsx`)
- **Asisten Cerdas Interaktif**: Dibangun dengan dynamic import bundle splitting (`next/dynamic`).
- **Spring Physics Animation**: Balon obrolan mekar halus (*spring bloom*) dengan transisi `framer-motion`, indikator mengetik gelombang (*wave dots*), dan auto-scroll otomatis.
- **Jawaban Kontekstual**: Menyediakan respon cerdas seputar PMB, Kurikulum, Beasiswa, Biaya, dan Akreditasi.

---

## 5. Multi-Scale & Zoom Resilience Guidelines (Cross-Platform Standards)

Bagian ini mendokumentasikan arsitektur dan standar teknis untuk menangani perbedaan tampilan lintas sistem operasi (Linux/Ubuntu vs Windows), variasi *Display Scaling* DPI (100%, 125%, 150%), serta pembesaran layar (*browser zoom level* `Ctrl +` 110% s.d. 150%).

### 1. Identifikasi & Akar Masalah (*Root Cause Analysis*)
- **Perbedaan Default OS Scaling**:
  - Di **Linux / Ubuntu**, layar 1080p berjalan pada rasio `1.0` (tinggi ruang pandang vertikal murni ~900–1000px).
  - Di **Windows (khususnya laptop 13–15 inch)**, sistem menerapkan *Display Scaling* default **125% atau 150%**. Hal ini membuat tinggi vertikal efektif browser menyusut menjadi hanya **~600–700px** (identik dengan zoom `Ctrl +` 110%–125%).
- **Vertical Viewport Overflow**:
  - Section bertipe `sticky` atau `min-h-screen` dengan ukuran font absolut raksasa (misal `81px` 4 baris = ~400px + padding + ornamen = ~700px) akan melebihi tinggi layar 600px.
- **Line Wrapping Disruption**:
  - Pada pembesaran zoom, kalimat display panjang yang tidak dikunci barisnya akan patah (*line wrap*) secara acak, merusak kerapian rata kiri (*flush left alignment*).

---

### 2. Prinsip & Pola Desain Solusi (*Core Engineering Patterns*)

#### A. Fluid Dual-Axis Clamping (`min(vw, vh)`)
Gunakan formula `clamp` yang mengikat batas atas font ke nilai minimum antara lebar (`vw`) dan tinggi vertikal (`vh`):
```css
/* Contoh pada Quotes Section: */
font-size: clamp(26px, min(4.35vw, 8.4vh), 80.9999px);
line-height: 1.2;
```
- **Pada Laptop Standar (100% Zoom / Layar Penuh)**: Formula otomatis mencapai batas maksimal **`80.9999px`** (tampilan 100% megah dan gagah).
- **Pada Windows Scaling / Browser Zoom (>110%)**: Nilai `vh` otomatis mengecilkan font secara halus dan proporsional sehingga **seluruh konten pas 1 layar penuh tanpa terpotong**.

#### B. Strict Multi-Line Lock (`lg:whitespace-nowrap`)
Untuk kalimat tipografi display editorial yang terbagi menjadi beberapa baris terstruktur:
```tsx
<span className="inline lg:block lg:whitespace-nowrap">
  Teknik Informatika UMC membimbing Anda
</span>
```
- Menjamin susunan baris tetap terkunci rapi (4 baris teratur) dan tidak menghasilkan kata yatim (*orphan words*) saat layar menyempit.
- Memastikan teks selalu **100% rata kiri sejajar sempurna (*flush left-aligned*)**.

#### C. Overflow & Dynamic Max-Height Constraints
- Hindari penggunaan `overflow-hidden` pada container utama jika di dalamnya terdapat konten yang berpotensi memanjang vertikal; gunakan **`overflow-x-clip`** agar batas samping terlindungi tanpa memotong bagian atas/bawah.
- Gunakan batasan adaptif berbasis viewport untuk elemen bertinggi statis:
  - Masonry Gallery Hero: `max-h-[calc(100vh-180px)]`
  - Chatbot Popup Window: `max-h-[calc(100vh-100px)]`

---

### 3. Matriks Implementasi per Komponen Teruji

| Komponen | Isu yang Dimitigasi | Solusi Implementasi |
| :--- | :--- | :--- |
| **`QuotesSection.tsx`** | Teks terpotong saat zoom & susunan 4 baris berantakan | `clamp(26px, min(4.35vw, 8.4vh), 80.9999px)` + `lg:whitespace-nowrap` pada baris span + `overflow-x-clip`. |
| **`HeroSection.tsx`** | Tombol CTA terdorong keluar saat galeri kanan memanjang | `overflow-x-clip` pada section + `max-h-[calc(100vh-180px)]` pada container masonry gallery + `transform-gpu`. |
| **`VisiMisiSection.tsx`** | Visi panjang 180 karakter terpotong badge/indikatornya di layar sempit | `clamp(28px, min(4.3vw, 7.8vh), 80px)` pada visi utama + `clamp(24px, min(3vw, 5.2vh), 50px)` pada misi + GPU panels. |
| **`Chatbot.tsx`** | Header popup chat keluar dari batas atas layar pada zoom 150% | `max-h-[calc(100vh-100px)]` pada jendela chat. |
| **`GallerySection.tsx`** | Kartu 3D terpotong kaku di sisi kiri/kanan saat zoom/skala berbeda | `clamp(200px, min(30vw, 42vh), 380px)` + *Soft Horizontal Fade Mask* pada frame 3D carousel. |
| **`MitraSection.tsx`** | Beban rendering marquee berkelanjutan | GPU hardware acceleration (`transform-gpu will-change-transform`) + logo SVG presisi `28x28px`. |

---

## 6. Web Performance & Optimization Engineering Standards

Bagian ini menetapkan arsitektur performa tinggi (*high-performance engineering*) untuk mencapai skor PageSpeed 95–100, rendering instan (< 1 detik), dan transisi animasi 120 FPS tanpa jitter.

### 1. Font Preloading & Zero-Layout Shift (`src/app/layout.tsx`)
- Font self-hosted `PPMori-Regular.woff2` dan `PPMori-SemiBold.woff2` dipre-load langsung di dalam `<head>`:
  ```html
  <link rel="preload" href="/fonts/PPMori-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  ```
- **Manfaat**: Font diunduh secara paralel pada paket data pertama (detik ke-0), menghilangkan kedipan font (*Zero Flash of Unstyled Text / 0 CLS*).

### 2. Next.js Compiler & Automatic Package Tree-Shaking (`next.config.ts`)
- Menerapkan `optimizePackageImports` untuk library berat:
  ```ts
  optimizePackageImports: ['lucide-react', 'gsap', '@gsap/react', 'framer-motion', 'lenis']
  ```
- **Manfaat**: Menghindari impor modul monolitik, memangkas ukuran bundle JavaScript hingga 40%.
- Mengaktifkan kompresi bawaan `compress: true` serta format gambar modern `AVIF` dan `WebP` dengan cache TTL 1 tahun (`minimumCacheTTL: 31536000`).

### 3. Code-Splitting & Dynamic Imports (`src/app/page.tsx`)
- Komponen interaktif floating yang tidak dibutuhkan saat first paint (`Chatbot.tsx`) dimuat secara dinamis:
  ```tsx
  const Chatbot = dynamic(() => import("./components/Chatbot/Chatbot"));
  ```
- **Manfaat**: Mengurangi First Contentful Paint (FCP) dan Total Blocking Time (TBT) secara signifikan pada pemuatan awal.

### 4. Smart Image Loading & LCP Prioritization Strategy
- **Above-The-Fold (Hero Section)**: 2 kartu teratas diberikan `priority={true}` dan `loading="eager"` untuk mendongkrak skor Largest Contentful Paint (LCP).
- **Below-The-Fold (Facts, Peminatan, Gallery, Testimoni, Footer)**: Seluruh gambar di bawah lipatan layar menggunakan `loading="lazy"` dan `decoding="async"`.
- **Format Aset**: 100% gambar dikonversi dan dikompresi ke format **Next-Gen WebP** dengan ukuran rata-rata hanya 10–140 KB.

### 5. Buttery-Smooth Momentum Scrolling & Navigation Interception (`SmoothScroll.tsx`)
- Menggabungkan mesin Lenis Virtual Scroll dengan GSAP Ticker pada `lagSmoothing(0)` untuk 120 FPS konsisten.
- Mengintersepsi seluruh klik tautan navigasi anchor internal (`href^="#"` pada Navbar, Hero CTA, dan Footer) untuk meluncur halus menggunakan rumus inersia eksponensial dengan kompensasi offset fixed navbar `-20px`.
- Meng-inline aturan CSS Lenis langsung ke dalam `globals.css` untuk mengeliminasi rantai *request chaining* stylesheet eksternal.

### 6. Modern Baseline ES2022 Target (`tsconfig.json`)
- Menetapkan `compilerOptions.target: "ES2022"` dan `module: "ESNext"` untuk mengeliminasi polyfill usang dan memangkas ukuran byte JavaScript yang dieksekusi browser modern (Desktop & Mobile).

### 7. Zero-Forced Reflow & Anti-Layout Thrashing Strategy
- **Eliminasi Multiple Timer Reflow**: Seluruh `setTimeout(() => ScrollTrigger.refresh(), ...)` yang sebelumnya tersebar di berbagai komponen dihapus. Pengukuran tata letak DOM hanya dilakukan sekali secara asinkron setelah render selesai.
- **Asynchronous Geometry Measuring**: Di `coverflow-carousel.tsx`, kueri geometri kartu dibungkus di dalam `requestAnimationFrame` dan diobservasi melalui `ResizeObserver`, menghindari pembacaan sinkron `offsetWidth` yang memicu pemaksaan reflow (*forced reflow*).

### 8. Touch Targets & Accessibility Compliance (Mobile & Laptop)
- **Ukuran Sentuh Standar (Min. 44px–50px)**:
  - Tombol Hamburger Navbar: `min-w-[44px] min-h-[44px]`
  - Tombol Floating Chatbot: `min-w-[50px] min-h-[50px]`
  - Tombol Navigasi Testimoni: `min-w-[44px] min-h-[44px]`
  - Tombol CTA Hero & Daftar PMB: `min-h-[44px]` hingga `min-h-[48px]`
  - Tautan Footer & Media Sosial: `min-h-[44px]` padding sentuh di mobile
- **Peningkatan Kontras Warna (WCAG 2.1 AAA)**:
  - Subtitle pada latar putih menggunakan `#334155` / `text-neutral-700` (rasio kontras > 7.5:1).
  - Teks abu-abu sekunder pada latar gelap `#111111` menggunakan `text-neutral-300` (rasio kontras > 9.2:1).
