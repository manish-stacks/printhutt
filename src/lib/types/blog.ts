import { ImageData } from "./category";

export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    image: ImageData;
    author: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}