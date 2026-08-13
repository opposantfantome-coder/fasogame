import type { Disponibilite } from "@/lib/types";

/** Badge de stock, coin haut gauche de CarteProduit (spec §6.2, §7). */
export default function EtiquetteDisponibilite({
  disponibilite,
}: {
  disponibilite: Disponibilite;
}) {
  return (
    <span className="absolute left-2 top-2 rounded-full border border-card-border bg-card-bg/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-text-muted">
      {disponibilite}
    </span>
  );
}
