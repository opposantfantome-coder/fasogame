import { formaterPrix } from "./familles";
import { formaterTelephone } from "./telephone";
import { lienWhatsApp } from "./whatsapp";

export interface LigneCommande {
  nom: string;
  plateforme: string;
  quantite: number;
  prix: number | null;
}

export interface ClientCommande {
  nom: string;
  /** Chiffres bruts, déjà validés (8 chiffres) — voir lib/telephone.ts. */
  telephone: string;
  mode: "retrait" | "livraison";
  ville?: string;
  quartier?: string;
  note?: string;
}

export interface Commande {
  lignes: LigneCommande[];
  sousTotal: number;
  articlesSansPrix: number;
  client: ClientCommande;
}

function composerMessage(commande: Commande): string {
  const lignesTexte = commande.lignes.map((l) => {
    const prixTexte = l.prix === null ? "prix à confirmer" : formaterPrix(l.prix);
    return `• ${l.nom} (${l.plateforme}) — ${l.quantite} × ${prixTexte}`;
  });

  const totalTexte =
    commande.articlesSansPrix > 0
      ? `${formaterPrix(commande.sousTotal)} (hors articles sans prix)`
      : formaterPrix(commande.sousTotal);

  const modeTexte =
    commande.client.mode === "livraison"
      ? `Livraison : ${commande.client.ville}, ${commande.client.quartier}`
      : "Retrait : en boutique";

  const lignesMessage = [
    "Bonjour FasoGame, je souhaite commander :",
    "",
    ...lignesTexte,
    "",
    `Total : ${totalTexte}`,
    "",
    `Nom : ${commande.client.nom}`,
    `Téléphone : ${formaterTelephone(commande.client.telephone)}`,
    modeTexte,
  ];

  if (commande.client.note && commande.client.note.trim()) {
    lignesMessage.push(`Note : ${commande.client.note.trim()}`);
  }

  return lignesMessage.join("\n");
}

/**
 * Spec §4.6 — seul endroit du code qui construit une URL WhatsApp de
 * commande. Ouvre WhatsApp dans un nouvel onglet ; ne touche jamais au
 * panier lui-même (le vidage est une action explicite de l'utilisateur,
 * spec §4.6 dernier point).
 */
export function envoyerCommande(commande: Commande): { ok: boolean; url: string } {
  const url = lienWhatsApp(composerMessage(commande));
  if (typeof window === "undefined") return { ok: false, url };
  const fenetre = window.open(url, "_blank", "noopener,noreferrer");
  return { ok: fenetre !== null, url };
}
