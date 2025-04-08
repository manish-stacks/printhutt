import Image from "next/image";
import React from "react";

const services = [
  {
    imgSrc: "/img/services/1.png",
    imgAlt: "services-1",
    title: "Free Shipping",
    description: "Free shipping on all Us order or above 500",
    delay: 200,
  },
  {
    imgSrc: "/img/services/2.png",
    imgAlt: "services-2",
    title: "24x7 Support",
    description: "Contact us 24 hours a day, 7 days a week",
    delay: 400,
  },
  {
    imgSrc: "/img/services/3.png",
    imgAlt: "services-3",
    title: "Easy Customize",
    description: "Customization of your product.",
    delay: 600,
  },
  {
    imgSrc: "/img/services/4.png",
    imgAlt: "services-4",
    title: "Payment Secure",
    description: "Contact us 24 hours a day, 7 days a week",
    delay: 800,
  },
];

const OurServices = () => {
  return (
    <>
      <section className="section-services overflow-hidden py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            {services.map((service, index) => (
              <div
                key={index}
                className="min-[992px]:w-[25%] min-[768px]:w-[50%] max-[480px]:w-[50%] w-full px-[12px] mb-[24px]"
                data-aos="flip-up"
                data-aos-duration={1000}
                data-aos-delay={service.delay}
              >
                <div className="bb-services-box p-[30px] max-[576px]:p-[10px] border-[1px] border-solid border-[#eee] rounded-[20px] text-center">
                  <div className="services-img mb-[20px] flex justify-center">
                    <img                      src={service.imgSrc}
                      alt={service.imgAlt}
                      className="w-[50px]"
                    />
                  </div>
                  <div className="services-contact">
                    <h4 className="font-quicksand mb-[8px] text-[18px] font-bold text-[#3d4750] leading-[1.2] tracking-[0.03rem]">
                      {service.title}
                    </h4>
                    <p className="font-Poppins font-light text-[14px] leading-[20px] text-[#686e7d] tracking-[0.03rem]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurServices;
