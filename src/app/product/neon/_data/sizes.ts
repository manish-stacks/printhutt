import { SizePreset } from "@/lib/types/neon";

export const sizePresets: SizePreset[] = [
  { name: 'Mini', startWidth: 2.5, width: 2.5, startHeight: 3, height: 3, price: 600, perLetter: 150, lineBreak: 1 },
  { name: 'Small', startWidth: 4.5, width: 4.5, startHeight: 5, height: 5, price: 900, perLetter: 230, lineBreak: 2 },
  { name: 'Medium', startWidth: 6, width: 6, startHeight: 8, height: 8, price: 1200, perLetter: 330, lineBreak: 4, isPopular: true },
  { name: 'Large', startWidth: 8, width: 8, startHeight: 10, height: 10, price: 1800, perLetter: 400, lineBreak: 6 },
];