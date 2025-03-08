export type Font = {
  name: string;
  value: string;
};

export type NeonColor = {
  name: string;
  value: string;
  class: string;
};

export type PreviewImage = {
  id: number;
  url: string;
  alt: string;
};

export type SizePreset = {
  startWidth: number;
  startHeight: number;
  name: string;
  width: number;
  height: number;
  price: number;
  note?: string;
  isPopular?: boolean;
  perLetter: number;
  lineBreak: number;
};

export type BackboardOption = {
  name: string;
  color: string;
  price: number;
};

export type StyleOption = {
  id: string;
  name: string;
  preview: string;
  price: number;
};