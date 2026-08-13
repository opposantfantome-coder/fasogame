"use client";

import { usePanier } from "@/components/PanierProvider";
import { PRODUITS } from "@/lib/data";

/** Page temporaire (Prompt 2) — à supprimer à l'étape 14 de la section 10. */

const LIGNES_TEST = [
  {
    produitId: "manette-dualsense",
    varianteId: "manette-dualsense-ps5",
    label: "Manette DualSense · PS5 · 70 000 FCFA (mono-variante)",
  },
  {
    produitId: "ea-sports-fc-25",
    varianteId: "ea-sports-fc-25-ps4",
    label: "EA Sports FC 25 · PS4 · 10 000 FCFA",
  },
  {
    produitId: "ea-sports-fc-25",
    varianteId: "ea-sports-fc-25-ps5",
    label: "EA Sports FC 25 · PS5 · [Prix à fournir] (même produit, autre variante)",
  },
  {
    produitId: "console-xbox-series-x",
    varianteId: "console-xbox-series-x-xbox-series",
    label: "Console Xbox Series X · [Prix à fournir]",
  },
];

export default function PageTestPanier() {
  const { lignes, totaux, ajouter, modifierQuantite, supprimer, vider } = usePanier();

  function nomProduit(produitId: string) {
    return PRODUITS.find((p) => p.id === produitId)?.nom ?? produitId;
  }

  return (
    <div className="mx-auto max-w-2xl p-6 font-mono text-sm">
      <h1 className="text-lg font-bold">/test-panier — page temporaire</h1>
      <p className="mt-1 text-text-muted">
        Boutons bruts pour vérifier le contexte panier, y compris après rechargement (F5).
      </p>

      <section className="mt-6 border-t border-card-border pt-4">
        <h2 className="font-semibold">Ajouter une ligne connue</h2>
        <div className="mt-2 flex flex-col gap-2">
          {LIGNES_TEST.map((t) => (
            <button
              key={t.varianteId}
              onClick={() => ajouter(t.produitId, t.varianteId)}
              className="rounded border border-card-border px-3 py-2 text-left hover:bg-bg-alt"
            >
              + {t.label}
            </button>
          ))}
          <button
            onClick={() => ajouter("manette-dualsense", "manette-dualsense-ps5", 25)}
            className="rounded border border-card-border px-3 py-2 text-left hover:bg-bg-alt"
          >
            + Manette DualSense × 25 (doit se borner à 20)
          </button>
        </div>
      </section>

      <section className="mt-6 border-t border-card-border pt-4">
        <h2 className="font-semibold">Lignes actuelles ({lignes.length})</h2>
        {lignes.length === 0 && <p className="mt-2 text-text-muted">Panier vide.</p>}
        <ul className="mt-2 flex flex-col gap-2">
          {lignes.map((l) => (
            <li
              key={`${l.produitId}-${l.varianteId}`}
              className="flex flex-wrap items-center gap-2 rounded border border-card-border p-2"
            >
              <span>
                {nomProduit(l.produitId)} · {l.varianteId} · qté {l.quantite}
              </span>
              <button
                onClick={() => modifierQuantite(l.produitId, l.varianteId, l.quantite - 1)}
                className="rounded border border-card-border px-2"
              >
                −
              </button>
              <button
                onClick={() => modifierQuantite(l.produitId, l.varianteId, l.quantite + 1)}
                className="rounded border border-card-border px-2"
              >
                +
              </button>
              <button
                onClick={() => supprimer(l.produitId, l.varianteId)}
                className="rounded border border-card-border px-2 text-red"
              >
                supprimer
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={vider}
          className="mt-3 rounded border border-red px-3 py-2 text-red hover:bg-red/10"
        >
          Vider le panier
        </button>
      </section>

      <section className="mt-6 border-t border-card-border pt-4">
        <h2 className="font-semibold">Totaux (totalPanier)</h2>
        <ul className="mt-2 flex flex-col gap-1">
          <li>sousTotal : {totaux.sousTotal.toLocaleString("fr-FR")} FCFA</li>
          <li>nombreArticles (somme des quantités, pas des lignes) : {totaux.nombreArticles}</li>
          <li>articlesSansPrix (exclus du sous-total) : {totaux.articlesSansPrix}</li>
        </ul>
      </section>

      <section className="mt-6 border-t border-card-border pt-4">
        <h2 className="font-semibold">À vérifier</h2>
        <ul className="mt-2 list-disc pl-5">
          <li>Ajouter une ligne, recharger la page (F5) : elle doit rester.</li>
          <li>Le bouton « × 25 » doit se borner à quantité 20, jamais plus.</li>
          <li>
            Nettoyage silencieux : dans les devtools, éditer
            <code className="mx-1 rounded bg-bg-alt px-1">localStorage[&quot;fasogame.panier&quot;]</code>
            pour y glisser un <code className="rounded bg-bg-alt px-1">produitId</code> ou{" "}
            <code className="rounded bg-bg-alt px-1">varianteId</code> inexistant, puis recharger : la
            ligne doit disparaître sans erreur.
          </li>
        </ul>
      </section>
    </div>
  );
}
