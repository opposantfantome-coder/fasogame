import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import BarreSuperieure from "@/components/BarreSuperieure";
import PiedDePage from "@/components/PiedDePage";
import { PanierProvider } from "@/components/PanierProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "FasoGame — Jeux, consoles et accessoires",
    template: "%s · FasoGame",
  },
  description:
    "[Texte à fournir] — Boutique FasoGame : jeux, consoles, manettes, accessoires et cartes cadeaux pour PlayStation, Xbox, Nintendo et rétro.",
  openGraph: {
    title: "FasoGame",
    description: "[Texte à fournir]",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <PanierProvider>
          <BarreSuperieure />
          <main className="flex-1 pt-[60px]">{children}</main>
          <PiedDePage />
        </PanierProvider>
      </body>
    </html>
  );
}
