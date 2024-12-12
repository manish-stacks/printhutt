

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
    status: boolean,
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
    shippingFee: number;
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


export type CouponFormData = Omit<Coupon, '_id' | 'createdAt' | 'updatedAt' | 'usedCount'>;