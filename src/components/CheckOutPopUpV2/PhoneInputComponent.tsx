import { memo } from 'react';
import { PhoneInputProps } from './interfaces';



export const PhoneInputComponent = memo(({
    phoneNumber,
    onChange,
    onKeyDown,
    onSendOtp,
    inputRef,
    loading,
    isResendEnabled,
    timer,
}: PhoneInputProps) => (
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
            {loading ? 'Sending OTP...' : 'Send OTP'}

        </button>
    </div>
));
