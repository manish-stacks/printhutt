import { memo } from 'react';
import { OtpInputProps } from './interfaces';



export const OtpInputComponent = memo(({
    otp,
    onChange,
    onKeyDown,
    onResend,
    onVerify,
    inputRef,
    loading,
    isResendEnabled,
    timer,
}: OtpInputProps) => (

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
                {isResendEnabled ? (
                    loading ? 'Resending...' : 'Resend OTP'
                ) : (
                    <span className="text-gray-500">
                        {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : '00:00'}
                    </span>
                )}
            </button>
        </div>
        <button
            onClick={onVerify}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
            {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
    </div>
));