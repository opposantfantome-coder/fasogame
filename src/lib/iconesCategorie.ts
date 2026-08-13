import { Disc3, Gamepad2, Gift, Headphones, MonitorPlay } from "lucide-react";
import type { Categorie } from "./types";

export const ICONES_CATEGORIE: Record<Categorie, typeof Disc3> = {
  Jeux: Disc3,
  Consoles: MonitorPlay,
  Manettes: Gamepad2,
  Accessoires: Headphones,
  "Cartes cadeaux": Gift,
};
