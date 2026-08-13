"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";

/**
 * Confirmation d'ajout au panier (spec §4.2, §7 et §11) : se retire
 * d'elle-même après 3 secondes et ne recouvre jamais un bouton — d'où
 * une pilule centrée et étroite plutôt qu'une bande pleine largeur.
 */
export default function Notification({
  message,
  visible,
  onHide,
}: {
  message: string;
  visible: boolean;
  onHide: () => void;
}) {
  useEffect(() => {
    if (!visible) return;
    const delai = setTimeout(onHide, 3000);
    return () => clearTimeout(delai);
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
    >
      <div className="pointer-events-auto flex items-center gap-2 rounded-pill bg-marine-dark px-4 py-3 text-sm font-medium text-white shadow-elevated">
        <Check className="h-4 w-4 text-whatsapp" strokeWidth={2.5} />
        {message}
      </div>
    </div>
  );
}
