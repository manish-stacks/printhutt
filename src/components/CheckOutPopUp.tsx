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
                const page = 1;
                const query = "";
                const data = await getAllCouponsPagination(page, query);
                setAvailableCoupons(data.coupons || []);
                
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
                setErrorMsg("Payment initiation failed!");
            }
        } catch (error) {
            console.error(error);
            setErrorMsg(error.message || 'Something Went Wrong');
        }
    }

    const handleSelect = (coupon) => {

        if (paymentMethod === 'offline') {
            setErrorMsg('COD Not Applied for Coupons');
            return;
        }
        if (selectedCoupon?.code === coupon.code) {
            setErrorMsg('This coupon has already been applied');
            return;
        }

        if (totalPrice.totalPrice < coupon.minimumPurchaseAmount) {
            setErrorMsg(`Minimum purchase amount of ${formatCurrency(coupon.minimumPurchaseAmount)} required`);
            return;
        }


        applyCouponDiscount(coupon);
    };

    const applyCouponDiscount = (coupon) => {
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
            setErrorMsg(`Minimum purchase amount of ${formatCurrency(coupon.minimumPurchaseAmount)} required`);
        }
    };

    const setPaymentFunction = (value: string) => {
        setPaymentMethod(value);

        if (value === 'offline') {
            if (selectedCoupon) {
                setErrorMsg('COD Not Applied for Coupons');
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
                code: selectedCoupon?.code || '',
                discountAmount: Math.floor(selectedCoupon?.discountValue) || 0,
                discountType: selectedCoupon?.discountType || "",
                isApplied: selectedCoupon?.isActive || false,
            },
            paymentMethod: paymentMethod,
            address: selectAddress,
            payAmt: Math.floor(totalPrice.discountPrice)
        };

        console.log('order checkout', order);

        try {
            setIsSubmitting(true);
            const response: { order: { _id: string } } = await create_a_new_order(order);
            console.log(response)
            if (response.success) {
                await paymentintInitiation(response.order);
            } else {
                if (response.message == "Email address is required.") {
                    setShowMailModal(true);
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
                            <div className="bg-black text-white text-center py-2 mb-6 rounded-md">
                                <div className="flex justify-between items-center px-2">
                                    <h2 className="text-lg font-semibold">Order summary ({items.length} Item)</h2>
                                    <span className="text-lg">{formatCurrency(totalPrice.discountPrice)}</span>
                                </div>
                            </div>
                            {/* Order Summary */}
                            <div className="mb-6 bb-cart-box item h-[80%] overflow-auto main-box-checkout">


                                {/* Coupon Section */}
                                {errorMsg && <div className="text-red-600 text-sm mt-1 bg-rose-100 py-2 px-4 rounded-sm mb-2">{errorMsg}</div>}


                                {/* Available Coupons */}
                                {
                                    availableCoupons.length > 0 && (
                                        <div className="mb-4 border rounded p-3">
                                            <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setIsCoupon(!isCoupon)}>
                                                <h3 className="text-lg text-orange-800">Available Coupons</h3>

                                                <button
                                                    type="button"
                                                    className="text-gray-600 hover:text-black transition-all"
                                                >
                                                    {isCoupon ? <RiArrowUpSLine size={22} /> : <RiArrowDownSLine size={22} />}
                                                </button>
                                            </div>

                                            {isCoupon && availableCoupons.map((coupon) => (
                                                <div className="border rounded p-3 mb-4" key={coupon.code}>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-green-600">●</span>
                                                            <span>{coupon.code}</span>
                                                        </div>
                                                        {selectedCoupon === coupon ? (
                                                            <div className='bg-green-600 text-green-100 px-2 rounded-lg'>Applied</div>
                                                        ) : (
                                                            <button className={`text-blue-600`} onClick={() => handleSelect(coupon)}>
                                                                Apply
                                                            </button>

                                                        )}
                                                    </div>
                                                    <div className="text-green-600 text-sm mt-1">
                                                        Apply coupon and save {coupon.discountType === "percentage"
                                                            ? `${coupon.discountValue}% off`
                                                            : `₹${coupon.discountValue} off`}
                                                    </div>
                                                </div>
                                            ))}
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