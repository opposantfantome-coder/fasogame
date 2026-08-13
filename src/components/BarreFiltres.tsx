import { FAMILLES } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import type { Categorie, Famille } from "@/lib/types";

function Puce({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-pill px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
        active
          ? "bg-red text-white"
          : "bg-bg-alt text-text-muted hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}

export default function BarreFiltres({
  cats,
  plats,
  onToggleCat,
  onTogglePlat,
}: {
  cats: Set<Categorie>;
  plats: Set<Famille>;
  onToggleCat: (c: Categorie) => void;
  onTogglePlat: (f: Famille) => void;
}) {
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        <Puce active={cats.size === 0} onClick={() => cats.forEach(onToggleCat)}>
          Tout
        </Puce>
        {CATEGORIES.map((c) => (
          <Puce key={c} active={cats.has(c)} onClick={() => onToggleCat(c)}>
            {c}
          </Puce>
        ))}
      </div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        <Puce active={plats.size === 0} onClick={() => plats.forEach(onTogglePlat)}>
          Toutes
        </Puce>
        {FAMILLES.map((f) => (
          <Puce key={f} active={plats.has(f)} onClick={() => onTogglePlat(f)}>
            {f}
          </Puce>
        ))}
      </div>
    </div>
  );
}
