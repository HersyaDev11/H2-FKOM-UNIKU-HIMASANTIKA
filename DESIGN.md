# Design System & Color Palette Guidelines
**Landing Page Prodi Teknik Informatika - FKOM UMC**

Dokumen ini mendefinisikan panduan identitas visual, spesifikasi palet warna (*color tokens*), hierarki penggunaan, aksesibilitas kontras, serta implementasi Tailwind CSS untuk proyek Landing Page Prodi Teknik Informatika UMC.

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
  --font-mori: 'Mori-400', 'Mori', 'Inter', sans-serif;
  --font-sans: 'Mori-400', 'Mori', 'Inter', sans-serif;
}
```

---

## 4. Panduan Penerapan per Komponen

### 1. Header / Navigation Bar
- **Latar Belakang**: Glassmorphism semi-transparan (`bg-[#111111]/80 backdrop-blur-md` atau `bg-white/80 backdrop-blur-md`).
- **Logo & Nav Links**: Teks `#FFFFFF` (dark mode) / `#111111` (light mode), dengan hover highlight `#DF1A22` atau `#F2A900`.
- **CTA Button**: Background `#DF1A22` dengan teks `#FFFFFF` dan efek hover scale.

### 2. Facts Section
- **Background**: `#FFFFFF` (Clean light layout).
- **Grand Headline**: Teks `#111111`.
- **Interactive List Rows**: Hover baris transisi ke warna `#DF1A22` (Merah) dan teks kategori ke `#00853F` (Hijau).
- **Official Logo**: Menampilkan logo UMC (`/logoprodi/UMC-1.webp`).

### 3. Gallery Section
- **Background**: `#FFFFFF` dengan micro-dots `#F2A900` halus.
- **Grand Headline**: Teks `#111111`.
- **Carousel Controls**: Tombol navigasi hover `#DF1A22`, teks judul `#111111`, pagination aktif `#DF1A22`.
