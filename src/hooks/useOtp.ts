import { useState, useEffect, FormEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/useUserStore';

export const useOtp = () => {
    const [emailOrMobile, setEmailOrMobile] = useState<string>('');
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30);
    const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const fetchUserDetails = useUserStore((state) => state.fetchUserDetails);
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailOrMobile(value);

        if (errorMessage) setErrorMessage('');

        // Automatically send OTP if a valid 10-digit mobile number is entered
        // if (/^\d{10}$/.test(value)) {
        //     await sendOtp();
        // }
    };

    const sendOtp = async () => {
        if (!emailOrMobile) {
            setErrorMessage('Please enter a valid Email ID/Mobile number');
            toast.error('Please enter a valid Email ID/Mobile number');
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
                toast.error('Failed to send OTP');
            }
        } catch (error: unknown) {
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            if (index > 0 && !otp[index]) {
                const updatedOtp = [...otp];
                updatedOtp[index - 1] = '';
                setOtp(updatedOtp);
                const prevInput = document.getElementById(`otp-input-${index - 1}`);
                prevInput?.focus();
            } else {
                const updatedOtp = [...otp];
                updatedOtp[index] = '';
                setOtp(updatedOtp);
            }
        }
    };

    const handleChangeOtp = (value: string, index: number) => {
        if (/^[0-9]?$/.test(value)) {
            const updatedOtp = [...otp];
            updatedOtp[index] = value;
            setOtp(updatedOtp);

            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-input-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const verifyOtp = async () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            setErrorMessage('Please enter a 6-digit OTP.');
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post('/api/auth/verify-otp', { otp: otpValue, emailOrMobile });
            console.log(data);
            toast.success(data.message || 'OTP verified successfully');
            fetchUserDetails();
            
        } catch (error: unknown) {
            toast.error((error as Error).message);
            setErrorMessage('Failed to verify OTP.');
        } finally {
            setLoading(false);
        }
    };

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

    return {
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
    };
};
