import { Document } from 'mongoose';

export interface ImageData {
  url: string;
  public_id: string;
  fileType: string;
}

export interface CategoryAttributes {
  name: string;
  slug: string;
  description?: string;
  metaKeywords?: string;
  metaDescription?: string;
  image?: ImageData;
  level: number;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryDocument extends CategoryAttributes, Document {}