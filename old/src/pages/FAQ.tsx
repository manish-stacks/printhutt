import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

const FAQ = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Faq"} />
      {/* Faq */}
      <section className="section-faq py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div className="w-full px-[12px]">
              <div
                className="section-title mb-[20px] pb-[20px] relative flex flex-col items-center text-center max-[991px]:pb-[0]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail max-[991px]:mb-[12px]">
                  <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                    frequently asked{" "}
                    <span className="text-[#6c7fd8]">questions</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    Customer service management.
                  </p>
                </div>
              </div>
            </div>
            <div className="min-[992px]:w-[33.33%] w-full px-[12px] mb-[24px]">
              <div
                className="bb-faq-img sticky top-[0]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={400}
              >
                <img
                  src="https://printhutt.com/media/led-lemp.jpg"
                  alt="faq-img"
                  className="w-full rounded-[20px]"
                />
              </div>
            </div>
            <div className="min-[992px]:w-[66.66%] w-full px-[12px] mb-[24px]">
              <div
                className="bb-faq-contact"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={600}
              >
                <div className="bb-accordion style-1 mb-[-24px]">
                  <div className="bb-accordion-item overflow-hidden mb-[24px]">
                    <h4 className="accordion-head active-arrow m-[0] py-[1rem] px-[1.25rem] text-[#4b5966] text-[16px] leading-[20px] font-medium relative rounded-[15px] border-[1px] border-solid border-[#eee] font-Poppins cursor-pointer tracking-[0] max-[767px]:text-[15px]">
                      What is the multi vendor services?
                    </h4>
                    <div className="accordion-body px-[15px] pt-[15px]">
                      <p className="text-[14px] font-Poppins text-[#7a7a7a] leading-[1.75]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptate sint atque pariatur cupiditate beatae
                        voluptates quidem. Et tenetur autem itaque? Eum
                        exercitationem assumenda enim eos voluptas. Ad incidunt
                        laborum aliquam, expedita, voluptatibus quo id adipisci
                        ea ratione ut, dignissimos natus?
                      </p>
                    </div>
                  </div>
                  <div className="bb-accordion-item overflow-hidden mb-[24px]">
                    <h4 className="accordion-head m-[0] py-[1rem] px-[1.25rem] text-[#4b5966] text-[16px] leading-[20px] font-medium relative rounded-[15px] border-[1px] border-solid border-[#eee] font-Poppins cursor-pointer tracking-[0] max-[767px]:text-[15px]">
                      How to buy many products at a time?
                    </h4>
                    <div className="accordion-body px-[15px] pt-[15px] hidden">
                      <p className="text-[14px] font-Poppins text-[#7a7a7a] leading-[1.75]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptate sint atque pariatur cupiditate beatae
                        voluptates quidem. Et tenetur autem itaque? Eum
                        exercitationem assumenda enim eos voluptas. Ad incidunt
                        laborum aliquam, expedita, voluptatibus quo id adipisci
                        ea ratione ut, dignissimos natus?
                      </p>
                    </div>
                  </div>
                  <div className="bb-accordion-item overflow-hidden mb-[24px]">
                    <h4 className="accordion-head m-[0] py-[1rem] px-[1.25rem] text-[#4b5966] text-[16px] leading-[20px] font-medium relative rounded-[15px] border-[1px] border-solid border-[#eee] font-Poppins cursor-pointer tracking-[0] max-[767px]:text-[15px]">
                      Refund policy for customer
                    </h4>
                    <div className="accordion-body px-[15px] pt-[15px] hidden">
                      <p className="text-[14px] font-Poppins text-[#7a7a7a] leading-[1.75]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptate sint atque pariatur cupiditate beatae
                        voluptates quidem. Et tenetur autem itaque? Eum
                        exercitationem assumenda enim eos voluptas. Ad incidunt
                        laborum aliquam, expedita, voluptatibus quo id adipisci
                        ea ratione ut, dignissimos natus?
                      </p>
                    </div>
                  </div>
                  <div className="bb-accordion-item overflow-hidden mb-[24px]">
                    <h4 className="accordion-head m-[0] py-[1rem] px-[1.25rem] text-[#4b5966] text-[16px] leading-[20px] font-medium relative rounded-[15px] border-[1px] border-solid border-[#eee] font-Poppins cursor-pointer tracking-[0] max-[767px]:text-[15px]">
                      Exchange policy for customer
                    </h4>
                    <div className="accordion-body px-[15px] pt-[15px] hidden">
                      <p className="text-[14px] font-Poppins text-[#7a7a7a] leading-[1.75]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptate sint atque pariatur cupiditate beatae
                        voluptates quidem. Et tenetur autem itaque? Eum
                        exercitationem assumenda enim eos voluptas. Ad incidunt
                        laborum aliquam, expedita, voluptatibus quo id adipisci
                        ea ratione ut, dignissimos natus?
                      </p>
                    </div>
                  </div>
                  <div className="bb-accordion-item overflow-hidden mb-[24px]">
                    <h4 className="accordion-head m-[0] py-[1rem] px-[1.25rem] text-[#4b5966] text-[16px] leading-[20px] font-medium relative rounded-[15px] border-[1px] border-solid border-[#eee] font-Poppins cursor-pointer tracking-[0] max-[767px]:text-[15px]">
                      Give a way products available
                    </h4>
                    <div className="accordion-body px-[15px] pt-[15px] hidden">
                      <p className="text-[14px] font-Poppins text-[#7a7a7a] leading-[1.75]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptate sint atque pariatur cupiditate beatae
                        voluptates quidem. Et tenetur autem itaque? Eum
                        exercitationem assumenda enim eos voluptas. Ad incidunt
                        laborum aliquam, expedita, voluptatibus quo id adipisci
                        ea ratione ut, dignissimos natus?
                      </p>
                    </div>
                  </div>
                  <div className="bb-accordion-item overflow-hidden mb-[24px]">
                    <h4 className="accordion-head m-[0] py-[1rem] px-[1.25rem] text-[#4b5966] text-[16px] leading-[20px] font-medium relative rounded-[15px] border-[1px] border-solid border-[#eee] font-Poppins cursor-pointer tracking-[0] max-[767px]:text-[15px]">
                      Exchange policy for customer
                    </h4>
                    <div className="accordion-body px-[15px] pt-[15px] hidden">
                      <p className="text-[14px] font-Poppins text-[#7a7a7a] leading-[1.75]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptate sint atque pariatur cupiditate beatae
                        voluptates quidem. Et tenetur autem itaque? Eum
                        exercitationem assumenda enim eos voluptas. Ad incidunt
                        laborum aliquam, expedita, voluptatibus quo id adipisci
                        ea ratione ut, dignissimos natus?
                      </p>
                    </div>
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

export default FAQ;
