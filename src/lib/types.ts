

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
    createdAt: string;
}



export interface PaginationData {
    total: number;
    pages: number;
    page: number;
    limit: number;
  }
  