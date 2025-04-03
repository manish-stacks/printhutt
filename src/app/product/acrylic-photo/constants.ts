import { SizeOption } from "@/lib/types";


export const DEFAULT_IMAGE_URL = 'https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664965/Preview-image_pctpb7_sq7lcn.png';

export const BUTTON_VALUES_AND_PRICES: SizeOption[] = [
  {
    size: '12x8',
    thickness: [
      { value: '3mm', price: 800, default: true },
      { value: '5mm', price: 1000 },
      { value: '8mm', price: 1200 },
    ],
    default: true,
  },
  {
    size: '18x12',
    thickness: [
      { value: '3mm', price: 1200 },
      { value: '5mm', price: 1600 },
      { value: '8mm', price: 2000 },
    ],
  },
  {
    size: '24x18',
    thickness: [
      { value: '3mm', price: 2000 },
      { value: '5mm', price: 2600 },
      { value: '8mm', price: 3200 },
    ],
  },
  {
    size: '36x24',
    thickness: [
      { value: '3mm', price: 3400 },
      { value: '5mm', price: 4200 },
      { value: '8mm', price: 5800 },
    ],
  },
];