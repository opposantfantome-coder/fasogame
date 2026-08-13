"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, ChevronDown, ShoppingBag } from "lucide-react";
import Container from "./Container";
import { usePanier } from "./PanierProvider";
import { PRODUITS } from "@/lib/data";
import { lignesResolues } from "@/lib/panier";
import { formaterPrix } from "@/lib/familles";
import { envoyerCommande, type Commande, type LigneCommande } from "@/lib/commande";
import { formaterTelephone, telephoneValide } from "@/lib/telephone";

type Mode = "retrait" | "livraison" | "";
type Ville = "Ouagadougou" | "Bobo-Dioulasso" | "Banfora" | "autre" | "";

interface Champs {
  nom: string;
  telephone: string;
  mode: Mode;
  ville: Ville;
  quartier: string;
  note: string;
}

const CHAMPS_VIDES: Champs = {
  nom: "",
  telephone: "",
  mode: "",
  ville: "",
  quartier: "",
  note: "",
};

type Cle = keyof Champs;
const ORDRE_CHAMPS: Cle[] = ["nom", "telephone", "mode", "ville", "quartier", "note"];

function valider(champs: Champs): Partial<Record<Cle, string>> {
  const erreurs: Partial<Record<Cle, string>> = {};
  if (!champs.nom.trim()) erreurs.nom = "Le nom complet est obligatoire.";
  if (!telephoneValide(champs.telephone)) erreurs.telephone = "Numéro burkinabè à 8 chiffres attendu.";
  if (champs.mode !== "retrait" && champs.mode !== "livraison") {
    erreurs.mode = "Choisissez un mode de récupération.";
  }
  if (champs.mode === "livraison") {
    if (!champs.ville) erreurs.ville = "Choisissez une ville.";
    if (!champs.quartier.trim()) erreurs.quartier = "Le quartier est obligatoire pour une livraison.";
  }
  if (champs.note.length > 200) erreurs.note = "200 caractères maximum.";
  return erreurs;
}

