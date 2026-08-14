"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, PackageCheck, Layers, ShieldCheck, Truck } from "lucide-react";
import ImageBanniereProduit from "./ImageBanniereProduit";
import SelecteurPlateforme from "./SelecteurPlateforme";
import BlocPrix from "./BlocPrix";
import BoutonAjouterPanier from "./BoutonAjouterPanier";
import BoutonWhatsApp from "./BoutonWhatsApp";
import Notification from "./Notification";
import CarrouselProduits from "./CarrouselProduits";
import Container from "./Container";
import { usePanier } from "./PanierProvider";
import { PRODUITS } from "@/lib/data";
import { estMulti, famillesDuProduit, variantesDeFamille } from "@/lib/familles";
import { lienCommandeProduit } from "@/lib/whatsapp";
import type { Famille, Produit, Variante } from "@/lib/types";

const INFOS_PRATIQUES = [
  { Icone: PackageCheck, label: "Disponibilité", valeur: "[À fournir]" },
  { Icone: Layers, label: "Plateformes compatibles", valeur: "[À fournir]" },
  { Icone: ShieldCheck, label: "Garantie", valeur: "[À fournir]" },
  { Icone: Truck, label: "Mode de retrait", valeur: "[À fournir]" },
];

/** La première variante en stock, sinon la première de la liste (spec §6.5). */
function indexVarianteParDefaut(variantes: Variante[]): number {
  const idx = variantes.findIndex((v) => v.disponibilite === "En stock");
  return idx === -1 ? 0 : idx;
}

