import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const font = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "EcoTrack — Huella de carbono en lenguaje natural",
  description:
    "Registra actividades cotidianas y estima tu huella de carbono (CO₂e) con IA o reglas locales.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${font.variable} min-h-screen font-sans antialiased`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
