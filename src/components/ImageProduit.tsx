import { ICONES_CATEGORIE } from "@/lib/iconesCategorie";
import type { Categorie } from "@/lib/types";

export default function ImageProduit({
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
      aria-label={`${nom} — visuel à fournir`}
      className={`flex items-center justify-center bg-placeholder-bg ${className ?? ""}`}
    >
      <Icone className="h-10 w-10 text-placeholder-icon sm:h-14 sm:w-14" strokeWidth={1.25} />
    </div>
  );
}
