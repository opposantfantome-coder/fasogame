import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import { ARTICLES } from "@/lib/data";
import type { TypeArticle } from "@/lib/types";

export const metadata: Metadata = { title: "Nouvelles" };

const TYPES: TypeArticle[] = ["Offre", "Événement", "Annonce"];

const TYPE_COULEUR: Record<TypeArticle, string> = {
  Offre: "var(--fg-red)",
  Événement: "var(--fam-nintendo)",
  Annonce: "var(--fg-text-muted)",
};

export default async function PageNouvelles({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const typeActif = TYPES.includes(type as TypeArticle) ? (type as TypeArticle) : null;

  const articles = [...ARTICLES]
    .filter((a) => !typeActif || a.type === typeActif)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Container className="flex flex-col py-5 pb-12">
      <h1 className="font-display text-[28px] font-bold text-marine">Nouvelles</h1>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto">
        <Link
          href="/nouvelles"
          className={`shrink-0 rounded-pill px-3.5 py-2 text-sm font-medium ${
            !typeActif ? "bg-red text-white" : "bg-bg-alt text-text-muted"
          }`}
        >
          Tout
        </Link>
        {TYPES.map((t) => (
          <Link
            key={t}
            href={`/nouvelles?type=${encodeURIComponent(t)}`}
            className={`shrink-0 rounded-pill px-3.5 py-2 text-sm font-medium ${
              typeActif === t ? "bg-red text-white" : "bg-bg-alt text-text-muted"
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {articles.map((a) => (
          <article
            key={a.id}
            className="flex gap-3 rounded-md border border-card-border bg-card-bg p-3 card-shadow"
          >
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-bg-alt text-xs font-semibold text-text"
              style={{ borderBottom: `3px solid ${TYPE_COULEUR[a.type]}` }}
            >
              {a.type}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-text-muted">
                {new Date(a.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h2 className="font-display text-base font-semibold text-text">{a.titre}</h2>
              <p className="text-sm text-text-muted">{a.resume}</p>
            </div>
          </article>
        ))}
        {articles.length === 0 && (
          <p className="py-10 text-center text-text-muted">Aucune actualité pour ce filtre.</p>
        )}
      </div>
    </Container>
  );
}
