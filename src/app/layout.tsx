import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teknik Informatika — Universitas Muhammadiyah Cirebon",
  description:
    "Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon. Membentuk generasi digital yang kompeten dan inovatif.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
