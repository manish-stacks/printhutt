import { memo } from 'react';
import { PhoneInputComponent } from './PhoneInputComponent';
import { OtpInputComponent } from './OtpInputComponent';
import { PhoneVerificationProps } from './interfaces';

export const PhoneVerification = memo(({
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
    otpInputRef,
    loading,
    isResendEnabled,
    timer,
}: PhoneVerificationProps) => (
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
                loading={loading}
                isResendEnabled={isResendEnabled}
                timer={timer}
            />
        ) : (
            <OtpInputComponent
                otp={otp}
                onChange={handleOtpChange}
                onKeyDown={handleKeyDown}
                onResend={handleResendOtp}
                onVerify={handleVerifyOtp}
                inputRef={otpInputRef}
                loading={loading}
                isResendEnabled={isResendEnabled}
                timer={timer}
            />
        )}

        {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
        )}
    </div>
));


