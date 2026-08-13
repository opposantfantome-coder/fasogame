import { siWhatsapp } from "simple-icons";
import LogoMarque from "./LogoMarque";

interface BoutonWhatsAppProps {
  href: string;
  children: React.ReactNode;
  variante?: "pilule" | "bloc" | "contour";
  className?: string;
}

export default function BoutonWhatsApp({
  href,
  children,
  variante = "bloc",
  className = "",
}: BoutonWhatsAppProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 min-h-11";
  const styles =
    variante === "pilule"
      ? "rounded-pill bg-red px-4 py-2 text-sm text-white hover:bg-red-dark"
      : variante === "contour"
        ? "w-full rounded-md border-2 border-whatsapp bg-transparent px-4 py-3 text-base text-whatsapp hover:bg-whatsapp/10"
        : "w-full rounded-md bg-whatsapp px-4 py-3 text-base text-white hover:bg-whatsapp-dark";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      {variante !== "pilule" && <LogoMarque icon={siWhatsapp} className="h-[18px] w-[18px]" />}
      {children}
    </a>
  );
}
