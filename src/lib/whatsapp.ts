import type { Famille, Plateforme } from "./types";
import type { Produit } from "./types";

/**
 * [À CONFIRMER] Numéro WhatsApp de la boutique — inconnu à ce stade.
 * Tant qu'il n'est pas fourni, les liens ouvrent le sélecteur de contact
 * WhatsApp plutôt qu'un numéro inventé.
 */
export const WHATSAPP_NUMERO: string | null = null;

function lienWhatsApp(message: string): string {
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
