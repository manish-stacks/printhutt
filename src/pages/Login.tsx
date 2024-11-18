import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

const Login = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Login"} />
      {/* Login */}
      <section className="section-login py-[50px] max-[1199px]:py-[35px]">
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
      </section>

      <section className="section-login py-[50px] max-[1199px]:py-[35px]">
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
                    Email <span className="text-[#6c7fd8]">Verification</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="w-full px-[12px]">
              <div
                className="bb-login-contact max-w-[500px] m-[auto] border-[1px] border-solid border-[#eee] p-[30px] rounded-[20px]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={600}
              >
                
                <p className="text-center text-lg mb-4 font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                  Enter the one-time password (OTP) sent to <strong>mks9576@gmail.com</strong> to verify your account.
                </p>
                <form>
                  <div className="flex flex-wrap gap-3 justify-center py-6">
                    <input
                      className="text-center mx-1 text-md w-12 h-12"
                      type="text"
                      maxLength={1}
                    />
                    <input
                      className="text-center mx-1 text-md w-12 h-12"
                      type="text"
                      maxLength={1}
                    />
                    <input
                      className="text-center mx-1 text-md w-12 h-12"
                      type="text"
                      maxLength={1}
                    />
                    <input
                      className="text-center mx-1 text-md w-12 h-12"
                      type="text"
                      maxLength={1}
                    />
                    <input
                      className="text-center mx-1 text-md w-12 h-12"
                      type="text"
                      maxLength={1}
                    />
                  </div>

                  <div className="bb-login-button m-[-5px] flex justify-between">
                    <button
                      className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] m-[5px] py-[4px] px-[20px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                      type="submit"
                    >
                      Sumit
                    </button>
                    <a
                      href="register.html"
                      className="h-[36px] m-[5px] flex items-center font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]"
                    >
                      Resend OTP
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>



    

    </>
  );
};

export default Login;
