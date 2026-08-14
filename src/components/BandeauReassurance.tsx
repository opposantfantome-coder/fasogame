/** [À CONFIRMER] Numéro de la boutique — inconnu à ce stade (comme WHATSAPP_NUMERO). */
const TELEPHONE_BOUTIQUE: string | null = null;

function Messages() {
  return (
    <>
      <span className="px-6">Livraison [délai à confirmer]</span>
      <span className="px-6">
        Nous appeler{" "}
        {TELEPHONE_BOUTIQUE ? (
          <a href={`tel:${TELEPHONE_BOUTIQUE}`} className="underline underline-offset-2">
            {TELEPHONE_BOUTIQUE}
          </a>
        ) : (
          "[numéro à confirmer]"
        )}
      </span>
    </>
  );
}

/**
 * Bande de réassurance, pleine largeur au-dessus de l'en-tête (spec §5.1).
 * Le contenu tient sans défiler à partir de `sm` (~640px) : le défilement
 * ne sert donc qu'en dessous, comme le demande la spec ("si le contenu
 * dépasse sur mobile"). Un défilement systématique, même là où le texte
 * tient, produisait deux copies visibles à la fois — coupées aux deux
 * bords — sur les écrans plus larges.
 */
export default function BandeauReassurance() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-[var(--bandeau-height)] overflow-hidden bg-red text-white">
      {/* Mobile : une seule passe, entre par la droite, sort par la gauche. */}
      <div className="animate-bandeau flex h-full w-max items-center whitespace-nowrap text-xs font-medium sm:hidden">
        <Messages />
      </div>
      {/* sm et plus : le contenu tient, pas de défilement. */}
      <div className="hidden h-full items-center justify-center whitespace-nowrap text-xs font-medium sm:flex">
        <Messages />
      </div>
    </div>
  );
}
