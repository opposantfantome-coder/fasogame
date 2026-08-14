import Link from "next/link";
import Image from "next/image";
import { siPlaystation } from "simple-icons";
import { Gamepad2, History, Joystick } from "lucide-react";
import CarrouselProduits from "@/components/CarrouselProduits";
import Container from "@/components/Container";
import LogoMarque from "@/components/LogoMarque";
import { PRODUITS } from "@/lib/data";
import { FAMILLE_COULEUR } from "@/lib/familles";

/** Le sélecteur de console de l'accueil reste à quatre familles (spec §2.4) : Multi-plateformes n'y figure pas. */
type FamilleConsole = "PlayStation" | "Xbox" | "Nintendo" | "Rétro";

const FAMILLES_ACCUEIL: FamilleConsole[] = ["PlayStation", "Xbox", "Nintendo", "Rétro"];

const ICONE_FAMILLE: Record<FamilleConsole, React.ReactNode> = {
  PlayStation: <LogoMarque icon={siPlaystation} className="h-8 w-8 sm:h-10 sm:w-10" color={`#${siPlaystation.hex}`} />,
  Xbox: <Gamepad2 className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.5} style={{ color: FAMILLE_COULEUR.Xbox }} />,
  Nintendo: <Joystick className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.5} style={{ color: FAMILLE_COULEUR.Nintendo }} />,
  Rétro: <History className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.5} style={{ color: FAMILLE_COULEUR.Rétro }} />,
};

const ONGLETS = [
  { label: "Dernier", href: "/catalogue?tri=recent" },
  { label: "Collections", href: "/catalogue" },
  { label: "Offres", href: "/nouvelles?type=Offre" },
  { label: "Boutiques", href: "/a-propos#boutiques" },
];

function nouveautes() {
  return [...PRODUITS].sort((a, b) => b.dateAjout.localeCompare(a.dateAjout)).slice(0, 8);
}

function parCategorie(categorie: string) {
  return PRODUITS.filter((p) => p.categorie === categorie);
}

export default function PageAccueil() {
  return (
    <div className="flex flex-col">
      <nav className="border-b border-card-border">
        <Container className="no-scrollbar flex gap-5 overflow-x-auto py-3 text-sm font-medium text-text-muted">
          {ONGLETS.map((o) => (
            <Link key={o.label} href={o.href} className="shrink-0 whitespace-nowrap hover:text-marine">
              {o.label}
            </Link>
          ))}
        </Container>
      </nav>

      <section className="bg-bg-alt">
        <Container className="py-6">
          <div className="relative flex h-[220px] flex-col items-start justify-end gap-3 overflow-hidden rounded-lg p-5 card-shadow">
            {/*
              Visuel temporaire (jaquette EA Sports FC 26) en attendant un
              visuel fourni par la boutique. À remplacer, pas à garder.
            */}
            <Image
              src="/produits/ea-sports-fc-26-banniere.jpg"
              alt=""
              fill
              sizes="(min-width: 1200px) 1200px, 100vw"
              priority
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: "var(--fg-hero-gradient)" }}
            />
            <p className="relative max-w-xs text-lg font-semibold leading-snug text-white">
              [Accroche à fournir]
            </p>
            <Link
              href="/catalogue"
              className="relative rounded-pill bg-red px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
            >
              Voir le catalogue
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-bg">
        <Container className="py-6">
          <h2 className="font-display text-[22px] font-bold mt-0 mb-4 text-marine">
            Quelle est votre console ?
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {FAMILLES_ACCUEIL.map((f) => (
              <Link
                key={f}
                href={`/catalogue?plat=${encodeURIComponent(f)}`}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-md border border-card-border bg-card-bg text-center card-shadow transition-transform duration-150 hover:-translate-y-0.5"
                style={{ borderBottomWidth: "3px", borderBottomColor: FAMILLE_COULEUR[f] }}
              >
                {ICONE_FAMILLE[f]}
                <span className="font-display text-base font-semibold text-text sm:text-lg">
                  {f}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-alt">
        <Container className="py-2">
          <CarrouselProduits titre="Nouveautés" produits={nouveautes()} lienTout="/catalogue?tri=recent" />
        </Container>
      </section>

      <section className="bg-bg">
        <Container className="py-2">
          <CarrouselProduits
            titre="Manettes"
            produits={parCategorie("Manettes")}
            lienTout="/catalogue?cat=Manettes"
          />
        </Container>
      </section>

      <section className="bg-bg-alt pb-12">
        <Container className="py-2">
          <CarrouselProduits
            titre="Cartes cadeaux"
            produits={parCategorie("Cartes cadeaux")}
            lienTout="/catalogue?cat=Cartes%20cadeaux"
          />
        </Container>
      </section>
    </div>
  );
}
