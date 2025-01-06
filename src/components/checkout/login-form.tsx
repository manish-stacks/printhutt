import { useUserStore } from '@/store/useUserStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import { RiNotification3Fill, RiStackFill, RiTruckLine } from 'react-icons/ri'
import { toast } from 'react-toastify';

export const CheckoutloginForm = () => {
    const [emailOrMobile, setEmailOrMobile] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(30);
    const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [loadingOtp, setLoadingOtp] = useState<boolean>(false);
    const router = useRouter();
    const fetchUserDetails = useUserStore((state) => state.fetchUserDetails);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailOrMobile(e.target.value);
        if (errorMessage) {
            setErrorMessage("");
        }
    };

    const handleSubmitSendOtp = async (e: FormEvent) => {
        e.preventDefault();
        if (!emailOrMobile) {
            setErrorMessage("Please enter a valid Email ID/Mobile number");
            toast.error("Please enter a valid Email ID/Mobile number");
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post("/api/auth/login", {
                emailOrMobile,
            });
            setTimer(30);
            setIsResendEnabled(false);

            // console.log(data);
            toast.success(`Otp send ${emailOrMobile}`);
            setIsOtpSent(true);
        } catch (error: unknown) {
            toast.error((error as Error).message);
            console.error("Failed to send OTP:", error);
        } finally {
            setLoading(false);
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


    const handleSubmitVerifyOtp = async (e: FormEvent) => {
        e.preventDefault();

        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            setError("Please enter a 6-digit OTP.");
            return;
        }

        try {
            setLoadingOtp(true);
            const { data } = await axios.post("/api/auth/verify-otp", {
                otp: otpValue,
                emailOrMobile: emailOrMobile
            });

            fetchUserDetails();
            if (data.role === 'user') {
                //router.push('/user/dashboard');
                toast.success(data.message);
            } else {
                toast.error('Unauthorized access');
                router.push('/login');
            }

        } catch (err: unknown) {
            setError((err as Error).response?.data?.error || "Failed to verify/expired OTP.");
        } finally {
            setLoadingOtp(false);
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


    const sendOTP = async () => {
        try {
            setTimer(60);
            setIsResendEnabled(false);
            const { data } = await axios.post("/api/auth/login", {
                emailOrMobile,
            });
            // console.log(data)
            toast.success(`Otp send ${emailOrMobile}`);
        } catch (error: unknown) {
            toast.error((error as Error).message);
        }
    }


    return (
        <>
            <div className="min-[992px]:w-[66.66%] w-full px-[12px] mb-[24px]">
                <div
                    className="bb-checkout-contact border-[1px] border-solid border-[#eee] p-[20px] rounded  bg-[#f1f3f6]"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={400}
                    style={{position: 'sticky',top: '20px'}}
                >

                    <div className="bg-[#E10176] p-4">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <span className="w-8 h-8 rounded-full bg-white text-[#E10176] flex items-center justify-center text-sm">1</span>
                                <span className="ml-2 font-medium text-white">LOGIN OR SIGNUP</span>
                            </div>
                        </div>
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white px-3 py-5">
                        {/* Login Form */}
                        {!isOtpSent ? (
                            <div className="p-6">
                                <form onSubmit={handleSubmitSendOtp}>
                                    <div className="mb-6 ">
                                        <input
                                            type="text"
                                            value={emailOrMobile}
                                            onChange={handleInputChange}
                                            placeholder="Email/Mobile number"
                                            autoComplete="off"
                                            className={`w-full p-3 pl-0 text-md border-0 rounded-none border-b-2 border-gray-300 ${errorMessage ? "border-rose-700" : ""
                                                } focus:outline-none focus:border-blue-500 mb-4`}
                                        />
                                    </div>

                                    <div className="text-xs text-gray-500 mb-6">
                                        <div className="flex items-start">
                                            <span>
                                                By continuing, you agree to PrintHutt{' '}
                                                <a href="#" className="text-[#2874f0]">Terms of Use</a> and{' '}
                                                <a href="#" className="text-[#2874f0]">Privacy Policy</a>.
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        disabled={loading}
                                        className={`w-full py-3 rounded-md text-lg font-semibold ${loading
                                            ? "bg-rose-950 cursor-not-allowed"
                                            : "bg-blue-600 text-white hover:bg-[#E10176]/90"
                                            }`}
                                    >
                                        {/* CONTINUE */}
                                        {loading ? "Send Otp..." : "Request OTP"}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className=" p-6">
                                <form onSubmit={handleSubmitVerifyOtp}>
                                    <div className="mb-6">
                                        <div className="mb-6">
                                            <div className="flex  mb-6 space-x-3">

                                                {otp.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        id={`otp-input-${index}`}
                                                        type="text"
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) => handleChangeOtp(e.target.value, index)}
                                                        className="w-10 h-10 text-center text-2xl border-0 rounded-none border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                                    />
                                                ))}
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <div className='text-xs text-gray-500 cursor-pointer'>
                                                    {
                                                        isResendEnabled ? (
                                                            <span
                                                                onClick={sendOTP}
                                                                className='text-blue-600'
                                                            >
                                                                Resend
                                                            </span>
                                                        ) : (
                                                            <span>{timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : '00:00'}</span>
                                                        )
                                                    }
                                                </div>
                                                <div className='text-xs text-gray-500 cursor-pointer'>
                                                    <span className='text-blue-600' onClick={() => window.location.reload()}>Change</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="text-xs text-gray-500 mb-6">
                                        <div className="flex items-start">
                                            <span>
                                                By continuing, you agree to PrintHutt{' '}
                                                <a href="#" className="text-[#2874f0]">Terms of Use</a> and{' '}
                                                <a href="#" className="text-[#2874f0]">Privacy Policy</a>.
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-3 rounded-md text-lg font-semibold ${loadingOtp
                                            ? "bg-blue-950 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                            }`}
                                    >
                                        {loadingOtp ? "Verifying..." : "Verify"}
                                    </button>
                                </form>
                            </div>
                        )}
                        {/* Advantages Section */}
                        <div className="p-6">
                            <h2 className="text-base text-gray-500 mb-6">Advantages of our secure login</h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="text-blue-700 mr-3 text-lg">
                                        <RiTruckLine />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Easily Track Orders, Hassle free Returns</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-blue-700 mr-3 text-lg">
                                        <RiNotification3Fill />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Get Relevant Alerts and Recommendation</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-blue-700 mr-3 text-lg">
                                        <RiStackFill />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Wishlist, Reviews, Ratingsand more.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white my-4 p-4 rounded shadow-sm">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <span className="w-8 h-8 rounded-full bg-[#2874f0] text-white flex items-center justify-center text-sm">2</span>
                                <span className="ml-2 font-medium text-[#2874f0] uppercase">Delivery Address</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div >

        </>
    )
}
