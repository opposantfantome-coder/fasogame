import Image from "next/image";
import { ICONES_CATEGORIE } from "@/lib/iconesCategorie";
import type { Categorie } from "@/lib/types";

/** Bannière 16:9 du bloc héros : image réelle si elle existe, sinon placeholder neutre (spec §11). */
export default function ImageBanniereProduit({
  imageBanniere,
  nom,
  categorie,
  className,
}: {
  imageBanniere: string | null;
  nom: string;
  categorie: Categorie;
  className?: string;
}) {
  if (imageBanniere) {
    return (
      <div className={`relative ${className ?? ""}`}>
        <Image
          src={imageBanniere}
          alt={nom}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>
    );
  }

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
