import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import BandeauReassurance from "@/components/BandeauReassurance";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
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
    images: [
      {
        url: "/logo-fasogame.png",
        width: 512,
        height: 512,
        alt: "FasoGame",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <BandeauReassurance />
        <PanierProvider>
          <BarreSuperieure />
          <main className="flex-1 pt-[calc(var(--bandeau-height)+var(--header-height))]">{children}</main>
          <PiedDePage />
        </PanierProvider>
        <Analytics />
      </body>
    </html>
  );
}
