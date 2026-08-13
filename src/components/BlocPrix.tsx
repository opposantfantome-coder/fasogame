import { formatPrix } from "@/lib/familles";
import type { Disponibilite, Variante } from "@/lib/types";

const DISPO_COULEUR: Record<Disponibilite, string> = {
  "En stock": "#34d399",
  "Sur commande": "#f59e0b",
  Épuisé: "#8890c4",
};

export default function BlocPrix({
  variantes,
  accentColor,
  varianteActive,
  onSelect,
}: {
  variantes: Variante[];
  accentColor: string;
  varianteActive: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      className="animate-bloc-prix flex flex-col divide-y rounded-md border"
      style={{
        backgroundColor: `color-mix(in srgb, ${accentColor} 16%, rgba(255,255,255,0.06))`,
        borderColor: `color-mix(in srgb, ${accentColor} 45%, var(--fg-hero-border))`,
      }}
    >
      {variantes.map((v, i) => (
        <button
          key={v.plateforme}
          onClick={() => onSelect(i)}
          className="flex items-center justify-between px-4 py-3.5 text-left transition-colors"
          style={
            i === varianteActive
              ? { backgroundColor: `color-mix(in srgb, ${accentColor} 22%, transparent)` }
              : undefined
          }
        >
          <div className="flex items-center gap-2">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
              style={{
                borderColor: i === varianteActive ? accentColor : "var(--fg-hero-border)",
              }}
            >
              {i === varianteActive && (
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
              )}
            </span>
            <span className="font-display text-sm font-semibold">{v.plateforme}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-sm font-medium">{formatPrix(v.prix)}</span>
            <span className="flex items-center gap-1.5 text-xs text-hero-text-muted">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: DISPO_COULEUR[v.disponibilite] }}
              />
              {v.disponibilite}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
