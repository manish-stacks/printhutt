'use client'
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!emailOrMobile) {
      setErrorMessage("Please enter a valid Email ID/Mobile number");
      toast.error("Please enter a valid Email ID/Mobile number");
      return;
    }

    try {
      const {data} = await axios.post("/api/auth/request-otp", {
        emailOrMobile,
      });
      console.log(data);
      // setIsOtpSent(true);
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  const handleInputChange = (e) => {
    setEmailOrMobile(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };


  return (
    <>

      {/* Breadcrumb */}
      <Breadcrumb title={"Login"} />

      {!isOtpSent ? (
        <div className="flex items-center justify-center max-[991px]:p-[10px]">
          <div className="flex w-6/12  max-[991px]:w-full h-[500px] shadow-lg rounded-lg overflow-hidden border" data-aos="fade-up"
            data-aos-duration={1000}
            data-aos-delay={200}>
            {/* Left Panel */}
            <div className="bg-blue-500 text-white w-1/2 flex flex-col items-center justify-center max-[991px]:hidden">
              <h1 className="text-3xl font-bold mb-4">Login</h1>
              <p className="text-center text-sm mb-6 px-4">
                Get access to your Orders, Wishlist and Recommendations
              </p>
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                <img
                  src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg" // Replace with your illustration
                  alt="Illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            {/* Right Panel */}
            <div className="w-1/2 max-[991px]:w-full bg-white flex flex-col justify-center items-center p-6">
              <form className="w-full">
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
                  className={`w-full p-3 pl-0 text-md border-0 rounded-none border-b-2 border-gray-300 ${errorMessage ? "border-rose-700" : ""
                    } focus:outline-none focus:border-blue-500 mb-4`}
                />
                <div className="text-rose-800 mb-4">{errorMessage}</div>

                <p className="text-sm text-gray-500 mb-6">
                  By continuing, you agree to PrintHutt's{" "}
                  <a href="#" className="text-blue-600">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600">
                    Privacy Policy
                  </a>
                  .
                </p>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="w-full bg-rose-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-orange-600"
                >
                  Request OTP
                </button>
              </form>
              <p className="mt-6">
                New to Print Hutt?{" "}
                <a href="#" className="text-blue-600 font-medium">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="flex w-6/12 h-[500px] shadow-lg rounded-lg overflow-hidden border">
            {/* Left Panel */}
            <div className="bg-blue-500 text-white w-1/2 flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold mb-4">Login</h1>
              <p className="text-center text-sm mb-6 px-4">
                Get access to your Orders, Wishlist and Recommendations
              </p>
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                {/* Illustration Placeholder */}
                <img
                  src="https://t4.ftcdn.net/jpg/03/39/70/91/360_F_339709166_kKKqiQFynWG7bEkl3LisH3saRrEB0HGa.jpg" // Replace with your illustration
                  alt="Illustration"
                  className="w-full h-full object-contain z-0"
                />
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-1/2 bg-white flex flex-col justify-center items-center p-6">
              <p className="text-center text-gray-800 text-sm mb-6">
                Please enter the OTP sent to <br />
                <span className="font-semibold">mks957678@gmail.com.</span>{" "}
                <a href="#" className="text-blue-600 font-medium">
                  Change
                </a>
              </p>

              {/* OTP Input Fields */}
              <div className="flex justify-center mb-6 space-x-3">
                {Array(6)
                  .fill("")
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      className="w-10 h-12 text-center text-2xl border-0 rounded-none border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ))}
              </div>

              {/* Verify Button */}
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600"
              >
                Verify
              </button>

              {/* Resend Timer */}
              <p className="text-sm text-gray-500 mt-6">
                Not received your code?{" "}
                <span className="text-black font-semibold">00:13</span>
              </p>
            </div>
          </div>
        </div>
      )
      }



      {/* Login */}
      {/* <section className="section-login py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div
                className="section-title mb-[20px] pb-[20px] relative flex flex-col items-center text-center max-[991px]:pb-[0]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail max-[991px]:mb-[12px]">
                  <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                    Log <span className="text-[#6c7fd8]">In</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    Best place to buy and sell digital products
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-[12px]">
              <div
                className="bb-login-contact max-w-[500px] m-[auto] border-[1px] border-solid border-[#eee] p-[30px] rounded-[20px]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={400}
              >
                <form>
                  <div className="bb-login-wrap mb-[24px]">
                    <label
                      htmlFor="email"
                      className="inline-block font-Poppins text-[15px] font-normal text-[#686e7d] leading-[26px] tracking-[0.02rem]"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Your Email"
                      className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] leading-[26px] rounded-[10px]"
                    />
                  </div>
                  <div className="bb-login-wrap mb-[24px]">
                    <label
                      htmlFor="email"
                      className="inline-block font-Poppins text-[15px] font-normal text-[#686e7d] leading-[26px] tracking-[0.02rem]"
                    >
                      Password*
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Your Password"
                      className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] leading-[26px] rounded-[10px]"
                    />
                  </div>
                  <div className="bb-login-wrap mb-[24px]">
                    <a
                      href="javascript:void(0)"
                      className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#777]"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="bb-login-button m-[-5px] flex justify-between">
                    <button
                      className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] m-[5px] py-[4px] px-[20px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                      type="submit"
                    >
                      Login
                    </button>
                    <a
                      href="register.html"
                      className="h-[36px] m-[5px] flex items-center font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]"
                    >
                      Register
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section> */}

    </>
  );
};

export default Login;
