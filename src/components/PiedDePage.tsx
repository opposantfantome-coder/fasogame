import Link from "next/link";
import { siFacebook, siInstagram, siTiktok, siYoutube, siWhatsapp } from "simple-icons";
import Container from "./Container";
import LogoMarque from "./LogoMarque";

const RESEAUX = [
  { label: "Facebook", icon: siFacebook },
  { label: "Instagram", icon: siInstagram },
  { label: "TikTok", icon: siTiktok },
  { label: "YouTube", icon: siYoutube },
  { label: "WhatsApp", icon: siWhatsapp },
];

export default function PiedDePage() {
  return (
    <footer className="border-t border-border bg-marine text-white">
      <Container className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">FASOGAME</p>
          <p className="mt-2 text-sm text-text-secondary">[Texte de présentation à fournir]</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Boutiques
          </p>
          <p className="mt-2 text-sm text-text-secondary">[Informations à fournir]</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Nous suivre
          </p>
          <ul className="mt-2 flex flex-col gap-2.5 text-sm">
            {RESEAUX.map(({ label, icon }) => (
              <li key={label} className="flex items-center gap-2 text-text-secondary">
                <LogoMarque icon={icon} className="h-[18px] w-[18px] shrink-0" color={`#${icon.hex}`} />
                {label} <span className="text-xs">[lien à fournir]</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-4 py-5 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <Link href="/a-propos" className="hover:text-white">
              À propos
            </Link>
            <Link href="/a-propos#contact" className="hover:text-white">
              Nous contacter
            </Link>
          </div>
          <p>© 2026 FasoGame</p>
        </Container>
      </div>
    </footer>
  );
}
