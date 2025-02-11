import mongoose, { Document, Types } from "mongoose";
import { IShippingInformation } from "./shipping";
import { ImageType } from "../types";

// Interface for the Variant subdocument
export interface IVariant {
  size: string;
  color?: string;
  price: number;
  stock: number;
}

// Interface for the Thumbnail and Image subdocuments
export interface IMedia {
  url: string;
  public_id: string;
  fileType: string;
}

// Interface for the Meta subdocument
export interface IMeta {
  meta_title?: string;
  meta_keywords?: string;
  meta_description?: string;
}

// Interface for the Product document
export interface IProduct extends Document {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  category: mongoose.Types.ObjectId;
  subcategory?: mongoose.Types.ObjectId;
  price: number;
  discountType?: string;
  discountPrice: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight?: number;
  colors?: string;
  inBox?: string;
  dimensions?: string;
  isVarientStatus?: boolean;
  varient: IVariant[];
  availabilityStatus: "in_stock" | "low_stock" | "out_of_stock";
  minimumOrderQuantity: number;
  warrantyInformation?: mongoose.Types.ObjectId;
  shippingInformation?: mongoose.Types.ObjectId & IShippingInformation;
  returnPolicy?: mongoose.Types.ObjectId;
  meta: IMeta;
  thumbnail?: IMedia;
  images: IMedia[];
  reviews: mongoose.Types.ObjectId[];
  status: boolean;
  ishome: boolean;
  trending: boolean;
  hot: boolean;
  sale: boolean;
  new: boolean;
  offers: mongoose.Types.ObjectId[];
  shippingFee?: number;
  isCustomize: boolean;
  demoVideo?: string;
  imgAlt?: string;
  createdAt: Date;
  updatedAt: Date;
  customizeLink: string;
}

export interface ProductVariant {
  size: string;
  color: string;
  price: number;
  stock: number;
}

export interface ProductFormData {
  title: string;
  slug: string;
  description: string;
  short_description: string;
  category: string;
  subcategory: string;
  price: number;
  discountType: string;
  discountPrice: number;
  rating: number;
  stock: number;
  tags: string[];
  sku: string;
  weight: number;
  availabilityStatus: string;
  minimumOrderQuantity: number;
  dimensions: string;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  demoVideo: string;
  imgAlt: string;
  status: boolean;
  ishome: boolean;
  trending: boolean;
  hot: boolean;
  sale: boolean;
  new: boolean;
  isCustomize: boolean;
  images: ImageType[];
  thumbnail: IMedia; // Changed from 'any' to 'IMedia'
  keywords: string;
  meta_description: string;
  shippingFee: string | number;
  offers: string[];
  isVarientStatus: boolean;
  varient: ProductVariant[];
  customizeLink: string;
}

export interface PageProductFormData {
  title: string;
  slug: string;
  description: string;
  short_description: string;
  category: string;
  subcategory: string;
  price: number;
  discountType: string;
  discountPrice: number;
  rating: number;
  stock: number;
  tags: string[];
  sku: string;
  weight: number;
  availabilityStatus: string;
  minimumOrderQuantity: number;
  dimensions: string;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  demoVideo: string;
  imgAlt: string;
  status: boolean;
  ishome: boolean;
  trending: boolean;
  hot: boolean;
  sale: boolean;
  new: boolean;
  isCustomize: boolean;
  images: ImageType[];
  thumbnail: string | File; // Changed from 'any' to 'IMedia'
  keywords: string;
  meta_description: string;
  shippingFee: string | number;
  offers: string[];
  isVarientStatus: boolean;
  varient: ProductVariant[];
}

export interface ProductUpdateData {
  title?: string;
  slug?: string;
  description?: string;
  short_description?: string;
  category?: string;
  subcategory?: string;
  price?: number;
  discountType?: string;
  discountPrice?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  sku?: string;
  weight?: number;
  availabilityStatus?: string;
  dimensions?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  demoVideo?: string;
  imgAlt?: string;
  status?: boolean;
  ishome?: boolean;
  trending?: boolean;
  hot?: boolean;
  sale?: boolean;
  new?: boolean;
  isCustomize?: boolean;
  meta?: {
    keywords?: string;
    meta_description?: string;
  };
  shippingFee?: number;
  offers?: Types.ObjectId[];
  isVarientStatus?: boolean;
  varient?: Array<{
    size: string;
    color: string;
    price: number;
    stock: number;
  }>;
  thumbnail?: {
    url: string;
    public_id: string;
  };
  images?: Array<{
    url: string;
    public_id: string;
  }>;
}

export type Product = {
  _id: string;
  title: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
  rating: number;
  tags?: string[];
  thumbnail: {
    url: string;
  };
  varient?: {
    size: string;
    color: string;
    price: number;
    stock: number;
  };
  new: boolean;
  sale: boolean;
  hot: boolean;
  trending: boolean;
  images: [{ url: string }];
  discountType: string;
  discountPrice: number;
  stock: number;
  slug: string;
  isVarientStatus: boolean;
  meta?: {
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
  };
  reviews?: number;
  short_description?: string;
  quantity?: number;
  sku?: string;
};
