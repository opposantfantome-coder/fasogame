"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { siWhatsapp } from "simple-icons";
import MenuTiroir from "./MenuTiroir";
import ChampRecherche from "./ChampRecherche";
import Container from "./Container";
import LogoMarque from "./LogoMarque";
import { usePanier } from "./PanierProvider";
import { lienContact } from "@/lib/whatsapp";

export default function BarreSuperieure() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [recherche, setRecherche] = useState("");
  const router = useRouter();
  const { totaux } = usePanier();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, searchOpen]);

  function soumettreRecherche(e: React.FormEvent) {
    e.preventDefault();
    if (recherche.trim().length === 0) return;
    router.push(`/catalogue?q=${encodeURIComponent(recherche.trim())}`);
    setSearchOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-[var(--bandeau-height)] z-40 h-[60px] border-b text-white transition-colors duration-200 ${
          scrolled
            ? "border-border bg-marine/85 backdrop-blur-md"
            : "border-transparent bg-marine"
        }`}
      >
        <Container className="flex h-full items-center justify-between gap-2">
          {searchOpen ? (
            <form onSubmit={soumettreRecherche} className="flex w-full items-center gap-2">
              <ChampRecherche
                value={recherche}
                onChange={setRecherche}
                autoFocus
                variante="sombre"
                placeholder="Chercher un jeu, une console…"
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Fermer la recherche"
                className="flex h-11 w-11 shrink-0 items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
          ) : (
            <>
              <div className="flex flex-1 items-center gap-1">
                <button
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Ouvrir le menu"
                  className="flex h-11 w-11 items-center justify-center"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Rechercher"
                  className="flex h-11 w-11 items-center justify-center"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>

              <Link href="/" className="flex items-center gap-2 whitespace-nowrap">
                <Image src="/logo-fasogame-128.png" alt="FasoGame" width={40} height={40} priority className="h-10 w-10" />
                <span className="hidden font-display text-lg font-bold tracking-tight text-white md:inline">
                  FASOGAME
                </span>
              </Link>

              <div className="flex flex-1 items-center justify-end gap-1">
                <Link
                  href="/panier"
                  aria-label="Voir le panier"
                  className="relative flex h-11 w-11 shrink-0 items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totaux.nombreArticles > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red px-1 text-[10px] font-semibold leading-none text-white">
                      {totaux.nombreArticles}
                    </span>
                  )}
                </Link>
                <a
                  href={lienContact()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactez-nous sur WhatsApp"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red transition-colors hover:bg-red-dark md:hidden"
                >
                  <LogoMarque icon={siWhatsapp} className="h-5 w-5" />
                </a>
                <a
                  href={lienContact()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden rounded-pill bg-red px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:bg-red-dark md:inline-flex md:items-center"
                >
                  Contactez-nous
                </a>
              </div>
            </>
          )}
        </Container>
      </header>

      <MenuTiroir open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
