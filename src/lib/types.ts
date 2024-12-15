export interface ImageType {
    url: string;
    public_id: string;
    fileType: string;
}

export interface PaginationData {
    total: number;
    pages: number;
    page: number;
    limit: number;
}


export interface CategoryFormData {
    _id?: string | undefined;
    name: string;
    slug: string;
    description: string;
    metaKeywords: string;
    metaDescription: string;
    level: string;
    imageUrl: string | File;
    status: boolean;
    parentCategory?: string;
    image?: ImageType;
}

export interface Warranty {
    _id: string;
    warrantyType: string;
    durationMonths: string;
    coverage: string;
    claimProcess: string;
}


export interface ShippingInformation {
    _id: string;
    shippingMethod: string;
    shippingFee: string | number;
    shippingTime: string;
    isFreeShipping: boolean;
    createdAt?: string;
    updatedAt?: string;
}


export interface ReturnPolicy {
    _id: string;
    returnPeriod: string;
    restockingFee: string;
    policyDetails: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Offer {
    _id: string;
    offerTitle: string;
    offerDescription: string;
    discountPercentage: number | string;
    validFrom: string;
    validTo: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Coupon {
    _id: string;
    code: string;
    description: string;
    discountType: string | 'percentage' | 'fixed' | 'free_shipping';
    discountValue: number;
    minimumPurchaseAmount: string | number;
    maxDiscountAmount?: string | number;
    validFrom: string;
    validUntil: string;
    usageLimit: number | null;
    usedCount: number;
    applicableProducts: string[];
    applicableCategories: string[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}


export interface ImageType {
    url: string;
    public_id: string;
    fileType: string;
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
    category: string;
    subcategory: string;
    price: number;
    discountType: number;
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
    tranding: boolean;
    hot: boolean;
    sale: boolean;
    new: boolean;
    isCustomize: boolean;
    images: ImageType[];
    thumbnail: any;
    keywords: string;
    meta_description: string;
    shippingFee: string|number;
    offer: string;
    isVarientStatus: boolean;
    varient: ProductVariant[];
}