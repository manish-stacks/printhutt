import { formatCurrency } from '@/helpers/helpers';
import { useCartStore } from '@/store/useCartStore';
import React, { useEffect, useState } from 'react';
import { BsX } from 'react-icons/bs';
import { RiArrowDownSLine, RiArrowUpSLine, RiSecurePaymentLine, RiTruckLine, RiVerifiedBadgeLine } from 'react-icons/ri';
import { useOtp } from '@/hooks/useOtp';
import { useUserStore } from '@/store/useUserStore';
import { CheckoutAddressForm } from './checkout/address-form';
import Image from 'next/image';
import { create_a_new_order, initiate_Payment } from '@/_services/common/order';
import MailModal from './MailModal';
import { getAllCouponsPagination } from '@/_services/admin/coupon';
import confetti from 'canvas-confetti';
import siteLogo from '/public/print-hutt-logo.webp';
import { commonApi } from '@/_services/common/common';
import { toast } from 'react-toastify';
import axios from 'axios';

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
}
function CheckOutPopUp({ isOpen, onClose }: ModalProps) {
    const [totalPrice, setTotalPrice] = useState({ totalPrice: 0, discountPrice: 0, shippingTotal: 0 });
    const { items, getTotalItems, getTotalPrice } = useCartStore();
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const [selectAddress, setSelectAddress] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showMailModal, setShowMailModal] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [availableCoupons, setAvailableCoupons] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [originalPrice, setOriginalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'offline'>('online');
    const [isCoupon, setIsCoupon] = useState(true);
    const [showSummary, setShowSummary] = useState(false);
    const [coupon_mark, setCoupon_mark] = useState('');

    const {
        emailOrMobile,
        otp,
        isOtpSent,
        timer,
        isResendEnabled,
        loading,
        handleInputChange,
        sendOtp,
        handleOtpKeyDown,
        handleChangeOtp,
        verifyOtp,
    } = useOtp();

    useEffect(() => {
        const price = getTotalPrice();
        setTotalPrice(price);
        setOriginalPrice(price.discountPrice);

    }, [items, getTotalPrice, paymentMethod]);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const data = await commonApi.getCouponsCode();
                setAvailableCoupons(data.coupons || []);

                // Auto apply best coupon
                /*if (data.coupons?.length > 0) {
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
                }*/


            } catch (error) {
                console.error("Failed to fetch coupons:", error);
            }
        };
        fetchCoupons();

    }, [totalPrice.totalPrice]);

    const handleClose = () => {
        onClose()
    }

    const handleChangeAddress = (id: string) => {
        setSelectAddress(id);
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

    const handleSelect = (coupon) => {

        if (paymentMethod === 'offline') {
            toast.error('COD Not Applied for Coupons');
            return;
        }
        if (selectedCoupon?.code === coupon.code) {
            toast.error('This coupon has already been applied');
            return;
        }

        if (totalPrice.totalPrice < coupon.minimumPurchaseAmount) {
            toast.error(`Minimum purchase amount of ${formatCurrency(coupon.minimumPurchaseAmount)} required`);
            return;
        }


        applyCouponDiscount(coupon);
    };

    const handleMarkChange = (e) => {
        const { value } = e.target;
        setCoupon_mark(value);
        setErrorMsg('');
    };
    const handle_apply_code = async () => {
        if (!coupon_mark.trim()) {
            toast.error('Please enter a coupon code');
            return;
        }

        if (selectedCoupon?.code === coupon_mark) {
            toast.error('This coupon has already been applied');
            return;
        }

        try {
            const page = 1;
            const query = "";
            const data = await getAllCouponsPagination(page, query);
            const coupon = data.coupons.find((c) => c.code === coupon_mark);
            console.log(data)
            if (coupon) {
                handle_select(coupon);
                setErrorMsg(''); // Clear the error message
                toast.success('Coupon applied successfully');
            } else {
                toast.error('Invalid coupon code. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to apply coupon. Please try again.');
            // console.error(error);
        }
    };
    const handle_select = (coupon) => {
        if (selectedCoupon?.code === coupon.code) {
            toast.error('This coupon has already been applied');
            return;
        }

        if (originalPrice < coupon.minimumPurchaseAmount) {
            toast.error(`Minimum purchase amount of ${formatCurrency(coupon.minimumPurchaseAmount)} required`);
            return;
        }

        applyCouponDiscount(coupon);
    };

    const applyCouponDiscount = async (coupon) => {
        console.log(coupon)
        try {
            const response = await axios.post('/api/coupon/apply', { couponId: coupon._id });
            if (response.data.success) {
                toast.error(response.data.message || 'Failed to apply coupon. Please try again.');
                return;
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to apply coupon. Please try again.');
        }
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
            toast.error(`Minimum purchase amount of ${formatCurrency(coupon.minimumPurchaseAmount)} required`);
        }
    };

    const setPaymentFunction = (value: string) => {
        setPaymentMethod(value);

        if (value === 'offline') {
            if (selectedCoupon) {
                toast.error('COD Not Applied for Coupons');
            }
            setSelectedCoupon(null);
            setTotalPrice(prev => ({
                ...prev,
                coupon_discount: 0
            }));

        }
        else {
            setErrorMsg('');
        }
        console.log(value)
    }

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
                coupon_discount: Math.floor(totalPrice?.coupon_discount?.toFixed(2) || 0)
            },
            coupon: {
                id: selectedCoupon?._id || null,
                code: selectedCoupon?.code || '',
                discountAmount: Math.floor(selectedCoupon?.discountValue) || 0,
                discountType: selectedCoupon?.discountType || "",
                isApplied: selectedCoupon?.isActive || false,
            },
            paymentMethod: paymentMethod,
            address: selectAddress,
            payAmt: Math.floor(totalPrice.discountPrice)
        };
        // console.log(order)
        // return 
        try {
            setIsSubmitting(true);
            const response: { order: { _id: string } } = await create_a_new_order(order);
            // console.log(response)
            // return
            if (response.success) {
                await paymentintInitiation(response.order);
            } else {
                if (response.message == "Email address is required.") {
                    setShowMailModal(true);
                }
                else {
                    toast.error(response.message);
                }
            }

        } catch (error) {
            console.error(error);
            setErrorMsg(error.message || 'Something Went Wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg relative">
                        <button
                            onClick={handleClose}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                        >
                            <BsX size={20} />
                        </button>

                        <div className="p-6 h-screen">
                            {/* Header */}
                            <div className="flex justify-center mb-4 pt-2">
                                {/* <BiShoppingBag className="w-8 h-8" /> */}
                                <Image src={siteLogo} alt="Logo" width={100} height={50} />
                            </div>

                            {/* Discount Banner */}

                            {/* Order Summary */}
                            <div className="mb-6 bb-cart-box item h-[80%] overflow-auto main-box-checkout">
                                {errorMsg && <div className="text-red-600 text-sm mt-1 bg-rose-100 py-2 px-4 rounded-sm mb-2">{errorMsg}</div>}

                                <div className="bg-white border rounded-lg shadow-sm mb-6">
                                    <div
                                        onClick={() => setShowSummary(!showSummary)}
                                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-orange-100 rounded-full">
                                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
                                                <p className="text-sm text-gray-500">{items.length} {items.length === 1 ? 'Item' : 'Items'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-medium text-gray-900">{formatCurrency(totalPrice.discountPrice)}</span>
                                            {showSummary ?
                                                <RiArrowUpSLine className="text-gray-400 w-6 h-6" /> :
                                                <RiArrowDownSLine className="text-gray-400 w-6 h-6" />
                                            }
                                        </div>
                                    </div>

                                    {(!isLoggedIn || showSummary) && (
                                        <div className="border-t px-4 py-3 space-y-3">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Subtotal</span>
                                                    <span>{formatCurrency(totalPrice.totalPrice)}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Delivery Charges</span>
                                                    <span className="text-green-600">{totalPrice.shippingTotal > 0 ? formatCurrency(totalPrice.shippingTotal) : 'Free'}</span>
                                                </div>
                                                {selectedCoupon && (
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-600">Coupon Discount</span>
                                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{selectedCoupon.code}</span>
                                                        </div>
                                                        <span className="text-green-600">-{formatCurrency(totalPrice?.coupon_discount)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Extra Discount</span>
                                                    <span className="text-green-600">
                                                        -{formatCurrency((totalPrice?.totalPrice || 0) - (totalPrice?.discountPrice || 0) - (totalPrice?.coupon_discount || 0))}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="border-t pt-3">
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-gray-900">Total Amount</span>
                                                    <span className="font-medium text-gray-900">{formatCurrency(totalPrice.discountPrice + totalPrice.shippingTotal)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Available Coupons */}
                                {
                                    (isLoggedIn && (availableCoupons.length > 0)) && (
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between cursor-pointer bg-gray-100 p-3 rounded-t-lg"
                                                onClick={() => setIsCoupon(!isCoupon)}>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                                    </svg>
                                                    <h3 className="text-lg font-medium text-gray-800">Available Coupons</h3>
                                                </div>
                                                {isCoupon ? <RiArrowUpSLine size={22} /> : <RiArrowDownSLine size={22} />}
                                            </div>

                                            {isCoupon && (
                                                <div className="border-x border-b rounded-b-lg p-3 space-y-3">
                                                    {availableCoupons.map((coupon) => (
                                                        <div key={coupon.code}
                                                            className="relative border border-dashed border-gray-300 rounded-lg p-4 bg-white hover:border-orange-300 transition-colors">
                                                            <div className="flex justify-between items-center">
                                                                <div className="space-y-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="bg-orange-100 text-orange-800 font-medium px-2 py-0.5 rounded text-sm">
                                                                            {coupon.code}
                                                                        </span>
                                                                        {selectedCoupon === coupon && (
                                                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                                                                Applied
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-green-700 text-sm font-medium">
                                                                        {coupon.discountType === "percentage"
                                                                            ? `${coupon.discountValue}% off`
                                                                            : `₹${coupon.discountValue} off`}
                                                                    </p>
                                                                    <p className="text-gray-500 text-xs">
                                                                        Min. order: ₹{coupon.minimumPurchaseAmount}
                                                                    </p>
                                                                </div>
                                                                {selectedCoupon !== coupon && (
                                                                    <button
                                                                        onClick={() => handleSelect(coupon)}
                                                                        className="px-4 py-1.5 text-sm font-medium text-orange-600 border border-orange-600 rounded-full hover:bg-orange-50 transition-colors"
                                                                    >
                                                                        Apply
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <div className="mt-4">
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter coupon code"
                                                                name="coupon_mark"
                                                                value={coupon_mark}
                                                                onChange={handleMarkChange}
                                                                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-colors"
                                                            />
                                                            <button
                                                                onClick={handle_apply_code}
                                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm font-medium"
                                                            >
                                                                Apply
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                }
                                {!isLoggedIn ? (
                                    !isOtpSent ? (
                                        <div className="my-5">
                                            <h3 className="text-lg font-medium mb-2">Enter phone number</h3>
                                            {/* <p className="text-gray-600 text-sm mb-2">
                                                Provide your phone number to continue
                                            </p> */}
                                            <div className="flex gap-2 border rounded-lg p-2">
                                                <select className="bg-transparent">
                                                    <option>+91</option>
                                                </select>
                                                <input
                                                    value={emailOrMobile}
                                                    onChange={handleInputChange}
                                                    type="tel"
                                                    placeholder="10-digit phone number"
                                                    className="flex-1 outline-none border-0"
                                                    pattern="[0-9]{10}"
                                                    required
                                                    maxLength={10}
                                                />
                                            </div>

                                            <button
                                                onClick={sendOtp}
                                                className="w-full bg-yellow-400 text-slate-700 mt-6 py-3 px-6 max-[567px]:px-1 rounded-md font-medium hover:bg-yellow-500 flex items-center justify-center gap-2"
                                            >
                                                {loading ? 'Sending OTP...' : 'Send OTP'}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="mb-4">
                                            <h3 className="text-lg font-medium mb-2">Verify OTP</h3>
                                            <p className="text-gray-600 text-sm mb-2">
                                                Enter the OTP sent to your phone
                                            </p>
                                            <div className="flex gap-2">
                                                {otp.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        id={`otp-input-${index}`}
                                                        type="text"
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) => handleChangeOtp(e.target.value, index)}
                                                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                                        className="flex-1 border rounded-lg p-2 outline-none text-center"
                                                    />
                                                ))}
                                            </div>
                                            <div>
                                                {isResendEnabled ? (
                                                    <button
                                                        type="button"
                                                        onClick={sendOtp}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        {loading ? 'Resending...' : 'Resend OTP'}
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-500">
                                                        {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : '00:00'}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                onClick={verifyOtp}
                                                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                                            >
                                                {loading ? 'Verifying...' : 'Verify'}
                                            </button>
                                        </div>
                                    )
                                ) : (
                                    <CheckoutAddressForm onChangeAddress={handleChangeAddress} isCheckout={isSubmitting} placeOrder={placeOrder} paymentMethod={paymentMethod} setPaymentFunction={setPaymentFunction} totalPrice={totalPrice} />
                                )}
                            </div>
                            <div className="flex justify-center gap-8 py-4 border-t">
                                <div className="text-center">
                                    <div className="w-8 h-8 mx-auto mb-1 bg-gray-200 rounded-full" >
                                        <RiSecurePaymentLine className='h-8 w-8' />
                                    </div>
                                    <span className="text-xs text-gray-600">Secure payments</span>
                                </div>
                                <div className="text-center">
                                    <div className="w-8 h-8 mx-auto mb-1 bg-gray-200 rounded-full" >
                                        <RiTruckLine className='h-8 w-8' />
                                    </div>
                                    <span className="text-xs text-gray-600">Assured delivery</span>
                                </div>
                                <div className="text-center">
                                    <div className="w-8 h-8 mx-auto mb-1 bg-gray-200 rounded-full">

                                        <RiVerifiedBadgeLine className='h-8 w-8' />
                                    </div>
                                    <span className="text-xs text-gray-600">Verified seller</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )
            }

            {
                showMailModal && (
                    <MailModal isOpen={showMailModal} onClose={() => setShowMailModal(false)} />
                )
            }
        </>
    );
}

export default CheckOutPopUp;