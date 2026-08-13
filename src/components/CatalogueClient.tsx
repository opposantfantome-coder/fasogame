"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import ChampRecherche from "./ChampRecherche";
import BarreFiltres from "./BarreFiltres";
import PanneauFiltres from "./PanneauFiltres";
import GrilleProduits from "./GrilleProduits";
import Container from "./Container";
import { PRODUITS } from "@/lib/data";
import {
  appliquerFiltres,
  compterFiltresActifs,
  filtresDepuisParams,
  paramsDepuisFiltres,
} from "@/lib/filtres";
import type { FiltresEtat } from "@/lib/filtres";
import type { Categorie, Famille } from "@/lib/types";

export default function CatalogueClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [panneauOuvert, setPanneauOuvert] = useState(false);

  const filtres = useMemo(
    () => filtresDepuisParams(searchParams),
    [searchParams]
  );

  function appliquer(next: FiltresEtat) {
    const params = paramsDepuisFiltres(next);
    const qs = params.toString();
    router.replace(qs ? `/catalogue?${qs}` : "/catalogue", { scroll: false });
  }

  function toggleCat(c: Categorie) {
    const next = new Set(filtres.cats);
    if (next.has(c)) next.delete(c);
    else next.add(c);
    appliquer({ ...filtres, cats: next });
  }

  function togglePlat(f: Famille) {
    const next = new Set(filtres.plats);
    if (next.has(f)) next.delete(f);
    else next.add(f);
    appliquer({ ...filtres, plats: next });
  }

  const produitsFiltres = useMemo(
    () => appliquerFiltres(PRODUITS, filtres),
    [filtres]
  );

  const nbFiltresActifs = compterFiltresActifs(filtres);

  return (
    <Container className="flex flex-col gap-3 py-4 pb-12">
      <ChampRecherche
        value={filtres.q}
        onChange={(q) => appliquer({ ...filtres, q })}
        placeholder="Chercher un produit"
      />

      <BarreFiltres
        cats={filtres.cats}
        plats={filtres.plats as Set<Famille>}
        onToggleCat={toggleCat}
        onTogglePlat={togglePlat}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">
          {produitsFiltres.length} produit{produitsFiltres.length > 1 ? "s" : ""}
        </p>
        <button
          onClick={() => setPanneauOuvert(true)}
          className="flex items-center gap-1.5 rounded-md border border-card-border bg-card-bg px-3 py-2 text-sm font-medium text-text"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtrer{nbFiltresActifs > 0 ? ` (${nbFiltresActifs})` : ""}
        </button>
      </div>

      <GrilleProduits produits={produitsFiltres} />

      <PanneauFiltres
        open={panneauOuvert}
        onClose={() => setPanneauOuvert(false)}
        filtres={filtres}
        onChange={appliquer}
        nbResultats={produitsFiltres.length}
      />
    </Container>
  );
}
