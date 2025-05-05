import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BiX } from 'react-icons/bi';
import { useUserStore } from '@/store/useUserStore';
import { useCartStore } from '@/store/useCartStore';
import { CheckoutForm } from './CheckoutForm';
import { ModalProps, TotalPrice, CouponItem } from './interfaces';
import { PhoneVerification } from './PhoneVerification';
import axios from 'axios';
import { toast } from 'react-toastify';
import { commonApi } from '@/_services/common/common';
import confetti from 'canvas-confetti';
import { formatCurrency } from '@/helpers/helpers';
import { getAllCouponsPagination } from '@/_services/admin/coupon';
import { create_a_new_order, initiate_Payment } from '@/_services/common/order';

const CheckOutPopUpV2: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [showSummary, setShowSummary] = useState(false);
    const [totalPrice, setTotalPrice] = useState<TotalPrice>({
        totalPrice: 0,
        discountPrice: 0,
        shippingTotal: 0
    });
    const { items, getTotalItems, getTotalPrice } = useCartStore();
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const otpInputRef = useRef<HTMLInputElement>(null);
    const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const emailOrMobile = phoneNumber;
    const fetchUserDetails = useUserStore((state) => state.fetchUserDetails);
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'offline'>('online');
    const [originalPrice, setOriginalPrice] = useState(0);
    const [availableCoupons, setAvailableCoupons] = useState([]);
    const [coupon_mark, setCoupon_mark] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Memoized handlers with useCallback
    const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhoneNumber(value);
        setError('');
    }, []);
    const [selectAddress, setSelectAddress] = useState({
        address: '',
        city: '',
        state: '',
        postCode: '',
        addressType: 'home',
        name: '',
        email: '',
        number: ''
    });

    useEffect(() => {
        const price = getTotalPrice();
        setTotalPrice(price);
        setOriginalPrice(price.discountPrice);
    }, [items, getTotalPrice, paymentMethod]);


    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const data = await commonApi.getCouponsCode();
                setAvailableCoupons(data?.coupons || []);

                // Auto apply best coupon
                if (data.coupons?.length > 0) {
                    const validCoupons = data.coupons.filter(coupon =>
                        totalPrice.totalPrice >= coupon.minimumPurchaseAmount
                    );

                    if (validCoupons.length > 0) {
                        // Find coupon with maximum discount
                        const bestCoupon = validCoupons.reduce((best, current) => {
                            const currentDiscount = current.discountType === "percentage"
                                ? Math.min((current.discountValue / 100) * totalPrice.totalPrice, current.maxDiscountAmount)
                                : current.discountValue;

                            const bestDiscount = best.discountType === "percentage"
                                ? Math.min((best.discountValue / 100) * totalPrice.totalPrice, best.maxDiscountAmount)
                                : best.discountValue;

                            return currentDiscount > bestDiscount ? current : best;
                        });

                        applyCouponDiscount(bestCoupon);
                    }
                }


            } catch (error) {
                console.error("Failed to fetch coupons:", error);
            }
        };
        fetchCoupons();

    }, [totalPrice.totalPrice]);

    const handleMarkChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target;
        setCoupon_mark(value);
    };
    const handle_apply_code = async () => {
        if (!coupon_mark.trim()) {
            setError('Please enter a coupon code');
            return;
        }

        if (selectedCoupon?.code === coupon_mark) {
            setError('This coupon has already been applied');
            return;
        }

        try {
            const page = 1;
            const query = "";
            const data = await getAllCouponsPagination(page, query);
            const coupon = data.coupons.find((c) => c.code === coupon_mark);
            if (!coupon) {
                setError('Invalid coupon code. Please try again.');
                return;
            }
            if (coupon.isActive === false) {
                setError('Invalid coupon code. Please try again.');
                return;
            }
            if (coupon) {
                handle_select(coupon);
                toast.success('Coupon applied successfully');
            } else {
                setError('Invalid coupon code. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to apply coupon. Please try again.');
            // console.error(error);
        }
    };
    const handle_select = (coupon: CouponItem) => {
        if (selectedCoupon?.code === coupon.code) {
            setError('This coupon has already been applied');
            return;
        }

        if (originalPrice < coupon.minimumPurchaseAmount) {
            setError(`Minimum purchase amount of ${formatCurrency(coupon.minimumPurchaseAmount)} required`);
            return;
        }

        applyCouponDiscount(coupon);
    };
    const applyCouponDiscount = async (coupon: CouponItem) => {


        // console.log(coupon)
        let discount = 0;

        if (originalPrice >= coupon.minimumPurchaseAmount) {
            if (coupon.discountType === "percentage") {
                discount = (coupon.discountValue / 100) * originalPrice;
                if (discount > coupon.maxDiscountAmount) {
                    discount = coupon.maxDiscountAmount;
                }
            } else if (coupon.discountType === "fixed") {
                discount = coupon.discountValue;
            }

            const finalDiscountPrice = originalPrice - discount;

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                zIndex: 10000
            });

            setTotalPrice((prev) => ({
                ...prev,
                discountPrice: finalDiscountPrice,
                coupon_discount: discount,
            }));

            setSelectedCoupon(coupon);
        } else {
            setError(`Minimum purchase amount of ${formatCurrency(coupon.minimumPurchaseAmount)} required`);
        }
    };
    const setPaymentFunction = (value: string) => {
        setPaymentMethod(value);

        if (value === 'offline') {
            if (selectedCoupon) {
                setError('COD Not Applied for Coupons');
            }
            setSelectedCoupon(null);
            setTotalPrice(prev => ({
                ...prev,
                coupon_discount: 0
            }));

        }
        console.log(value)
    }
    const handleOtpChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setOtp(value);
        setError('');
    }, []);

    const handleRemoveCoupon = useCallback(() => {
        setTotalPrice((prev) => ({
            ...prev,
            discountPrice: originalPrice,
            coupon_discount: 0,
        }));
        setSelectedCoupon(null);
    }, [])
    const handleSendOtp = useCallback(async () => {
        if (!phoneNumber || phoneNumber.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post('/api/auth/login', { emailOrMobile });
            setTimer(30);
            setIsResendEnabled(false);
            if (data) {
                toast.success(`OTP sent to ${emailOrMobile}`);
                setIsOtpSent(true);
            } else {
                setError('Failed to send OTP');
            }
        } catch (error: unknown) {
            setError('Failed to send OTP. Please try again later.');
        } finally {
            setLoading(false);
        }

    }, [phoneNumber]);

    const handleVerifyOtp = useCallback(async () => {
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }
        try {
            setLoading(true);
            const { data } = await axios.post('/api/auth/verify-otp', { otp, emailOrMobile });
            toast.success(data.message || 'OTP verified successfully');
            fetchUserDetails();
        } catch (error: unknown) {
            setError('Invalid OTP or OTP expired');
        } finally {
            setLoading(false);
        }

    }, [otp]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (!isOtpSent) {
                handleSendOtp();
            } else {
                handleVerifyOtp();
            }
        }
    }, [isOtpSent, handleSendOtp, handleVerifyOtp]);

    const handleResendOtp = useCallback(async () => {
        try {
            setOtp('');
            setError('');
            setLoading(true);
            const { data } = await axios.post('/api/auth/login', { emailOrMobile });
            setTimer(30);
            setIsResendEnabled(false);
            if (data) {
                toast.success(`OTP sent to ${emailOrMobile}`);
                setIsOtpSent(true);
            } else {
                setError('Failed to send OTP');
            }
        } catch (error: unknown) {
            setError('Failed to send OTP. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (timer === 0) {
            setIsResendEnabled(true);
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const setAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === "postCode" || name === "number") {
            newValue = value.replace(/\D/g, ""); 
        }
    
        setSelectAddress({ ...selectAddress, [name]: newValue });
    };
    const placeOrder = async () => {
        const getPrice = await getTotalPrice();

        const order = {
            items: items.map((item) => ({
                productId: item._id,
                name: item.title,
                slug: item.slug,
                quantity: item.quantity,
                sku: item.sku,
                product_image: item.thumbnail.url,
                custom_data: item.custom_data || null,
                price: item.price,
                discountType: item.discountType,
                discountPrice: item.discountPrice
            })),
            getTotalItems: getTotalItems(),
            totalPrice: {
                discountPrice: Math.floor(getPrice.discountPrice),
                shippingTotal: Math.floor(getPrice.shippingTotal),
                totalPrice: Math.floor(getPrice.totalPrice),
                coupon_discount: Math.floor(Number(totalPrice?.coupon_discount) || 0)
            },
            coupon: {
                id: selectedCoupon?._id || null,
                code: selectedCoupon?.code || '',
                discountAmount: Math.floor(Number(selectedCoupon?.discountValue) || 0),
                discountType: selectedCoupon?.discountType || "",
                isApplied: selectedCoupon?.isActive || false,
            },
            paymentMethod: paymentMethod,
            address: selectAddress,
            payAmt: Math.floor(totalPrice.discountPrice)
        };
         
        try {
            setIsSubmitting(true);
            const response: { order: { _id: string } } = await create_a_new_order(order);
            // console.log(response)
            // return
            if (response.success) {
                await paymentintInitiation(response.order);
            } else {
                setError(response.message || 'Something went wrong');
            }
        } catch (error) {
            setError(error.message || 'Something Went Wrong');
        } finally {
            setIsSubmitting(false);
        }
    };
    const paymentintInitiation = async (order) => {
        try {
            const paymentResponse = await initiate_Payment(order);
            if (paymentResponse) {
                const redirectUrl = paymentResponse?.instrumentResponse?.redirectInfo?.url;
                return window.location.href = redirectUrl;
            } else {
                toast.error("Payment initiation failed!");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Something Went Wrong');
        }
    }


    // Reset on close - using useEffect with proper dependencies
    useEffect(() => {
        if (!isOpen) {
            setPhoneNumber('');
            setOtp('');
            setIsOtpSent(false);
            setError('');
        }
    }, [isOpen]);

    // Return null early if not open to prevent unnecessary rendering
    if (!isOpen) return null;

    // Main render - keep this minimal
    return (
        <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
            <div className="relative w-full max-w-md bg-white rounded-lg p-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
                >
                    <BiX className="w-5 h-5 text-gray-500" />
                </button>

                {!isLoggedIn ? (
                    <PhoneVerification
                        isOtpSent={isOtpSent}
                        phoneNumber={phoneNumber}
                        otp={otp}
                        error={error}
                        handlePhoneChange={handlePhoneChange}
                        handleOtpChange={handleOtpChange}
                        handleKeyDown={handleKeyDown}
                        handleSendOtp={handleSendOtp}
                        handleVerifyOtp={handleVerifyOtp}
                        handleResendOtp={handleResendOtp}
                        phoneInputRef={phoneInputRef}
                        otpInputRef={otpInputRef}
                        loading={loading}
                        isResendEnabled={isResendEnabled}
                        timer={timer}
                    />
                ) : (
                    <CheckoutForm
                        error={error}
                        showSummary={showSummary}
                        setShowSummary={setShowSummary}
                        items={items.length}
                        totalPrice={totalPrice}
                        selectedCoupon={selectedCoupon}
                        coupon_mark={coupon_mark}
                        handle_apply_code={handle_apply_code}
                        handleMarkChange={handleMarkChange}
                        handleRemoveCoupon={handleRemoveCoupon}
                        paymentMethod={paymentMethod}
                        setPaymentFunction={setPaymentFunction}
                        placeOrder={placeOrder}
                        isCheckout={isSubmitting}
                        selectAddress={selectAddress}
                        setAddressHandler={setAddressHandler}
                    />
                )}
            </div>
        </div>
    );
};

export default React.memo(CheckOutPopUpV2);
