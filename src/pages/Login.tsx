'use client'
import React, { FormEvent, useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [emailOrMobile, setEmailOrMobile] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // verify otp
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loadingOtp, setLoadingOtp] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [timer, setTimer] = useState<number>(30);
  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);
  const fetchUserDetails = useUserStore((state) => state.fetchUserDetails);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

      if(data) {
        toast.success(`Otp sent to ${emailOrMobile}`);
      } else {
        toast.error(`Failed to send OTP to ${emailOrMobile}`);
      }
      setIsOtpSent(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Failed to send OTP:", error);
      }
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmitVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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
        setSuccess(data.message);
        toast.success(data.message);
        return router.push('/user/dashboard');
      } else {
        toast.error('Unauthorized access');
        return router.push('/login');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.response?.data?.error || "Failed to verify/expired OTP.");
      }
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

      if(data) {
        toast.success(`OTP sent to ${emailOrMobile}`);
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <>
      <Breadcrumb title="Login" />

      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-4xl mx-auto">
          <div 
            className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden border bg-white"
            data-aos="fade-up"
            data-aos-duration={1000}
            data-aos-delay={200}
          >
            {/* Left Panel */}
            <div className="hidden md:flex bg-blue-500 text-white md:w-1/2 flex-col items-center justify-center p-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">Login</h1>
              <p className="text-center text-sm mb-6 px-4">
                Get access to your Orders, Wishlist and Recommendations
              </p>
              <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center">
                <img
                  src={!isOtpSent 
                    ? "https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg"
                    : "https://t4.ftcdn.net/jpg/03/39/70/91/360_F_339709166_kKKqiQFynWG7bEkl3LisH3saRrEB0HGa.jpg"
                  }
                  alt="Illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-1/2 p-6 md:p-8">
              {!isOtpSent ? (
                <form className="w-full" onSubmit={handleSubmitSendOtp}>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium mb-2 text-gray-700"
                  >
                    Enter Email/Mobile number
                  </label>
                  <input
                    type="text"
                    value={emailOrMobile}
                    onChange={handleInputChange}
                    placeholder="Email/Mobile number"
                    autoComplete="off"
                    className={`w-full p-3 pl-0 text-md border-0 rounded-none border-b-2 ${
                      errorMessage ? "border-rose-700" : "border-gray-300"
                    } focus:outline-none focus:border-blue-500 mb-4`}
                  />
                  {errorMessage && <div className="text-rose-800 mb-4">{errorMessage}</div>}

                  <p className="text-sm text-gray-500 mb-6">
                    By continuing, you agree to PrintHutt&apos;s{" "}
                    <a href="#" className="text-blue-600">Terms of Use</a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600">Privacy Policy</a>.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-md text-lg font-semibold ${
                      loading
                        ? "bg-rose-950 cursor-not-allowed"
                        : "bg-rose-600 text-white hover:bg-orange-600"
                    }`}
                  >
                    {loading ? "Sending OTP..." : "Request OTP"}
                  </button>
                </form>
              ) : (
                <div className="w-full">
                  <p className="text-center text-gray-800 text-sm mb-6">
                    Please enter the OTP sent to <br />
                    <span className="font-semibold">{emailOrMobile}</span>{" "}
                    <button 
                      onClick={() => window.location.reload()} 
                      className="text-blue-600 font-medium"
                    >
                      Change
                    </button>
                  </p>

                  <form onSubmit={handleSubmitVerifyOtp}>
                    <div className="flex justify-center mb-6 space-x-2 md:space-x-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleChangeOtp(e.target.value, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className="w-8 md:w-10 h-10 md:h-12 text-center text-md md:text-2xl border-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ))}
                    </div>
                    
                    {error && <p className="text-red-500 text-center mb-3">{error}</p>}
                    {success && <p className="text-green-500 text-center mb-3">{success}</p>}
                    
                    <button
                      type="submit"
                      disabled={loadingOtp}
                      className={`w-full py-3 rounded-md text-lg font-semibold ${
                        loadingOtp
                          ? "bg-blue-950 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {loadingOtp ? "Verifying..." : "Verify"}
                    </button>
                  </form>

                  <p className="text-sm text-gray-500 mt-6 text-center">
                    Not received your code?{" "}
                    <span className="text-black font-semibold">
                      {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : '00:00'}
                    </span>
                  </p>

                  {isResendEnabled && (
                    <div className="text-center">
                      <button
                        onClick={sendOTP}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;