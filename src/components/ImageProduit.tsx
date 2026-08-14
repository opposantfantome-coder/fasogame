import Image from "next/image";
import { ICONES_CATEGORIE } from "@/lib/iconesCategorie";
import type { Categorie } from "@/lib/types";

/** Vignette carrée : image réelle si elle existe, sinon placeholder neutre (spec §11). */
export default function ImageProduit({
  images,
  nom,
  categorie,
  className,
  sizes = "(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw",
}: {
  images: string[];
  nom: string;
  categorie: Categorie;
  className?: string;
  sizes?: string;
}) {
  const src = images[0];

  if (src) {
    return (
      <div className={`relative ${className ?? ""}`}>
        <Image src={src} alt={nom} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

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
