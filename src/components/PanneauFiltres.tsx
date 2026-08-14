"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import type { FiltresEtat, Tri } from "@/lib/filtres";
import { filtresVides, genreVisible } from "@/lib/filtres";
import { CATEGORIES, FAMILLES, GENRES } from "@/lib/types";
import type { Categorie, Disponibilite, Famille, Genre } from "@/lib/types";

const DISPONIBILITES: Disponibilite[] = ["En stock", "Sur commande"];

const LABEL_TRI: Record<Tri, string> = {
  recent: "Plus récent",
  "prix-asc": "Prix croissant",
  "prix-desc": "Prix décroissant",
  nom: "Nom A→Z",
};

function toggleDansSet<T>(set: Set<T>, valeur: T): Set<T> {
  const copie = new Set(set);
  if (copie.has(valeur)) copie.delete(valeur);
  else copie.add(valeur);
  return copie;
}

function Section({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  const [ouvert, setOuvert] = useState(true);
  return (
    <div className="border-b border-card-border py-4">
      <button
        onClick={() => setOuvert((o) => !o)}
        className="flex w-full items-center justify-between text-left text-sm font-semibold text-text"
      >
        {titre}
        {ouvert ? (
          <ChevronUp className="h-4 w-4 text-text-muted" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text-muted" />
        )}
      </button>
      {ouvert && <div className="mt-3 flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

function Case({
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
      aria-pressed={active}
      className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
        active
          ? "border-red bg-red/10 text-text"
          : "border-card-border text-text-muted hover:text-text"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          active ? "border-red bg-red" : "border-card-border"
        }`}
      >
        {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      {children}
    </button>
  );
}

export default function PanneauFiltres({
  open,
  onClose,
  filtres,
  onChange,
  nbResultats,
}: {
  open: boolean;
  onClose: () => void;
  filtres: FiltresEtat;
  onChange: (f: FiltresEtat) => void;
  nbResultats: number;
}) {
  function set<K extends keyof FiltresEtat>(cle: K, valeur: FiltresEtat[K]) {
    onChange({ ...filtres, [cle]: valeur });
  }

  return (
    <div
      className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-lg bg-bg text-text shadow-elevated transition-transform duration-200 sm:inset-y-0 sm:left-0 sm:right-auto sm:h-full sm:w-80 sm:max-h-none sm:rounded-none sm:rounded-r-lg ${
          open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:-translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-card-border px-4 py-4">
          <h2 className="font-display text-base font-semibold text-marine">Trier et filtrer</h2>
          <button onClick={onClose} aria-label="Fermer" className="flex h-11 w-11 items-center justify-center">
            <X className="h-5 w-5 text-text-muted" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <Section titre="Trier">
            {(["recent", "prix-asc", "prix-desc", "nom"] as Tri[]).map((t) => (
              <Case key={t} active={filtres.tri === t} onClick={() => set("tri", t)}>
                {LABEL_TRI[t]}
              </Case>
            ))}
          </Section>

          <Section titre="Catégorie">
            {CATEGORIES.map((c: Categorie) => (
              <Case
                key={c}
                active={filtres.cats.has(c)}
                onClick={() => set("cats", toggleDansSet(filtres.cats, c))}
              >
                {c}
              </Case>
            ))}
          </Section>

          <Section titre="Plateforme">
            {FAMILLES.map((f: Famille) => (
              <Case
                key={f}
                active={filtres.plats.has(f)}
                onClick={() => set("plats", toggleDansSet(filtres.plats, f))}
              >
                {f}
              </Case>
            ))}
          </Section>

          {genreVisible(filtres) && (
            <Section titre="Genre">
              {GENRES.map((g: Genre) => (
                <Case
                  key={g}
                  active={filtres.genres.has(g)}
                  onClick={() => set("genres", toggleDansSet(filtres.genres, g))}
                >
                  {g}
                </Case>
              ))}
            </Section>
          )}

          <Section titre="Disponibilité">
            {DISPONIBILITES.map((d) => (
              <Case
                key={d}
                active={filtres.dispo.has(d)}
                onClick={() => set("dispo", toggleDansSet(filtres.dispo, d))}
              >
                {d}
              </Case>
            ))}
          </Section>

          <div className="border-b border-card-border py-4 opacity-50">
            <p className="text-sm font-semibold">Prix</p>
            <p className="mt-2 text-xs text-text-muted">[Paliers à définir]</p>
          </div>
        </div>

        <div className="shrink-0 space-y-2 border-t border-card-border px-4 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-md bg-red py-3 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
          >
            Afficher les {nbResultats} résultat{nbResultats > 1 ? "s" : ""}
          </button>
          <button
            onClick={() => onChange(filtresVides())}
            className="w-full py-2 text-center text-sm text-text-muted hover:text-text"
          >
            Tout effacer
          </button>
        </div>
      </div>
    </div>
  );
}
