import type { Metadata, Viewport } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins"
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans"
});

export const metadata: Metadata = {
  title: "Наше любовное путешествие",
  description: "Романтический сайт-подарок к шестимесячию отношений",
  icons: {
    icon: "/icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#ffb6c1"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${poppins.variable} ${openSans.variable}`}>
      <body className="min-h-screen bg-romantic-gradient text-neutral-800">
        {children}
      </body>
    </html>
  );
}
