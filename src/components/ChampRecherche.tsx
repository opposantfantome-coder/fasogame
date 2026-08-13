"use client";

import { Search, X } from "lucide-react";

export default function ChampRecherche({
  value,
  onChange,
  placeholder = "Chercher un produit",
  autoFocus = false,
  variante = "clair",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  variante?: "clair" | "sombre";
  className?: string;
}) {
  const styles =
    variante === "sombre"
      ? "bg-marine-light ring-1 ring-white/10 text-white placeholder:text-text-secondary"
      : "bg-bg-alt ring-1 ring-card-border text-text placeholder:text-text-muted";

  return (
    <div
      className={`flex h-11 items-center gap-2 rounded-md px-3 focus-within:ring-red ${styles} ${className}`}
    >
      <Search
        className={`h-4 w-4 shrink-0 ${variante === "sombre" ? "text-text-secondary" : "text-text-muted"}`}
      />
      <input
        type="text"
        inputMode="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="h-full flex-1 bg-transparent text-sm focus:outline-none"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Effacer la recherche"
          className="flex h-6 w-6 shrink-0 items-center justify-center"
        >
          <X className={`h-4 w-4 ${variante === "sombre" ? "text-text-secondary" : "text-text-muted"}`} />
        </button>
      )}
    </div>
  );
}
