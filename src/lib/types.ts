export interface ImageType {
    url: string;
    public_id: string;
    fileType: string;
    file?: File;
}
export interface PaginationData {
    total: number;
    pages: number;
    page: number;
    limit: number;
}

export interface ImageType {
    url: string;
    public_id: string;
    fileType: string;
}

export interface Option {
    value: string;
    label: string;
}

export type FilterState = {
    categories: string[]
    priceRange: [number, number]
    rating: number | null
    tags: string[]
}


