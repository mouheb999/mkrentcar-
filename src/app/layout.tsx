import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Saoudy Rent Car | Luxury Car Rental & VIP Transfers Tunisia",
  description:
    "Premium car rental, chauffeur service, airport transfers, and executive transportation across Tunisia.",
  keywords: [
    "car rental Tunisia",
    "luxury car rental Tunisia",
    "VIP transfer Tunisia",
    "airport transfer Tunisia",
    "chauffeur service Tunisia",
    "BMW rental Tunisia",
    "Mercedes rental Tunisia",
  ],
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "Saoudy Rent Car | Luxury Car Rental & VIP Transfers Tunisia",
    description:
      "Premium car rental, chauffeur service, airport transfers, and executive transportation across Tunisia.",
    images: ["/logo.png"],
    locale: "fr_TN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
