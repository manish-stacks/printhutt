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
  name: string;
  width: number;
  height: number;
  price: number;
  note?: string;
  isPopular?: boolean;
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