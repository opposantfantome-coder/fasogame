/**
 * Numéro burkinabè à 8 chiffres. Accepte espaces, tirets et préfixe
 * international (+226 ou 00226) à la saisie ; normalise silencieusement,
 * sans jamais bloquer l'utilisateur sur la forme.
 */

/** Ne garde que les 8 chiffres significatifs, préfixe international retiré. */
export function normaliserTelephone(saisie: string): string {
  let s = saisie.trim();
  s = s.replace(/^\+?226\s*/, "");
  s = s.replace(/^00\s?226\s*/, "");
  return s.replace(/\D/g, "").slice(0, 8);
}

export function telephoneValide(saisie: string): boolean {
  return normaliserTelephone(saisie).length === 8;
}

/** Affichage groupé par 2 avec espaces : "70000000" → "70 00 00 00". */
export function formaterTelephone(saisie: string): string {
  return normaliserTelephone(saisie)
    .replace(/(\d{2})(?=\d)/g, "$1 ")
    .trim();
}
