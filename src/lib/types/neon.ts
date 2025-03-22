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

export interface customSizeType {
  _id: string;
  name: string;
  maxTextLengthPerLine: number;
  maxLineLength: number;
  width: number;
  height: number;
  price: number;
  isPopular?: boolean;
}

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