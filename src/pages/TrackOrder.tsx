import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

const TrackOrder = () => {
  return (
    <>
      <Breadcrumb title={"Track order"} />
      <section className="section-track py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div
                className="section-title mb-[20px] pb-[20px] z-[5] relative flex flex-col items-center text-center max-[991px]:pb-[0]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail max-[991px]:mb-[12px]">
                  <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                    Track<span className="text-[#6c7fd8]"> order</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    check your arriving order.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-[12px]">
              <div className="track p-[30px] border-[1px] border-solid border-[#eee] rounded-[30px] max-[480px]:p-[15px]">
                <div className="flex flex-wrap mx-[-12px] mb-[-24px]">
                  <div className="min-[768px]:w-[33.33%] w-full px-[12px] mb-[24px]">
                    <div className="block-title p-[30px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] flex flex-col items-center justify-center rounded-[20px]">
                      <h6 className="mb-[5px] font-quicksand tracking-[0.03rem] text-[16px] font-bold leading-[1.2] text-[#3d4750]">
                        Order
                      </h6>
                      <p className="font-Poppins text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#686e7d]">
                        #2453
                      </p>
                    </div>
                  </div>
                  <div className="min-[768px]:w-[33.33%] w-full px-[12px] mb-[24px]">
                    <div className="block-title p-[30px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] flex flex-col items-center justify-center rounded-[20px]">
                      <h6 className="mb-[5px] font-quicksand tracking-[0.03rem] text-[16px] font-bold leading-[1.2] text-[#3d4750]">
                        Jalapeno Poppers
                      </h6>
                      <p className="font-Poppins text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#686e7d]">
                        bb6874tf
                      </p>
                    </div>
                  </div>
                  <div className="min-[768px]:w-[33.33%] w-full px-[12px] mb-[24px]">
                    <div className="block-title p-[30px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] flex flex-col items-center justify-center rounded-[20px]">
                      <h6 className="mb-[5px] font-quicksand tracking-[0.03rem] text-[16px] font-bold leading-[1.2] text-[#3d4750]">
                        Expected date
                      </h6>
                      <p className="font-Poppins text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#686e7d]">
                        May 15, 2025
                      </p>
                    </div>
                  </div>
                  <div className="w-full px-[12px] mb-[24px]">
                    <ul className="bb-progress m-[-12px] flex flex-wrap justify-center">
                      <li className="w-[calc(20%-24px)] m-[12px] p-[30px] flex flex-col items-center justify-center border-[1px] border-solid border-[#eee] rounded-[30px] relative max-[991px]:w-[calc(50%-24px)] max-[480px]:w-full active">
                        <span className="number w-[30px] h-[30px] bg-[#686e7d66] text-[#fff] absolute top-[10px] right-[10px] flex items-center justify-center rounded-[30px] font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem]">
                          1
                        </span>
                        <span className="icon mb-[5px]">
                          <i className="ri-check-double-line text-[25px] text-[#a5a8b1]" />
                        </span>
                        <span className="title text-center font-Poppins text-[15px] leading-[22px] tracking-[0.03rem] font-normal text-[#a5a8b1]">
                          Order
                          <br />
                          Confirmed
                        </span>
                      </li>
                      <li className="w-[calc(20%-24px)] m-[12px] p-[30px] flex flex-col items-center justify-center border-[1px] border-solid border-[#eee] rounded-[30px] relative max-[991px]:w-[calc(50%-24px)] max-[480px]:w-full active">
                        <span className="number w-[30px] h-[30px] bg-[#686e7d66] text-[#fff] absolute top-[10px] right-[10px] flex items-center justify-center rounded-[30px] font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem]">
                          2
                        </span>
                        <span className="icon mb-[5px]">
                          <i className="ri-settings-line text-[25px] text-[#a5a8b1]" />
                        </span>
                        <span className="title text-center font-Poppins text-[15px] leading-[22px] tracking-[0.03rem] font-normal text-[#a5a8b1]">
                          Processing
                          <br />
                          Order
                        </span>
                      </li>
                      <li className="w-[calc(20%-24px)] m-[12px] p-[30px] flex flex-col items-center justify-center border-[1px] border-solid border-[#eee] rounded-[30px] relative max-[991px]:w-[calc(50%-24px)] max-[480px]:w-full active">
                        <span className="number w-[30px] h-[30px] bg-[#686e7d66] text-[#fff] absolute top-[10px] right-[10px] flex items-center justify-center rounded-[30px] font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem]">
                          3
                        </span>
                        <span className="icon mb-[5px]">
                          <i className="ri-gift-2-line text-[25px] text-[#a5a8b1]" />
                        </span>
                        <span className="title text-center font-Poppins text-[15px] leading-[22px] tracking-[0.03rem] font-normal text-[#a5a8b1]">
                          Quality
                          <br />
                          Check
                        </span>
                      </li>
                      <li className="w-[calc(20%-24px)] m-[12px] p-[30px] flex flex-col items-center justify-center border-[1px] border-solid border-[#eee] rounded-[30px] relative max-[991px]:w-[calc(50%-24px)] max-[480px]:w-full">
                        <span className="number w-[30px] h-[30px] bg-[#686e7d66] text-[#fff] absolute top-[10px] right-[10px] flex items-center justify-center rounded-[30px] font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem]">
                          4
                        </span>
                        <span className="icon mb-[5px]">
                          <i className="ri-truck-line text-[25px] text-[#a5a8b1]" />
                        </span>
                        <span className="title text-center font-Poppins text-[15px] leading-[22px] tracking-[0.03rem] font-normal text-[#a5a8b1]">
                          Product
                          <br />
                          Dispatched
                        </span>
                      </li>
                      <li className="w-[calc(20%-24px)] m-[12px] p-[30px] flex flex-col items-center justify-center border-[1px] border-solid border-[#eee] rounded-[30px] relative max-[991px]:w-[calc(50%-24px)] max-[480px]:w-full">
                        <span className="number w-[30px] h-[30px] bg-[#686e7d66] text-[#fff] absolute top-[10px] right-[10px] flex items-center justify-center rounded-[30px] font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem]">
                          5
                        </span>
                        <span className="icon mb-[5px]">
                          <i className="ri-home-office-line text-[25px] text-[#a5a8b1]" />
                        </span>
                        <span className="title text-center font-Poppins text-[15px] leading-[22px] tracking-[0.03rem] font-normal text-[#a5a8b1]">
                          Product
                          <br />
                          Delivered
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrackOrder;
