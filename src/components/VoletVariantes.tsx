"use client";

import { X } from "lucide-react";
import { formaterPrix } from "@/lib/familles";
import type { Variante } from "@/lib/types";

/**
 * Panneau remontant du bas pour un produit multi-variantes (spec §4.2).
 * Un seul appui sur une ligne ajoute au panier et referme le volet.
 * Les variantes Épuisé sont grisées et non cliquables.
 */
export default function VoletVariantes({
  open,
  variantes,
  onClose,
  onChoisir,
}: {
  open: boolean;
  variantes: Variante[];
  onClose: () => void;
  onChoisir: (variante: Variante) => void;
}) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 flex max-h-[75vh] flex-col rounded-t-lg bg-bg text-text shadow-elevated transition-transform duration-200 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-card-border px-4 py-4">
          <h2 className="font-display text-base font-semibold text-marine">
            Choisissez votre plateforme
          </h2>
          <button onClick={onClose} aria-label="Fermer" className="flex h-11 w-11 items-center justify-center">
            <X className="h-5 w-5 text-text-muted" />
          </button>
        </div>

        <div className="flex flex-col divide-y divide-card-border overflow-y-auto">
          {variantes.map((v) => {
            const epuise = v.disponibilite === "Épuisé";
            return (
              <button
                key={v.id}
                disabled={epuise}
                onClick={() => onChoisir(v)}
                className={`flex items-center justify-between px-4 py-3.5 text-left transition-colors ${
                  epuise ? "cursor-not-allowed opacity-40" : "hover:bg-bg-alt"
                }`}
              >
                <span className="font-display text-sm font-semibold">{v.plateforme}</span>
                <span className="flex flex-col items-end gap-1">
                  <span className="text-sm font-medium">{formaterPrix(v.prix)}</span>
                  <span className="text-xs text-text-muted">{v.disponibilite}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
