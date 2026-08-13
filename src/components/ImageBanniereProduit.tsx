import { ICONES_CATEGORIE } from "@/lib/iconesCategorie";
import type { Categorie } from "@/lib/types";

export default function ImageBanniereProduit({
  nom,
  categorie,
  className,
}: {
  id: string;
  nom: string;
  categorie: Categorie;
  className?: string;
}) {
  const Icone = ICONES_CATEGORIE[categorie];

  return (
    <div
      role="img"
      aria-label={`${nom} — bannière à fournir`}
      className={`flex items-center justify-end bg-placeholder-bg pr-12 sm:pr-24 ${className ?? ""}`}
    >
      <Icone className="h-16 w-16 text-placeholder-icon sm:h-24 sm:w-24" strokeWidth={1} />
    </div>
  );
}
