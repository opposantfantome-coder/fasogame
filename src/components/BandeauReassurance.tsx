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

/** Bande de réassurance, pleine largeur au-dessus de l'en-tête (spec §5.1). */
export default function BandeauReassurance() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-[var(--bandeau-height)] overflow-hidden bg-red text-white">
      <div className="animate-bandeau flex h-full w-max items-center whitespace-nowrap text-xs font-medium">
        <Messages />
        <Messages />
      </div>
    </div>
  );
}
