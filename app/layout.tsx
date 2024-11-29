import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "@next/font/google";
import Footer from "../components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Laure coach pilates",
  description: "application web pour la réserver de cours de pilates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={`${montserrat.className} bg-base`}>{children}</body>
      <Footer />
    </html>
  );
}
