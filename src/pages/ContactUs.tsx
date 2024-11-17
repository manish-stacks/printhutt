import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

const ContactUs = () => {
  return (
    <>
      {/* Breadcrumb */}

      <Breadcrumb title={"Contact Us"} />

      {/* Contact us */}
      <section className="section-contact py-[50px] max-[1199px]:py-[35px]">
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
                    Get In <span className="text-[#6c7fd8]">Touch</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    Please select a topic below related to you inquiry. If you
                    don't fint what you need, fill out our contact form.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="min-[992px]:w-[50%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={400}
            >
              <div className="bb-contact-form border-[1px] border-solid border-[#eee] rounded-[20px] p-[30px]">
                <form method="post">
                  <div className="bb-contact-wrap mb-[24px]">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Enter Your First Name"
                      className="w-full h-[50px] py-[10px] pl-[15px] pr-[10px] border-[1px] border-solid border-[#eee] outline-[0] text-[14px] font-normal text-[#686e7d] rounded-[10px]"
                    />
                  </div>
                  <div className="bb-contact-wrap mb-[24px]">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Enter Your Last Name"
                      className="w-full h-[50px] py-[10px] pl-[15px] pr-[10px] border-[1px] border-solid border-[#eee] outline-[0] text-[14px] font-normal text-[#686e7d] rounded-[10px]"
                    />
                  </div>
                  <div className="bb-contact-wrap mb-[24px]">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      className="w-full h-[50px] py-[10px] pl-[15px] pr-[10px] border-[1px] border-solid border-[#eee] outline-[0] text-[14px] font-normal text-[#686e7d] rounded-[10px]"
                    />
                  </div>
                  <div className="bb-contact-wrap mb-[24px]">
                    <input
                      type="text"
                      name="phonenumber"
                      placeholder="Enter Your Phone Number"
                      className="w-full h-[50px] py-[10px] pl-[15px] pr-[10px] border-[1px] border-solid border-[#eee] outline-[0] text-[14px] font-normal text-[#686e7d] rounded-[10px]"
                    />
                  </div>
                  <div className="bb-contact-wrap mb-[24px]">
                    <textarea
                      name="address"
                      placeholder="Please leave your comments here.."
                      className="w-full h-[150px] py-[10px] pl-[15px] pr-[10px] border-[1px] border-solid border-[#eee] outline-[0] text-[14px] font-normal text-[#686e7d] rounded-[10px]"
                      defaultValue={""}
                    />
                  </div>
                  <div className="bb-contact-button">
                    <button
                      className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="min-[992px]:w-[50%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={600}
            >
              <div className="bb-contact-maps sticky top-[0]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d929.6923186886103!2d72.9043573711624!3d21.240995949535076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1718947386404!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[577px] mb-[-10px] rounded-[20px] border-[0]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
