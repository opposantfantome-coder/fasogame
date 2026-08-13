import { FAMILLE_COULEUR } from "@/lib/familles";
import type { Famille } from "@/lib/types";

export default function SelecteurPlateforme({
  familles,
  active,
  onSelect,
}: {
  familles: Famille[];
  active: Famille | null;
  onSelect: (f: Famille) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Choisissez votre plateforme">
      {familles.map((f) => {
        const estActif = active === f;
        return (
          <button
            key={f}
            onClick={() => onSelect(f)}
            aria-pressed={estActif}
            className="min-h-11 flex-1 rounded-md border-2 px-4 py-2.5 text-sm font-semibold transition-[background-color,border-color,color] duration-200 ease-out"
            style={
              estActif
                ? {
                    backgroundColor: FAMILLE_COULEUR[f],
                    borderColor: FAMILLE_COULEUR[f],
                    color: "white",
                  }
                : {
                    backgroundColor: "transparent",
                    borderColor: "var(--fg-hero-border)",
                    color: "var(--fg-white)",
                  }
            }
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}
