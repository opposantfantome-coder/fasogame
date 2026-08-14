"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Disc3,
  Gamepad2,
  Gift,
  Headphones,
  Info,
  MonitorPlay,
  Newspaper,
  ShoppingBag,
  X,
} from "lucide-react";
import { RUBRIQUES_MENU } from "@/lib/menu";
import { lienContact } from "@/lib/whatsapp";

const ICONES_RUBRIQUE: Record<string, typeof ShoppingBag> = {
  magasin: ShoppingBag,
  consoles: MonitorPlay,
  jeux: Disc3,
  manettes: Gamepad2,
  accessoires: Headphones,
  "cartes-cadeaux": Gift,
  nouvelles: Newspaper,
  "a-propos": Info,
};

export default function MenuTiroir({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = RUBRIQUES_MENU.find((r) => r.id === selectedId) ?? null;

  function fermer() {
    onClose();
    setSelectedId(null);
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={fermer}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute left-0 top-0 flex h-full w-[88vw] max-w-sm flex-col bg-marine text-white shadow-elevated transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-border px-3">
          <button
            onClick={fermer}
            aria-label="Fermer le menu"
            className="flex h-11 w-11 items-center justify-center"
          >
            <X className="h-5 w-5" />
          </button>
          <Link href="/" onClick={fermer} className="font-display text-lg font-bold tracking-tight">
            FASOGAME
          </Link>
          <a
            href={lienContact()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill bg-red px-3 py-2 text-xs font-semibold"
          >
            Contact
          </a>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Bande d'icônes — toujours visible, se réduit en rail quand une rubrique est ouverte */}
          <nav
            className={`flex shrink-0 flex-col overflow-y-auto border-r border-border ${
              selected ? "w-16" : "w-full"
            }`}
          >
            {RUBRIQUES_MENU.map((r) => {
              const Icone = ICONES_RUBRIQUE[r.id];
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 text-left text-sm transition-colors ${
                    selected
                      ? "flex-col gap-1 px-1 py-3 text-center text-[10px]"
                      : "hover:bg-marine-light"
                  } ${selectedId === r.id ? "bg-marine-light text-white" : "text-text-secondary"}`}
                >
                  <Icone className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                  {!selected && <span className="flex-1">{r.label}</span>}
                  {!selected && <ChevronRight className="h-4 w-4 text-text-secondary" />}
                  {selected && <span className="leading-tight">{r.label}</span>}
                </button>
              );
            })}

            {!selected && (
              <div className="mt-2 flex flex-col gap-1 border-t border-border px-4 py-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Accès rapide
                </p>
                <Link
                  href="/catalogue?tri=recent"
                  onClick={fermer}
                  className="py-2 text-sm text-text-secondary transition-colors hover:text-white"
                >
                  Nouveautés
                </Link>
                <Link
                  href="/panier"
                  onClick={fermer}
                  className="py-2 text-sm text-text-secondary transition-colors hover:text-white"
                >
                  Mon panier
                </Link>
                <a
                  href={lienContact()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={fermer}
                  className="py-2 text-sm text-text-secondary transition-colors hover:text-white"
                >
                  Commander via WhatsApp
                </a>
              </div>
            )}
          </nav>

          {/* Contenu de la rubrique sélectionnée */}
          {selected && (
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <button
                onClick={() => setSelectedId(null)}
                className="mb-3 flex items-center gap-1 text-sm text-text-secondary hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" /> Retour
              </button>
              <h2 className="mb-3 font-display text-lg font-semibold">{selected.label}</h2>
              <div className="grid grid-cols-2 gap-2">
                {selected.vignettes.map((v) => (
                  <Link
                    key={v.label}
                    href={v.href}
                    onClick={fermer}
                    className="rounded-md bg-marine-light px-3 py-4 text-center text-sm font-medium transition-colors hover:bg-border"
                  >
                    {v.label}
                  </Link>
                ))}
              </div>
              {selected.liensSecondaires.length > 0 && (
                <ul className="mt-4 flex flex-col divide-y divide-border border-t border-border">
                  {selected.liensSecondaires.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        onClick={fermer}
                        className="flex items-center justify-between py-3 text-sm text-text-secondary hover:text-white"
                      >
                        {l.label} <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
