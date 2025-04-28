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
    sort: string;
    type: string;
}


export interface mallerType {
    email: string,
    emailType: string,
    userId: string
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
    shipping: {
        addressLine: string,
        city: string,
        state: string,
        postCode: string,
        mobileNumber: string
    };
}


export interface Slider {
    image: string;
}

export interface Testimonial {
    _id: string;
    name: string;
    content: string;
    avatar: string;
    rating: number;
}


export interface ISlider extends Document {
    title: string;
    imageUrl: {
        url?: string;
        public_id?: string;
        fileType?: string;
    }
    link: string;
    isActive: boolean;
    leval: number;
}

export interface ITestimonial extends Document {
    name: string;
    image: {
        url?: string;
        public_id?: string;
        fileType?: string;
    }
    feedback: string;
    isActive: boolean;
}


export interface OrderDetails {
	orderId: string;
	customerName: string;
	status: string;
	items: { name: string; quantity: number; price: number,
        discountType: string, discountPrice: number }[];
	totalAmount: {
        discountPrice: number;
    };
    shipping: {
        userName:string;
        addressLine: string,
        city: string,
        state: string,
        postCode: string,
        mobileNumber: string,
        email: string
    };
    shipment:{
        trackingId:string;
    }
}



export interface ThicknessOption {
    value: string;
    price: number;
    default?: boolean;
}

export interface SizeOption {
    size: string;
    thickness: ThicknessOption[];
    default?: boolean;
}

export interface CheckoutData {
    previewCanvas: string;
    previewImage: string;
    imageUrl: string;
    radiusValue: string;
    shapeName: string;
    variant: string;
    sizeThickness: string;
    price: number;
    frameDesign: string;
    orientation: string;
}

export interface ReviewData {
    rating: number;
    review: string;
    images: string[];
    productId: string;
}