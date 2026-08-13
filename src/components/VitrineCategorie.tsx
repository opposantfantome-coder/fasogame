import Link from "next/link";
import GrilleProduits from "./GrilleProduits";
import Container from "./Container";
import { PRODUITS } from "@/lib/data";
import { FAMILLE_ACCENT, FAMILLE_COULEUR, famillesDuProduit } from "@/lib/familles";
import { FAMILLES } from "@/lib/types";
import type { Categorie } from "@/lib/types";

export default function VitrineCategorie({
  categorie,
  titre,
}: {
  categorie: Categorie;
  titre: string;
}) {
  const produits = PRODUITS.filter((p) => p.categorie === categorie);

  const cartesFamille = FAMILLES.map((f) => ({
    famille: f,
    nb: produits.filter((p) => famillesDuProduit(p).includes(f)).length,
  })).filter((c) => c.nb > 0);

  return (
    <Container className="flex flex-col py-5 pb-12">
      <h1 className="font-display text-[28px] font-bold text-marine">{titre}</h1>

      {cartesFamille.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          {cartesFamille.map(({ famille, nb }) => (
            <Link
              key={famille}
              href={`/catalogue?cat=${encodeURIComponent(categorie)}&plat=${encodeURIComponent(famille)}`}
              className="flex flex-col justify-between gap-6 rounded-md border bg-card-bg p-4 card-shadow transition-transform duration-150 hover:-translate-y-0.5"
              style={{
                borderColor: FAMILLE_ACCENT[famille].bordure,
                borderBottomWidth: "3px",
                borderBottomColor: FAMILLE_COULEUR[famille],
              }}
            >
              <span className="font-display text-base font-semibold text-text">{famille}</span>
              <span className="text-sm text-text-muted">
                {nb} référence{nb > 1 ? "s" : ""}
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-col">
        <h2 className="font-display text-[22px] font-bold mt-8 mb-4 text-marine">
          Tous les produits
        </h2>
        <GrilleProduits produits={produits} />
      </div>
    </Container>
  );
}
