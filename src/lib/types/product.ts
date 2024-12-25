import mongoose, { Document } from "mongoose";
import { IShippingInformation } from "./shipping";

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
    keywords?: string;
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
}