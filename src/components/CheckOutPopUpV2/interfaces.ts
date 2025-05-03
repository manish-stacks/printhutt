export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CouponItem {
    _id: string;
    code: string;
    discountValue: number | string;
    discountType: 'percentage' | 'fixed' | 'free_shipping';
    minPurchaseAmount: number;
    maxDiscountAmount: number;
    minimumPurchaseAmount: number;
    isActive: boolean;
}

export interface TotalPrice {
    totalPrice: number;
    discountPrice: number;
    shippingTotal: number;
    coupon_discount?: string | number
}
export interface PhoneVerificationProps {
    isOtpSent: boolean;
    phoneNumber: string;
    otp: string;
    error: string;
    handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleSendOtp: () => void;
    handleVerifyOtp: () => void;
    handleResendOtp: () => void;
    phoneInputRef: React.RefObject<HTMLInputElement>;
    otpInputRef: React.RefObject<HTMLInputElement>;
    loading: boolean;
    isResendEnabled: boolean;
    timer: number;
}

export interface CheckoutFormProps {
    error: string;
    showSummary: boolean;
    setShowSummary: (show: boolean) => void;
    items: number;
    totalPrice: TotalPrice;
    selectedCoupon: CouponItem | null;
    coupon_mark: string;
    handle_apply_code: () => void;
    handleMarkChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleRemoveCoupon: () => void;
    paymentMethod: 'online' | 'offline';
    setPaymentFunction: (method: 'online' | 'offline') => void;
    placeOrder: () => Promise<void>;
    isCheckout: boolean;
    selectAddress: {
        address: string;
        city: string;
        state: string;
        postCode: string;
        addressType: string;
        name: string;
        email: string;
        number: string;
    };
    setAddressHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface OtpInputProps {
    otp: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onResend: () => void;
    onVerify: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
    loading: boolean;
    isResendEnabled: boolean;
    timer: number;
}

export interface PhoneInputProps {
    phoneNumber: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSendOtp: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
    loading: boolean;
    isResendEnabled: boolean;
    timer: number;
}