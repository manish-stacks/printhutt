import { formatCurrency } from '@/helpers/helpers';
import { useCartStore } from '@/store/useCartStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { BsX } from 'react-icons/bs';
import { RiArrowRightSLine, RiSecurePaymentLine, RiTruckLine, RiVerifiedBadgeLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useOtp } from '@/hooks/useOtp';
import { useUserStore } from '@/store/useUserStore';
import { CheckoutAddressForm } from './checkout/address-form';
import Image from 'next/image';
import { create_a_new_order, initiate_Payment } from '@/_services/common/order';
import MailModal from './MailModal';
import { getAllCouponsPagination } from '@/_services/admin/coupon';
import confetti from 'canvas-confetti';

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
    const {
        emailOrMobile,
        otp,
        isOtpSent,
        timer,
        isResendEnabled,
        loading,
        errorMessage,
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
    }, [items, getTotalPrice]);



    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const page = 1;
                const query = "";
                const data = await getAllCouponsPagination(page, query);
                setAvailableCoupons(data.coupons || []);
            } catch (error) {
                console.error("Failed to fetch coupons:", error);
            }
        };
        fetchCoupons();
    }, []);

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
            toast.error(`Minimum purchase amount of ${formatCurrency(coupon.minimumPurchaseAmount)} required`);
        }
    };

    const setPaymentFunction = (value: string) => {
        setPaymentMethod(value);
        if (value === 'offline') {
          setTotalPrice(prev => ({
            ...prev,
            coupon_discount: 0
          }));
          setErrorMsg('COD Not Applied for Coupons');
          return;
        }
        else {
          window.location.reload();
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
            toast.error(error.message || 'Something Went Wrong');
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
                                <BiShoppingBag className="w-8 h-8" />
                            </div>

                            {/* Discount Banner */}
                            {/* <div className="bg-black text-white text-center py-2 mb-6">
                                30% off on prepaid orders
                            </div> */}

                            {/* Order Summary */}
                            <div className="mb-6 bb-cart-box item h-[80%] overflow-auto main-box-checkout">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">Order summary ({items.length} Item)</h2>
                                    <span className="text-lg">{formatCurrency(totalPrice.discountPrice)}</span>
                                </div>

                                {/* Coupon Section */}
                                {errorMsg && <div className="text-red-600 text-sm mt-1">{errorMsg}</div>}


                                {/* Available Coupons */}
                                {
                                    availableCoupons.length > 0 && (
                                        <div className="mb-4">
                                            <h3 className="text-lg font-medium mb-2">Available Coupons</h3>
                                            {availableCoupons.map((coupon) => (
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
                                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
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