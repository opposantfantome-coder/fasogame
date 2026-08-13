import { FAMILLE_COULEUR } from "@/lib/familles";
import type { Famille } from "@/lib/types";

export default function PastillePlateforme({
  famille,
}: {
  famille: Famille;
}) {
  return (
    <span
      className="group relative inline-flex h-1.5 w-1.5 shrink-0 rounded-full ring-1 ring-black/10"
      style={{ backgroundColor: FAMILLE_COULEUR[famille] }}
    >
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-marine-dark px-2 py-1 text-[11px] text-white opacity-0 shadow-card ring-1 ring-white/10 transition-opacity duration-150 group-hover:opacity-100"
      >
        {famille}
      </span>
    </span>
  );
}
