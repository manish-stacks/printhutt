

export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    level: number;
    image?: {
        url: string;
        public_id: string;
    };
    parentCategory?: {
        _id: string;
        name: string;
    };
    status:boolean,
    createdAt: string;
}



export interface PaginationData {
    total: number;
    pages: number;
    page: number;
    limit: number;
  }
  

 export interface CategoryFormData {
    parentCategory: string;
    name: string;
    slug: string;
    description: string;
    metaKeywords: string;
    metaDescription: string;
    level: string;
    imageUrl: File | string;
    status: boolean;
  }