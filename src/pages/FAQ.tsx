"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import React, { useState } from "react";

const faqData = [
  { question: "What are the benefits of neon lights?", answer: "Neon lights provide vibrant illumination, energy efficiency, and a unique aesthetic for homes, businesses, and events. They are long-lasting and customizable to fit any design preference." },
  { question: "How can I order a custom neon sign?", answer: "You can order a custom neon sign by contacting us at Neon Attack. Share your design, size, and color preferences, and we will craft a neon sign tailored to your needs." },
  { question: "What is the lifespan of a neon sign?", answer: "Our neon signs are designed to last up to 50,000 hours with proper care. They are energy-efficient and built to withstand long-term use." },
  { question: "Exchange policy for customer", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem." },
  { question: "Give away products available", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem." }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); 
  };
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"FAQ"} />
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
                    We are India’s No.1 <span className="text-[#6c7fd8]">neon light makers</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    We make customized neon lights and signs for your home, business, or events. If you’re looking for a high-quality, custom neon sign maker, contact us at Print Hutt.
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
                <Image
                  height={500}
                  width={500}
                  src="https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/product/gdszkumgmliqurujumck_ijmmki.png"
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

                {faqData.map((item, index) => (
                  <div key={index} className="bb-accordion-item overflow-hidden mb-[24px]">
                    <h4 
                    onClick={() => toggleAccordion(index)} 
                    className={`accordion-head ${openIndex === index ? "active-arrow" : ""}  m-[0] py-[1rem] px-[1.25rem] text-[#4b5966] text-[16px] leading-[20px] font-medium relative rounded-[15px] border-[1px] border-solid border-[#eee] font-Poppins cursor-pointer tracking-[0] max-[767px]:text-[15px]`}>
                    {item.question}
                    </h4>
                    <div className={`accordion-body px-[15px] pt-[15px] ${openIndex === index ? "" : "hidden"}`}>
                      <p className="text-[14px] font-Poppins text-[#7a7a7a] leading-[1.75]">
                      {item.answer} 
                      </p>
                    </div>
                  </div>
                  ))}

                 
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
