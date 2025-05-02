import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { BiX } from 'react-icons/bi';
import siteLogo from '/public/print-hutt-logo.webp';
import Image from 'next/image';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Memoized input components to prevent unnecessary re-renders
const PhoneInputComponent = memo(({
    phoneNumber,
    onChange,
    onKeyDown,
    onSendOtp,
    inputRef
}: {
    phoneNumber: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSendOtp: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
}) => (
    <div className="relative">
        <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Enter phone number"
            className="w-full p-3 border rounded-lg"
            maxLength={10}
            ref={inputRef}
        />
        <button
            onClick={onSendOtp}
            className="absolute right-2 top-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
            Send OTP
        </button>
    </div>
));

const OtpInputComponent = memo(({
    otp,
    onChange,
    onKeyDown,
    onResend,
    onVerify,
    inputRef
}: {
    otp: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onResend: () => void;
    onVerify: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
}) => (
    <div className="space-y-4">
        <div className="relative">
            <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Enter 6-digit OTP"
                className="w-full p-3 border rounded-lg pr-24"
                ref={inputRef}
            />
            <button
                onClick={onResend}
                className="absolute right-2 top-2 px-4 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
                Resend
            </button>
        </div>
        <button
            onClick={onVerify}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
            Verify OTP
        </button>
    </div>
));

// Memoized verification component
const PhoneVerification = memo(({
    isOtpSent,
    phoneNumber,
    otp,
    error,
    handlePhoneChange,
    handleOtpChange,
    handleKeyDown,
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp,
    phoneInputRef,
    otpInputRef
}: {
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
}) => (
    <div className="space-y-4 z-[999]">
        <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Phone Verification</h2>
            <p className="text-gray-600 text-sm mt-2">
                {!isOtpSent
                    ? "Enter your phone number to continue"
                    : "Enter the OTP sent to your phone"}
            </p>
        </div>

        {!isOtpSent ? (
            <PhoneInputComponent
                phoneNumber={phoneNumber}
                onChange={handlePhoneChange}
                onKeyDown={handleKeyDown}
                onSendOtp={handleSendOtp}
                inputRef={phoneInputRef}
            />
        ) : (
            <OtpInputComponent
                otp={otp}
                onChange={handleOtpChange}
                onKeyDown={handleKeyDown}
                onResend={handleResendOtp}
                onVerify={handleVerifyOtp}
                inputRef={otpInputRef}
            />
        )}

        {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
        )}
    </div>
));

// Memoized checkout form
const CheckoutForm = memo(({ phoneNumber }: { phoneNumber: string }) => (
    <>
        {/* Logo */}
        <div className="flex justify-center mb-6">
            <Image src={siteLogo} alt="Logo" width={100} height={50} />
        </div>

        {/* Coupon Section */}
        <div className="mb-6">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="w-full p-3 pr-24 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                />
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Apply
                </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-green-600">✓ Coupon "WELCOME" applied 100Rs off</span>
                <button className="text-xs text-red-500 hover:text-red-600">Remove</button>
            </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
            <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border rounded-lg"
            />
            <input
                type="tel"
                value={phoneNumber}
                disabled
                className="w-full p-3 border rounded-lg bg-gray-50"
            />
            <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
            />
            <textarea
                placeholder="Address"
                rows={3}
                className="w-full p-3 border rounded-lg"
            />
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="relative bg-white rounded-lg shadow-sm transition-transform hover:scale-[1.02]">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-max">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-full whitespace-nowrap">
                        200 Advance Pay Rest COD
                    </span>
                </div>
                <label className="flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input 
                        type="radio" 
                        name="payment" 
                        className="w-4 h-4 mr-3 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="font-medium">Cash on Delivery</span>
                </label>
            </div>

            <div className="relative bg-white rounded-lg shadow-sm transition-transform hover:scale-[1.02]">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-max">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-full whitespace-nowrap">
                        5% off On Online Payments
                    </span>
                </div>
                <label className="flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input 
                        type="radio" 
                        name="payment" 
                        className="w-4 h-4 mr-3 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="font-medium">Pay Online</span>
                </label>
            </div>
        </div>

        {/* Order Summary */}

        {/* Complete Order Button */}
        <button className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Complete Order
        </button>
    </>
));

const CheckOutPopUpV2: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState('');

    const phoneInputRef = useRef<HTMLInputElement>(null);
    const otpInputRef = useRef<HTMLInputElement>(null);

    // Memoized handlers with useCallback
    const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhoneNumber(value);
        setError('');
    }, []);

    const handleOtpChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setOtp(value);
        setError('');
    }, []);

    const handleSendOtp = useCallback(() => {
        if (!phoneNumber || phoneNumber.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }
        setError('');
        setIsOtpSent(true);
    }, [phoneNumber]);

    const handleVerifyOtp = useCallback(() => {
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }
        if (otp === '123456') { // Demo OTP
            setError('');
            setIsVerified(true);
        } else {
            setError('Invalid OTP');
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

    const handleResendOtp = useCallback(() => {
        setIsOtpSent(false);
        setOtp('');
    }, []);

    // Reset on close - using useEffect with proper dependencies
    useEffect(() => {
        if (!isOpen) {
            setPhoneNumber('');
            setOtp('');
            setIsOtpSent(false);
            setIsVerified(false);
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

                {isVerified ? (
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
                    />
                ) : (
                    <CheckoutForm phoneNumber={phoneNumber} />
                )}
            </div>
        </div>
    );
};

export default React.memo(CheckOutPopUpV2);