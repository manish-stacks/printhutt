import { memo } from 'react';
import Image from 'next/image';
import { RiArrowDownSLine, RiArrowRightSLine, RiArrowUpSLine } from 'react-icons/ri';
import { formatCurrency } from '@/helpers/helpers';
import siteLogo from '/public/print-hutt-logo.webp';
import { CheckoutFormProps } from './interfaces';



export const CheckoutForm = memo(({ error, showSummary, setShowSummary, items, totalPrice, selectedCoupon, coupon_mark, handle_apply_code, handleMarkChange, handleRemoveCoupon, paymentMethod, setPaymentFunction, placeOrder, isCheckout, selectAddress, setAddressHandler }: CheckoutFormProps) => (

    <>
        <div className="max-h-[80vh] p-1  overflow-auto main-box-checkout">
            {/* Header */}
            {/* Logo */}
            <div className="flex justify-center mb-6">
                <Image src={siteLogo} alt="Logo" width={100} height={50} />
            </div>
            {error && (
                <p className="text-red-500 text-sm text-start py-2">{error}</p>
            )}
            {/* Order Summary */}
            <div className="bg-white border rounded-lg shadow-sm mb-6">
                <div
                    onClick={() => setShowSummary(!showSummary)}
                    className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-50"
                >
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-orange-100 rounded-full">
                            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
                            <p className="text-sm text-gray-500">{items} {items === 1 ? 'Item' : 'Items'}</p>
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

                {showSummary && (
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
            {/* Coupon Section */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        name="coupon_mark"
                        value={coupon_mark}
                        onChange={handleMarkChange}
                        className="w-full py-2 px-3 pr-24 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                    />
                    <button
                        onClick={handle_apply_code}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Apply
                    </button>
                </div>
                {selectedCoupon && (
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-green-600">✓ Coupon "{selectedCoupon.code}" applied {formatCurrency(totalPrice?.coupon_discount)} off</span>
                        <button className="text-xs text-red-500 hover:text-red-600" onClick={handleRemoveCoupon}>Remove</button>
                    </div>
                )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={selectAddress.name}
                    onChange={setAddressHandler}
                    className="w-full py-2 px-3 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="tel"
                        placeholder="Phone"
                        name="number"
                        value={selectAddress.number}
                        onChange={setAddressHandler}
                        maxLength={10}
                        className="w-full py-2 px-3 border rounded-lg "
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={selectAddress.email}
                        onChange={setAddressHandler}
                        className="w-full py-2 px-3 border rounded-lg"
                    />
                </div>
                <input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={selectAddress.state}
                    onChange={setAddressHandler}
                    className="w-full py-2 px-3 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={selectAddress.city}
                        onChange={setAddressHandler}
                        className="w-full py-2 px-3 border rounded-lg"
                    />
                    <input
                        type="tel"
                        placeholder="Post Code"
                        name="postCode"
                        value={selectAddress.postCode}
                        onChange={setAddressHandler}
                        maxLength={6}
                        className="w-full py-2 px-3 border rounded-lg"
                    />
                </div>

                <textarea
                    placeholder="Address"
                    rows={3}
                    name="address"
                    value={selectAddress.address}
                    onChange={setAddressHandler}
                    className="w-full py-2 px-3 border rounded-lg"
                />
            </div>

            {/* Payment Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="relative bg-white rounded-lg shadow-sm " onClick={() => setPaymentFunction('online')}>
                    {selectedCoupon && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-max">
                            <span className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-full whitespace-nowrap">
                                {formatCurrency(totalPrice?.coupon_discount)} off On Online Pay
                            </span>
                        </div>
                    )}
                    <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'online' ? 'border-blue-500 bg-slate-100' : ''} hover:border-blue-900 transition-colors`}>
                        <input
                            type="radio"
                            name="payment"
                            className="w-4 h-4 mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="font-medium">Pay Online</span>
                    </label>
                </div>
                <div className="relative bg-white rounded-lg shadow-sm " onClick={() => setPaymentFunction('offline')}>
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-max">
                        <span className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-full whitespace-nowrap">
                            {formatCurrency((totalPrice.totalPrice * 0.20))} Advance Pay
                        </span>
                    </div>
                    <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'offline' ? 'border-blue-500 bg-slate-100' : ''} hover:border-blue-900 transition-colors`}>
                        <input
                            type="radio"
                            name="payment"
                            className="w-4 h-4 mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="font-medium">Cash on Delivery</span>
                    </label>
                </div>
            </div>
        </div>


        {/* Complete Order Button */}
        <button
            onClick={placeOrder}
            disabled={isCheckout}
            className="w-full py-4 bg-blue-600 text-white rounded-lg  transition-colors">

            {isCheckout ? (
                'Placing Order...'
            ) : (
                <div className='flex items-center justify-center'>
                    Complete Order&nbsp;
                    <Image src="/img/shape/upi_options.svg" alt="upi" width={40} height={40} />
                    <RiArrowRightSLine className="text-[20px] ml-[5px]" />
                </div>
            )}
        </button>
    </>
));
