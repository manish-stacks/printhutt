import { ImageType } from "../types";
import { ImageData } from "./category";

export interface BlogPost {
  _id: string;
  category: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  image: ImageData;
  author: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogCategory {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface BlogFormData {
  _id?: string | undefined;
  category: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  metaKeywords: string;
  metaTitle: string;
  metaDescription: string;
  author: string;
  imageUrl: string | File;
  status: boolean;
  image?: ImageType;
  parentCategory?: string | null; // Specify a more specific type instead of 'any'
  productCount?: number;
}