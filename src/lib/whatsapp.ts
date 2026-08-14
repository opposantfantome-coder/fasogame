import type { Famille, Plateforme } from "./types";
import type { Produit } from "./types";

/**
 * [À CONFIRMER PAR LE GÉRANT] Numéro WhatsApp de la boutique de Ouagadougou,
 * relevé sur les publications FasoGame — pas encore confirmé directement
 * par le gérant. Format wa.me : indicatif + numéro, sans espaces ni "+".
 */
export const WHATSAPP_NUMERO: string | null = "22670942309";

/** Construction générique d'un lien wa.me — pas de sémantique "commande" ici. */
export function lienWhatsApp(message: string): string {
  const base = WHATSAPP_NUMERO
    ? `https://wa.me/${WHATSAPP_NUMERO}`
    : "https://api.whatsapp.com/send";
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function lienContact(): string {
  return lienWhatsApp(
    "Bonjour FasoGame, j'ai une question. [Message généré par la maquette]"
  );
}

export function lienCommandeProduit(
  produit: Produit,
  famille: Famille | null,
  plateforme: Plateforme | null
): string {
  const lignes = [
    `Bonjour FasoGame, je souhaite commander :`,
    `• ${produit.nom}`,
  ];
  if (famille) lignes.push(`• Famille : ${famille}`);
  if (plateforme) lignes.push(`• Plateforme : ${plateforme}`);
  lignes.push(`[Message généré par la maquette — prix à confirmer]`);
  return lienWhatsApp(lignes.join("\n"));
}
