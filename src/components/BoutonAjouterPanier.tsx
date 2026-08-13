import { Plus } from "lucide-react";

/** Action principale de la fiche produit, rouge FasoGame (spec §6.4, §7). */
export default function BoutonAjouterPanier({
  onClick,
  disabled = false,
  className = "",
  children = "Ajouter au panier",
}: {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-red px-4 py-3 text-base font-semibold text-white transition-colors duration-150 hover:bg-red-dark disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Plus className="h-[18px] w-[18px]" />
      {children}
    </button>
  );
}
