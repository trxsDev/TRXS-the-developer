import type { Metadata } from "next";
import { Syncopate } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/components/I18nProvider";
import localFont from "next/font/local";
import BackgroundWatermark from "@/components/ui/BackgroundWatermark";

// Google Sans — Variable Font (ทั้ง Normal + Italic)
// ใช้ไฟล์จาก public/fonts/Google_Sans/
// path สัมพันธ์กับ layout.tsx (src/app/) → ต้องขึ้น 2 ระดับไป public/
const googleSans = localFont({
  src: [
    {
      path: "../../public/fonts/Google_Sans/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/Google_Sans/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      style: "italic",
    },
  ],
  weight: "400 700",
  variable: "--font-google-sans",
  display: "swap",
});

// Syncopate — สำหรับ font-heading (ชื่อแบรนด์ TRXS, หัวข้อ)
const syncopate = Syncopate({
  weight: ["400", "700"],
  variable: "--font-syncopate",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRXS The Developer",
  description: "Web Development & Engineering with Modern Technology.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${syncopate.variable} dark h-full antialiased`}
    >
      <body className={`${googleSans.className} min-h-full flex flex-col bg-background text-foreground selection:bg-accent-500 selection:text-primary-950 relative`}>
        <I18nProvider>
          {/* Scroll-Reactive Background Watermark */}
          <BackgroundWatermark />

          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
