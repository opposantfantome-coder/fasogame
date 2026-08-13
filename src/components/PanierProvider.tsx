"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { PRODUITS } from "@/lib/data";
import { totalPanier, type TotauxPanier } from "@/lib/panier";
import * as panierStore from "@/lib/panier-store";
import type { LignePanier } from "@/lib/types";

interface PanierContexteValeur {
  lignes: LignePanier[];
  totaux: TotauxPanier;
  ajouter: (produitId: string, varianteId: string, quantite?: number) => void;
  modifierQuantite: (produitId: string, varianteId: string, quantite: number) => void;
  supprimer: (produitId: string, varianteId: string) => void;
  vider: () => void;
}

const PanierContexte = createContext<PanierContexteValeur | null>(null);

export function PanierProvider({ children }: { children: React.ReactNode }) {
  const lignes = useSyncExternalStore(
    panierStore.subscribe,
    panierStore.getSnapshot,
    panierStore.getServerSnapshot
  );

  const totaux = useMemo(() => totalPanier(lignes, PRODUITS), [lignes]);

  const valeur = useMemo<PanierContexteValeur>(
    () => ({
      lignes,
      totaux,
      ajouter: panierStore.ajouter,
      modifierQuantite: panierStore.modifierQuantite,
      supprimer: panierStore.supprimer,
      vider: panierStore.vider,
    }),
    [lignes, totaux]
  );

  return <PanierContexte.Provider value={valeur}>{children}</PanierContexte.Provider>;
}

export function usePanier(): PanierContexteValeur {
  const contexte = useContext(PanierContexte);
  if (!contexte) throw new Error("usePanier() doit être appelé sous <PanierProvider>.");
  return contexte;
}