export default function FicheProduitClient({ produit }: { produit: Produit }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ajouter } = usePanier();

  const familles = useMemo(() => famillesDuProduit(produit), [produit]);
  const multi = estMulti(produit);
  const selecteurRequis = familles.length > 1;

  // Famille par défaut : celle de l'URL si valide, sinon la première ayant du
  // stock, sinon la première de la liste. Jamais "aucune" — le bloc de prix
  // s'ouvre d'emblée, sans message "Sélectionnez une plateforme".
  const familleParDefaut = useMemo(() => {
    const param = searchParams.get("plat");
    if (param && familles.includes(param as Famille)) return param as Famille;
    const avecStock = familles.find((f) =>
      variantesDeFamille(produit, f).some((v) => v.disponibilite === "En stock")
    );
    return avecStock ?? familles[0] ?? null;
  }, [searchParams, familles, produit]);

  const [familleChoisie, setFamilleChoisie] = useState<Famille | null>(null);
  const [varianteIdChoisie, setVarianteIdChoisie] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const familleEffective = selecteurRequis ? familleChoisie ?? familleParDefaut : familles[0] ?? null;

  const variantesAffichees = useMemo(() => {
    if (familleEffective) return variantesDeFamille(produit, familleEffective);
    if (multi) return produit.variantes.filter((v) => v.plateforme === "Multi");
    return [];
  }, [produit, familleEffective, multi]);

  // Retrouve la variante choisie par son id plutôt que par index : si elle
  // n'existe plus dans la famille affichée (changement de famille), la
  // sélection retombe automatiquement sur le défaut, sans état à réinitialiser.
  const varianteIndex = useMemo(() => {
    if (varianteIdChoisie) {
      const idx = variantesAffichees.findIndex((v) => v.id === varianteIdChoisie);
      if (idx !== -1) return idx;
    }
    return indexVarianteParDefaut(variantesAffichees);
  }, [varianteIdChoisie, variantesAffichees]);

  const varianteActive = variantesAffichees[varianteIndex] ?? null;

  function choisirFamille(f: Famille) {
    setFamilleChoisie(f);
    const params = new URLSearchParams(searchParams.toString());
    params.set("plat", f);
    router.replace(`/produit/${produit.id}?${params.toString()}`, { scroll: false });
  }

  function ajouterAuPanier() {
    if (!varianteActive) return;
    ajouter(produit.id, varianteActive.id);
    setNotification(`${produit.nom} ajouté au panier`);
  }

  const produitsSimilaires = PRODUITS.filter(
    (p) => p.id !== produit.id && p.categorie === produit.categorie
  ).slice(0, 8);

  const plateformesDisponibles = produit.variantes.map((v) => v.plateforme);

  return (
    <div className="pb-12">
      {/* BLOC HÉROS — pleine largeur de l'écran */}
      <section className="relative w-full overflow-hidden bg-carbon">
        <div className="relative h-[50vh] w-full md:h-[70vh]">
          <ImageBanniereProduit
            imageBanniere={produit.imageBanniere}
            nom={produit.nom}
            categorie={produit.categorie}
            className="h-full w-full"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.05) 70%, transparent 100%)",
            }}
          />
          <button
            onClick={() => router.back()}
            aria-label="Retour"
            className="absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 md:left-6 md:top-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Panneau produit — chevauche le héros sur bureau, suit en pleine largeur sur mobile */}
        <div className="w-full md:absolute md:inset-x-0 md:bottom-8">
          <Container>
            <div
              className="relative w-full p-6 text-white md:absolute md:bottom-0 md:left-0 md:w-[620px] md:rounded-md md:p-8"
              style={{ backgroundColor: "var(--fg-hero-panel)" }}
            >
              <h1 className="font-display text-[32px] font-bold leading-tight sm:text-[44px]">
                {produit.nom}
              </h1>

              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-hero-text-muted">
                {produit.categorie}
                {produit.genres && produit.genres.length > 0
                  ? ` · ${produit.genres.join(" · ")}`
                  : ""}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {plateformesDisponibles.map((p) => (
                  <span
                    key={p}
                    className="rounded-sm border border-hero-border px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-white/85"
                  >
                    {p}
                  </span>
                ))}
              </div>

              {selecteurRequis && (
                <div className="mt-5 flex flex-col gap-2.5">
                  <SelecteurPlateforme
                    familles={familles}
                    active={familleEffective}
                    onSelect={choisirFamille}
                  />
                </div>
              )}

              {familleEffective && variantesAffichees.length > 0 && (
                <div className="mt-5">
                  <BlocPrix
                    variantes={variantesAffichees}
                    famille={familleEffective}
                    varianteActive={varianteIndex}
                    onSelect={(i) => setVarianteIdChoisie(variantesAffichees[i]?.id ?? null)}
                  />
                </div>
              )}

              {varianteActive && (
                <div className="mt-5 flex flex-col gap-3">
                  <BoutonAjouterPanier onClick={ajouterAuPanier} />
                  <BoutonWhatsApp
                    variante="contour"
                    href={lienCommandeProduit(produit, familleEffective, varianteActive.plateforme)}
                  >
                    Commander sur WhatsApp
                  </BoutonWhatsApp>
                </div>
              )}
            </div>
          </Container>
        </div>
      </section>

      {/* BANDE D'INFORMATIONS */}
      <section className="w-full bg-carbon">
        <Container className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {INFOS_PRATIQUES.map(({ Icone, label, valeur }) => (
            <div key={label} className="flex items-center gap-3">
              <Icone className="h-5 w-5 shrink-0 text-white/60" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-hero-text-muted">{label}</span>
                <span className="text-sm text-white/85">{valeur}</span>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Description et produits similaires — conteneur classique */}
      <Container className="flex flex-col pt-8">
        <div className="border-t border-card-border pt-6">
          <h2 className="font-display text-[22px] font-bold text-marine">Description</h2>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">{produit.description}</p>
        </div>

        {produitsSimilaires.length > 0 && (
          <CarrouselProduits
            titre="Produits similaires"
            produits={produitsSimilaires}
            lienTout={`/catalogue?cat=${encodeURIComponent(produit.categorie)}`}
          />
        )}
      </Container>

      <Notification
        message={notification ?? ""}
        visible={notification !== null}
        onHide={() => setNotification(null)}
      />
    </div>
  );
}
