import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";

export const metadata: Metadata = {
  title: "Teknik Informatika — Universitas Muhammadiyah Cirebon",
  description:
    "Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon. Membentuk generasi digital yang kompeten dan inovatif.",
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        {/* Preload primary self-hosted PP Mori fonts for zero-latency instant rendering */}
        <link
          rel="preload"
          href="/fonts/PPMori-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/PPMori-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
