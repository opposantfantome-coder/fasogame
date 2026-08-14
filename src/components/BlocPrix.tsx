import { FAMILLE_ACCENT, formaterPrix } from "@/lib/familles";
import type { Disponibilite, Famille, Variante } from "@/lib/types";

const DISPO_COULEUR: Record<Disponibilite, string> = {
  "En stock": "var(--dispo-stock)",
  "Sur commande": "var(--dispo-commande)",
  Épuisé: "var(--dispo-epuise)",
};

export default function BlocPrix({
  variantes,
  famille,
  varianteActive,
  onSelect,
}: {
  variantes: Variante[];
  famille: Famille;
  varianteActive: number;
  onSelect: (i: number) => void;
}) {
  const accent = FAMILLE_ACCENT[famille];

  return (
    <div
      className="animate-bloc-prix flex flex-col divide-y rounded-md border"
      style={{
        backgroundColor: accent.doux,
        borderColor: accent.bordure,
      }}
    >
      {variantes.map((v, i) => {
        const epuise = v.disponibilite === "Épuisé";
        return (
          <button
            key={v.id}
            disabled={epuise}
            onClick={() => onSelect(i)}
            className={`flex items-center justify-between px-4 py-3.5 text-left transition-colors ${
              epuise ? "cursor-not-allowed opacity-40" : ""
            }`}
            style={!epuise && i === varianteActive ? { backgroundColor: accent.actif } : undefined}
          >
            <div className="flex items-center gap-2">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: !epuise && i === varianteActive ? accent.solide : "var(--fg-hero-border)",
                }}
              >
                {!epuise && i === varianteActive && (
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent.solide }} />
                )}
              </span>
              <span className="font-display text-sm font-semibold">{v.plateforme}</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-medium">{formaterPrix(v.prix)}</span>
              <span className="flex items-center gap-1.5 text-xs text-hero-text-muted">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: DISPO_COULEUR[v.disponibilite] }}
                />
                {v.disponibilite}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