export default function CommandeClient() {
  const router = useRouter();
  const { lignes, totaux, vider } = usePanier();
  const resolues = lignesResolues(lignes, PRODUITS);

  const [champs, setChamps] = useState<Champs>(CHAMPS_VIDES);
  const [touches, setTouches] = useState<Partial<Record<Cle, boolean>>>({});
  const [envoi, setEnvoi] = useState<{ ok: boolean; url: string } | null>(null);
  const refs = useRef<Partial<Record<Cle, HTMLElement | null>>>({});

  function set<K extends Cle>(cle: K, valeur: Champs[K]) {
    setChamps((c) => ({ ...c, [cle]: valeur }));
  }

  function toucher(cle: Cle) {
    setTouches((t) => ({ ...t, [cle]: true }));
  }

  const erreurs = valider(champs);

  if (resolues.length === 0 && !envoi) {
    return (
      <Container className="flex flex-col items-center gap-4 py-16 text-center">
        <ShoppingBag className="h-12 w-12 text-placeholder-icon" strokeWidth={1.25} />
        <p className="text-text-muted">Votre panier est vide, il n&rsquo;y a rien à commander.</p>
        <Link
          href="/catalogue"
          className="rounded-pill bg-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
        >
          Voir le catalogue
        </Link>
      </Container>
    );
  }

  if (envoi) {
    return (
      <Container className="flex flex-col items-center gap-4 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-whatsapp" strokeWidth={1.5} />
        <h1 className="font-display text-xl font-bold text-marine">Commande prête à envoyer</h1>
        <p className="max-w-sm text-sm text-text-muted">
          {envoi.ok
            ? "WhatsApp s'est ouvert dans un nouvel onglet avec votre commande pré-remplie. Envoyez le message pour la confirmer auprès de FasoGame."
            : "L'ouverture de WhatsApp a échoué (bloqueur de fenêtres ?). Utilisez le lien ci-dessous pour l'ouvrir manuellement."}
        </p>
        {!envoi.ok && (
          <a
            href={envoi.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-whatsapp underline"
          >
            Ouvrir WhatsApp manuellement
          </a>
        )}
        <button
          onClick={() => {
            vider();
            router.push("/");
          }}
          className="mt-2 rounded-md bg-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
        >
          J&rsquo;ai envoyé ma commande
        </button>
        <Link href="/catalogue" className="text-sm text-text-muted hover:text-text">
          Continuer mes achats
        </Link>
      </Container>
    );
  }

  function champErreur(cle: Cle): string | undefined {
    return touches[cle] ? erreurs[cle] : undefined;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouches({ nom: true, telephone: true, mode: true, ville: true, quartier: true, note: true });

    const premierInvalide = ORDRE_CHAMPS.find((cle) => erreurs[cle]);
    if (premierInvalide) {
      const el = refs.current[premierInvalide];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus();
      return;
    }

    const lignesCommande: LigneCommande[] = resolues.map(({ ligne, produit, variante }) => ({
      nom: produit.nom,
      plateforme: variante.plateforme,
      quantite: ligne.quantite,
      prix: variante.prix,
    }));

    const commande: Commande = {
      lignes: lignesCommande,
      sousTotal: totaux.sousTotal,
      articlesSansPrix: totaux.articlesSansPrix,
      client: {
        nom: champs.nom.trim(),
        telephone: champs.telephone,
        mode: champs.mode as "retrait" | "livraison",
        ville: champs.mode === "livraison" ? champs.ville : undefined,
        quartier: champs.mode === "livraison" ? champs.quartier.trim() : undefined,
        note: champs.note.trim() || undefined,
      },
    };

    setEnvoi(envoyerCommande(commande));
  }

  return (
    <Container className="flex flex-col py-5 pb-12">
      <p className="text-xs text-text-muted">
        <Link href="/panier" className="hover:text-text">
          Mon panier
        </Link>{" "}
        › Commande
      </p>
      <h1 className="mt-1 font-display text-[22px] font-bold text-marine">Passer la commande</h1>

      <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-5">
        <Champ id="nom" label="Nom complet" erreur={champErreur("nom")}>
          <input
            id="nom"
            ref={(el) => {
              refs.current.nom = el;
            }}
            type="text"
            value={champs.nom}
            onChange={(e) => set("nom", e.target.value)}
            onBlur={() => toucher("nom")}
            className={champClasse(!!champErreur("nom"))}
          />
        </Champ>

        <Champ id="telephone" label="Téléphone" erreur={champErreur("telephone")}>
          <input
            id="telephone"
            ref={(el) => {
              refs.current.telephone = el;
            }}
            type="tel"
            inputMode="tel"
            placeholder="70 00 00 00"
            value={champs.telephone}
            onChange={(e) => set("telephone", e.target.value)}
            onBlur={() => {
              set("telephone", formaterTelephone(champs.telephone));
              toucher("telephone");
            }}
            className={champClasse(!!champErreur("telephone"))}
          />
        </Champ>

        <fieldset
          ref={(el) => {
            refs.current.mode = el;
          }}
          tabIndex={-1}
        >
          <legend className="text-sm font-medium text-text">Mode</legend>
          <div className="mt-2 flex gap-2">
            {(["retrait", "livraison"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  set("mode", m);
                  toucher("mode");
                }}
                aria-pressed={champs.mode === m}
                className={`flex-1 rounded-md border px-3 py-2.5 text-sm font-medium transition-colors ${
                  champs.mode === m
                    ? "border-red bg-red/10 text-text"
                    : "border-card-border text-text-muted hover:text-text"
                }`}
              >
                {m === "retrait" ? "Retrait boutique" : "Livraison"}
              </button>
            ))}
          </div>
          {champErreur("mode") && <MessageErreur texte={champErreur("mode")!} />}
        </fieldset>

        {champs.mode === "livraison" && (
          <>
            <Champ id="ville" label="Ville" erreur={champErreur("ville")}>
              <div className="relative">
                <select
                  id="ville"
                  ref={(el) => {
                    refs.current.ville = el;
                  }}
                  value={champs.ville}
                  onChange={(e) => set("ville", e.target.value as Ville)}
                  onBlur={() => toucher("ville")}
                  className={`${champClasse(!!champErreur("ville"))} appearance-none pr-9`}
                >
                  <option value="">Choisir…</option>
                  <option value="Ouagadougou">Ouagadougou</option>
                  <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
                  <option value="Banfora">Banfora</option>
                  <option value="autre">Autre</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              </div>
            </Champ>

            <Champ id="quartier" label="Quartier" erreur={champErreur("quartier")}>
              <input
                id="quartier"
                ref={(el) => {
                  refs.current.quartier = el;
                }}
                type="text"
                value={champs.quartier}
                onChange={(e) => set("quartier", e.target.value)}
                onBlur={() => toucher("quartier")}
                className={champClasse(!!champErreur("quartier"))}
              />
            </Champ>
          </>
        )}

        <Champ id="note" label="Note (facultatif)" erreur={champErreur("note")}>
          <textarea
            id="note"
            ref={(el) => {
              refs.current.note = el;
            }}
            value={champs.note}
            onChange={(e) => set("note", e.target.value)}
            onBlur={() => toucher("note")}
            rows={3}
            maxLength={200}
            className={`${champClasse(!!champErreur("note"))} resize-none`}
          />
          <p className="mt-1 text-right text-xs text-text-muted">{champs.note.length}/200</p>
        </Champ>

        <details className="rounded-md border border-card-border bg-bg-alt p-3 text-sm">
          <summary className="cursor-pointer font-medium text-text">
            Récapitulatif ({totaux.nombreArticles} article{totaux.nombreArticles > 1 ? "s" : ""}) ·{" "}
            {formaterPrix(totaux.sousTotal)}
          </summary>
          <ul className="mt-3 flex flex-col gap-1.5 border-t border-card-border pt-3">
            {resolues.map(({ ligne, produit, variante }) => (
              <li key={`${ligne.produitId}-${ligne.varianteId}`} className="flex justify-between gap-2 text-text-muted">
                <span>
                  {produit.nom} ({variante.plateforme}) × {ligne.quantite}
                </span>
                <span className="shrink-0 text-text">
                  {variante.prix === null ? "[Prix à fournir]" : formaterPrix(variante.prix * ligne.quantite)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-card-border pt-3 font-semibold text-text">
            <span>Sous-total{totaux.articlesSansPrix > 0 ? " (hors articles sans prix)" : ""}</span>
            <span>{formaterPrix(totaux.sousTotal)}</span>
          </div>
        </details>

        <button
          type="submit"
          className="rounded-md bg-red py-3 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
        >
          Envoyer la commande sur WhatsApp
        </button>
      </form>
    </Container>
  );
}

function champClasse(enErreur: boolean): string {
  return `w-full rounded-md border bg-bg px-3 py-2.5 text-sm text-text focus:outline-none ${
    enErreur ? "border-red" : "border-card-border"
  }`;
}

function Champ({
  id,
  label,
  erreur,
  children,
}: {
  id: string;
  label: string;
  erreur?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {erreur && <MessageErreur texte={erreur} />}
    </div>
  );
}

function MessageErreur({ texte }: { texte: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {texte}
    </p>
  );
}
