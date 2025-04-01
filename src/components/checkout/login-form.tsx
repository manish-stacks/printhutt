import React, { FormEvent, useEffect, useState, KeyboardEvent } from 'react';
import { useUserStore } from '@/store/useUserStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { RiNotification3Fill, RiStackFill, RiTruckLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useOtp } from '@/hooks/useOtp';

export const CheckoutloginForm = () => {
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

    const router = useRouter();
    const fetchUserDetails = useUserStore((state) => state.fetchUserDetails);

    return (
        <div className="bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Progress Header */}
                <div className="bg-[#E10176] p-4 rounded-t-lg shadow-sm">
                    <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-white text-[#E10176] flex items-center justify-center text-sm font-medium">1</span>
                        <span className="ml-3 font-medium text-white text-lg max-[480px]:text-sm">LOGIN OR SIGNUP</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white shadow-md rounded-b-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6 lg:p-8">
                        {/* Login Form Section */}
                        <div className="space-y-6">
                            {!isOtpSent ? (
                                <form onSubmit={(e) => { e.preventDefault(); sendOtp(); }} className="space-y-6">
                                    <div>
                                        <input
                                            type="text"
                                            value={emailOrMobile}
                                            onChange={handleInputChange}
                                            placeholder="Email/Mobile number"
                                            autoComplete="off"
                                            className={`w-full p-3 text-lg border-0 border-b-2 rounded-none ${
                                                errorMessage ? "border-rose-700" : "border-gray-300"
                                            } focus:outline-none focus:border-blue-500 transition-colors`}
                                        />
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        <p>
                                            By continuing, you agree to PrintHutt{' '}
                                            <a href="#" className="text-[#2874f0] hover:underline">Terms of Use</a> and{' '}
                                            <a href="#" className="text-[#2874f0] hover:underline">Privacy Policy</a>.
                                        </p>
                                    </div>

                                    <button
                                        disabled={loading}
                                        className={`w-full py-4 rounded-md text-lg font-semibold transition-colors ${
                                            loading
                                                ? "bg-rose-950 cursor-not-allowed"
                                                : "bg-blue-600 text-white hover:bg-[#E10176]"
                                        }`}
                                    >
                                        {loading ? "Sending OTP..." : "Request OTP"}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={(e) => { e.preventDefault(); verifyOtp(); }} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-center space-x-3 sm:space-x-4 max-[480px]:space-x-1">
                                            {otp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    id={`otp-input-${index}`}
                                                    type="text"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleChangeOtp(e.target.value, index)}
                                                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                                    className="w-10 h-12 max-[480px]:w-8 max-[480px]:h-9 text-center text-xl max-[480px]:text-sm rounded-none border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                                                />
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center text-sm">
                                            <div>
                                                {isResendEnabled ? (
                                                    <button
                                                        type="button"
                                                        onClick={sendOtp}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        Resend OTP
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-500">
                                                        {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : '00:00'}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => window.location.reload()}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                Change Number
                                            </button>
                                        </div>
                                    </div>

                                    {errorMessage && (
                                        <div className="text-rose-600 text-sm p-3 bg-rose-50 rounded-md">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-500">
                                        <p>
                                            By continuing, you agree to PrintHutt{' '}
                                            <a href="#" className="text-[#2874f0] hover:underline">Terms of Use</a> and{' '}
                                            <a href="#" className="text-[#2874f0] hover:underline">Privacy Policy</a>.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loadingOtp}
                                        className={`w-full py-4 rounded-md text-lg font-semibold transition-colors ${
                                            loadingOtp
                                                ? "bg-blue-950 cursor-not-allowed"
                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                                    >
                                        {loadingOtp ? "Verifying..." : "Verify OTP"}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Advantages Section */}
                        <div className="border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-6 max-[480px]:hidden">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Advantages of our secure login</h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <RiTruckLine className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Easily Track Orders, Hassle free Returns</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <RiNotification3Fill className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Get Relevant Alerts and Recommendations</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <RiStackFill className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Wishlist, Reviews, Ratings and more</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delivery Address Section */}
                <div className="mt-8 bg-white rounded-lg shadow-md hidden">
                    <div className="p-4 sm:p-6">
                        <div className="flex items-center">
                            <span className="w-8 h-8 rounded-full bg-[#2874f0] text-white flex items-center justify-center text-sm font-medium">2</span>
                            <span className="ml-3 font-medium text-[#2874f0] uppercase text-lg max-[480px]:text-sm">Delivery Address</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutloginForm;