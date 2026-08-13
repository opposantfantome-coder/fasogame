import type { Metadata } from "next";
import BoutonWhatsApp from "@/components/BoutonWhatsApp";
import Container from "@/components/Container";
import { lienContact } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "À propos" };

export default function PageAPropos() {
  return (
    <Container className="flex flex-col pb-12 pt-5">
      <h1 className="font-display text-[28px] font-bold text-marine">À propos</h1>

      <section className="flex flex-col gap-2">
        <h2 className="font-display text-[22px] font-bold mt-8 mb-4 text-marine">Présentation</h2>
        <p className="text-sm text-text-muted">[Contenu à fournir]</p>
      </section>

      <section id="boutiques" className="flex scroll-mt-20 flex-col gap-2">
        <h2 className="font-display text-[22px] font-bold mt-8 mb-4 text-marine">Nos boutiques</h2>
        <p className="text-sm text-text-muted">[Contenu à fournir]</p>
      </section>

      <section id="contact" className="flex scroll-mt-20 flex-col gap-3">
        <h2 className="font-display text-[22px] font-bold mt-8 mb-4 text-marine">
          Nous contacter
        </h2>
        <p className="text-sm text-text-muted">[Contenu à fournir]</p>
        <BoutonWhatsApp href={lienContact()} className="max-w-xs">
          Contacter FasoGame
        </BoutonWhatsApp>
      </section>

      <section id="reseaux" className="flex scroll-mt-20 flex-col gap-2">
        <h2 className="font-display text-[22px] font-bold mt-8 mb-4 text-marine">
          Réseaux sociaux
        </h2>
        <p className="text-sm text-text-muted">[Contenu à fournir]</p>
      </section>
    </Container>
  );
}
