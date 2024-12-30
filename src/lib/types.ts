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


export interface mallerType {
    email: String,
    emailType: String,
    userId: String
}
export interface OrderEmailData {
    email: string;
    orderId: string;
    totalAmount: number;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
}