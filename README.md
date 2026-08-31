# Landing Page - Program Studi Teknik Informatika

Repositori ini berisi kode sumber untuk **Landing Page Program Studi Teknik Informatika** yang dibangun untuk keperluan kompetisi desain dan pengembangan web.

## 🎨 Konsep Desain

Landing page ini dirancang dengan konsep **Modern, Premium, dan Futuristik** yang terinspirasi dari website kelas dunia (bergaya *Awwwards*). 

*   **Skema Warna**: Mendominasi *Dark Mode* (hitam/abu-abu gelap) yang elegan, dipadukan dengan aksen warna **Merah Solid (#DF1A22)** untuk memberikan kesan berani, inovatif, dan penuh energi.
*   **Animasi Interaktif**: Mengutamakan pengalaman pengguna (*User Experience*) yang interaktif melalui animasi *scroll* yang canggih. Terdapat fitur **Horizontal Scroll Parallax** pada bagian Visi & Misi, efek *fade-in*, *scale-up*, *hover magnetik/spotlight*, dan kemunculan teks kata per kata (*word-reveal*).
*   **Transisi Mulus (*Seamless*)**: Menghindari penggunaan garis pembatas (border) yang kaku antar seksi, dan menggantinya dengan efek *gradient masking* serta pendaran cahaya (*glow/blur*) untuk pergantian halaman yang menyatu mulus.
*   **Responsif Penuh**: Dirancang secara khusus agar tetap terlihat proporsional, memukau, dan berfungsi penuh baik di layar Desktop, Tablet, maupun *Smartphone*.

## 🛠️ Teknologi yang Digunakan

Website ini dibangun menggunakan *stack* teknologi modern berbasis JavaScript/TypeScript:

*   **[Next.js](https://nextjs.org/) (App Router)** - *Framework* React yang andal untuk membangun antarmuka pengguna yang cepat dan optimasi *routing*.
*   **[React](https://reactjs.org/)** - *Library* utama (UI) berbasis komponen.
*   **[Tailwind CSS](https://tailwindcss.com/)** - *Framework* CSS *utility-first* untuk penataan gaya (*styling*) yang sangat cepat, konsisten, dan mempermudah desain responsif.
*   **[GSAP (GreenSock Animation Platform)](https://gsap.com/)** - *Library* animasi standar industri yang digunakan bersama *plugin* `ScrollTrigger` dan `@gsap/react` untuk menciptakan animasi *scroll-driven* yang kompleks tanpa mengorbankan performa.
*   **[TypeScript](https://www.typescriptlang.org/)** - *Superset* dari JavaScript untuk penulisan kode yang memiliki tipe data yang lebih aman (*type-safe*) dan terstruktur.

## 🚀 Cara Menginstal & Menjalankan Website Secara Lokal

Ikuti langkah-langkah *step-by-step* berikut untuk menjalankan *website* ini secara lokal di komputer/laptop Anda:

### Prasyarat
Pastikan Anda sudah menginstal **[Node.js](https://nodejs.org/)** (disarankan menggunakan versi LTS 18.x ke atas) dan **npm** (umumnya sudah terpasang otomatis bersamaan dengan Node.js).

### Langkah-langkah Instalasi

1. **Clone Repositori**
   Buka Terminal atau Command Prompt, kemudian *clone* repositori ini ke komputer Anda:
   ```bash
   git clone <URL_REPOSITORI_ANDA_DISINI>
   cd <NAMA_FOLDER_REPOSITORI>
   ```
   *(Catatan: Ubah URL repositori sesuai dengan link GitHub Anda).*

2. **Instal Dependensi (Library)**
   Jalankan perintah berikut untuk menginstal semua modul dan *library* yang dibutuhkan oleh aplikasi:
   ```bash
   npm install
   ```
   *(Tunggu beberapa saat hingga proses instalasi atau unduhan selesai).*

3. **Jalankan Development Server**
   Setelah instalasi selesai, jalankan perintah berikut untuk menghidupkan server lokal (mode pengembangan):
   ```bash
   npm run dev
   ```

4. **Buka Website di Browser**
   Buka web browser favorit Anda (Google Chrome, Firefox, Edge, dll) dan kunjungi alamat berikut:
   ```
   http://localhost:3000
   ```

Selamat! Anda sekarang sudah bisa melihat dan berinteraksi dengan **Landing Page Teknik Informatika** secara langsung di komputer Anda.
