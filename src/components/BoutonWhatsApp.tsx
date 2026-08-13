import { siWhatsapp } from "simple-icons";
import LogoMarque from "./LogoMarque";

interface BoutonWhatsAppProps {
  href: string;
  children: React.ReactNode;
  variante?: "pilule" | "bloc";
  className?: string;
}

export default function BoutonWhatsApp({
  href,
  children,
  variante = "bloc",
  className = "",
}: BoutonWhatsAppProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium text-white transition-colors duration-150 min-h-11";
  const styles =
    variante === "pilule"
      ? "rounded-pill bg-red px-4 py-2 text-sm hover:bg-red-dark"
      : "w-full rounded-md bg-whatsapp px-4 py-3 text-base hover:bg-whatsapp-dark";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      {variante === "bloc" && <LogoMarque icon={siWhatsapp} className="h-[18px] w-[18px]" />}
      {children}
    </a>
  );
}
