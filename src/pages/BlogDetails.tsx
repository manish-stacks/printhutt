import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

const BlogDetails = () => {
  return (
    <>
      <Breadcrumb title={"Blog-Details"} />

      <section className="section-blog-details py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap mb-[-24px]">
            <div className="min-[1200px]:w-[33.33%] min-[992px]:w-[41.66%] w-full px-[12px] mb-[24px]">
              <div className="bb-blog-sidebar mb-[-24px]">
                <div
                  className="blog-inner-contact p-[30px] border-[1px] border-solid border-[#eee] mb-[24px] rounded-[20px] max-[575px]:p-[15px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={200}
                >
                  <div className="blog-sidebar-title mb-[20px]">
                    <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750] max-[575px]:text-[18px]">
                      Recent Articles
                    </h4>
                  </div>
                  <div className="blog-sidebar-card mb-[24px] p-[15px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] flex max-[991px]:flex-row max-[360px]:flex-col">
                    <div className="inner-image mr-[15px] max-[991px]:mr-[20px] max-[991px]:mb-[0] max-[360px]:mr-[0] max-[360px]:mb-[15px]">
                      <img
                        src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/7.jpg"
                        alt="blog"
                        className="max-w-[80px] rounded-[20px] max-[360px]:max-w-full"
                      />
                    </div>
                    <div className="blog-sidebar-contact">
                      <span className="font-Poppins text-[13px] font-normal leading-[26px] tracking-[0.02rem] text-[#6c7fd8]">
                        Marketing
                      </span>
                      <h4 className="text-[15px] mb-[8px] leading-[1.2]">
                        <a
                          href="blog-detail-left-sidebar"
                          className="font-Poppins tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]"
                        >
                          Marketing Guide: 5 Steps to Success.
                        </a>
                      </h4>
                      <p className="font-Poppins tracking-[0.03rem] text-[13px] leading-[16px] font-light text-[#686e7d]">
                        February 10, 2025
                      </p>
                    </div>
                  </div>
                  <div className="blog-sidebar-card mb-[24px] p-[15px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] flex max-[991px]:flex-row max-[360px]:flex-col">
                    <div className="inner-image mr-[15px] max-[991px]:mr-[20px] max-[991px]:mb-[0] max-[360px]:mr-[0] max-[360px]:mb-[15px]">
                      <img
                        src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/8.jpg"
                        alt="blog"
                        className="max-w-[80px] rounded-[20px] max-[360px]:max-w-full"
                      />
                    </div>
                    <div className="blog-sidebar-contact">
                      <span className="font-Poppins text-[13px] font-normal leading-[26px] tracking-[0.02rem] text-[#6c7fd8]">
                        Business
                      </span>
                      <h4 className="text-[15px] mb-[8px] leading-[1.2]">
                        <a
                          href="blog-detail-left-sidebar"
                          className="font-Poppins tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]"
                        >
                          Business ideas to grow your business.
                        </a>
                      </h4>
                      <p className="font-Poppins tracking-[0.03rem] text-[13px] leading-[16px] font-light text-[#686e7d]">
                        Jan 1, 2024
                      </p>
                    </div>
                  </div>
                  <div className="blog-sidebar-card mb-[24px] p-[15px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] flex max-[991px]:flex-row max-[360px]:flex-col">
                    <div className="inner-image mr-[15px] max-[991px]:mr-[20px] max-[991px]:mb-[0] max-[360px]:mr-[0] max-[360px]:mb-[15px]">
                      <img
                        src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/9.jpg"
                        alt="blog"
                        className="max-w-[80px] rounded-[20px] max-[360px]:max-w-full"
                      />
                    </div>
                    <div className="blog-sidebar-contact">
                      <span className="font-Poppins text-[13px] font-normal leading-[26px] tracking-[0.02rem] text-[#6c7fd8]">
                        Business
                      </span>
                      <h4 className="text-[15px] mb-[8px] leading-[1.2]">
                        <a
                          href="blog-detail-left-sidebar"
                          className="font-Poppins tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]"
                        >
                          Best way to solve business deal issue.
                        </a>
                      </h4>
                      <p className="font-Poppins tracking-[0.03rem] text-[13px] leading-[16px] font-light text-[#686e7d]">
                        Jun 02, 2024
                      </p>
                    </div>
                  </div>
                  <div className="blog-sidebar-card p-[15px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] flex max-[991px]:flex-row max-[360px]:flex-col">
                    <div className="inner-image mr-[15px] max-[991px]:mr-[20px] max-[991px]:mb-[0] max-[360px]:mr-[0] max-[360px]:mb-[15px]">
                      <img
                        src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/10.jpg"
                        alt="blog"
                        className="max-w-[80px] rounded-[20px] max-[360px]:max-w-full"
                      />
                    </div>
                    <div className="blog-sidebar-contact">
                      <span className="font-Poppins text-[13px] font-normal leading-[26px] tracking-[0.02rem] text-[#6c7fd8]">
                        Customer
                      </span>
                      <h4 className="text-[15px] mb-[8px] leading-[1.2]">
                        <a
                          href="blog-detail-left-sidebar"
                          className="font-Poppins tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]"
                        >
                          31 customer stats know in 2025.
                        </a>
                      </h4>
                      <p className="font-Poppins tracking-[0.03rem] text-[13px] leading-[16px] font-light text-[#686e7d]">
                        May 20, 2024
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="blog-inner-contact p-[30px] border-[1px] border-solid border-[#eee] mb-[24px] rounded-[20px] max-[575px]:p-[15px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={400}
                >
                  <div className="blog-sidebar-title mb-[20px]">
                    <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750] max-[575px]:text-[18px]">
                      Categories
                    </h4>
                  </div>
                  <div className="blog-categories">
                    <ul className="mb-[-14px]">
                      <li className="relative mb-[14px] leading-[28px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                          />
                          <a
                            
                            className="ml-[30px] block text-[#777] text-[14px] mt-[0] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Business
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden transition-all duration-[300ms] linear" />
                        </div>
                      </li>
                      <li className="relative mb-[14px] leading-[28px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                          />
                          <a
                            
                            className="ml-[30px] block text-[#777] text-[14px] mt-[0] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Marketing
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden transition-all duration-[300ms] linear" />
                        </div>
                      </li>
                      <li className="relative mb-[14px] leading-[28px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                          />
                          <a
                            
                            className="ml-[30px] block text-[#777] text-[14px] mt-[0] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Food blogs
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden transition-all duration-[300ms] linear" />
                        </div>
                      </li>
                      <li className="relative mb-[14px] leading-[28px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                          />
                          <a
                            
                            className="ml-[30px] block text-[#777] text-[14px] mt-[0] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Lifestyle
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden transition-all duration-[300ms] linear" />
                        </div>
                      </li>
                      <li className="relative mb-[14px] leading-[28px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                          />
                          <a
                            
                            className="ml-[30px] block text-[#777] text-[14px] mt-[0] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Fashion
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden transition-all duration-[300ms] linear" />
                        </div>
                      </li>
                      <li className="relative mb-[14px] leading-[28px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                          />
                          <a
                            
                            className="ml-[30px] block text-[#777] text-[14px] mt-[0] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Travel
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden transition-all duration-[300ms] linear" />
                        </div>
                      </li>
                      <li className="relative mb-[14px] leading-[28px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                          />
                          <a
                            
                            className="ml-[30px] block text-[#777] text-[14px] mt-[0] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Fitness
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden transition-all duration-[300ms] linear" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-[1200px]:w-[66.66%] min-[992px]:w-[58.33%] w-full px-[12px] mb-[24px]">
              <div
                className="bb-blog-details-contact"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={400}
              >
                <div className="inner-blog-details-image mb-[24px]">
                  <img
                    src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog-details/one.jpg"
                    alt="details-one"
                    className="w-full rounded-[15px]"
                  />
                </div>
                <div className="inner-blog-details-contact mb-[30px]">
                  <span className="font-Poppins mb-[6px] text-[15px] leading-[26px] font-light tracking-[0.02rem] text-[#777]">
                    May 30,2022
                  </span>
                  <h4 className="sub-title font-quicksand tracking-[0.03rem] leading-[1.2] mb-[12px] text-[22px] font-bold text-[#3d4750] max-[575px]:text-[20px]">
                    Marketing Guide: 5 Steps to Success.
                  </h4>
                  <p className="mb-[16px] font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perspiciatis inventore fuga at iure voluptate, laudantium
                    commodi officiis provident facere quis quae, laboriosam
                    ducimus nihil molestiae vel beatae numquam assumenda dicta
                    modi. Mollitia soluta ipsa cum pariatur! Obcaecati similique
                    amet fuga minima vitae corporis odio eius tenetur
                    repudiandae quaerat maiores quo officia, sunt, ab omnis id
                    soluta explicabo quas? Quasi nam, inventore voluptas tempore
                    ex modi consequuntur reiciendis enim, molestias labore
                    neque! A nostrum necessitatibus dolorem sequi earum
                    inventore labore error.
                  </p>
                  <p className="mb-[16px] font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam harum inventore, ipsa velit, laudantium
                    perspiciatis exercitationem veritatis, molestiae magnam
                    voluptatibus suscipit accusamus fuga veniam laborum cumque
                    vitae cum? Cumque, aliquid.
                  </p>
                  <div className="flex flex-wrap mx-[-12px]">
                    <div className="min-[992px]:w-[50%] w-full px-[12px]">
                      <div className="blog-inner-image mb-[24px]">
                        <img
                          src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/1.jpg"
                          alt="blog-1"
                          className="w-full rounded-[15px]"
                        />
                      </div>
                    </div>
                    <div className="min-[992px]:w-[50%] w-full px-[12px]">
                      <div className="blog-inner-image mb-[24px]">
                        <img
                          src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/2.jpg"
                          alt="blog-2"
                          className="w-full rounded-[15px]"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mb-[16px] font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perspiciatis inventore fuga at ducimus nihil molestiae vel
                    beatae numquam assumenda dicta modi. Mollitia soluta ipsa
                    repudiandae quaerat maiores quo officia, sunt, ab omnis id
                    soluta explicabo quas? Quasi nam, inventore voluptas tempore
                    ex modi consequuntur reiciendis enim, molestias labore
                    neque! A nostrum necessitatibus dolorem sequi earum
                    inventore labore error.
                  </p>
                  <p className="mb-[16px] font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam harum inventore, ipsa suscipit accusamus fuga
                    veniam laborum cumque vitae cum? Cumque, aliquid.
                  </p>
                </div>
                <div className="w-full">
                  <div className="bb-pro-pagination mb-[24px] flex justify-between max-[575px]:flex-col max-[575px]:items-center">
                    <p className="font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem] max-[575px]:mb-[10px]">
                      Showing 1-12 of 21 item(s)
                    </p>
                    <ul className="flex">
                      <li className="leading-[28px] mr-[6px] active">
                        <a
                          
                          className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                        >
                          1
                        </a>
                      </li>
                      <li className="leading-[28px] mr-[6px]">
                        <a
                          
                          className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                        >
                          2
                        </a>
                      </li>
                      <li className="leading-[28px] mr-[6px]">
                        <a
                          
                          className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                        >
                          3
                        </a>
                      </li>
                      <li className="leading-[28px] mr-[6px]">
                        <a
                          
                          className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                        >
                          4
                        </a>
                      </li>
                      <li className="leading-[28px]">
                        <a
                          
                          className="next transition-all duration-[0.3s] ease-in-out w-[auto] h-[32px] px-[13px] font-light text-[#fff] leading-[30px] bg-[#3d4750] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee]"
                        >
                          Next{" "}
                          <i className="ri-arrow-right-s-line transition-all duration-[0.3s] ease-in-out ml-[10px] text-[16px] w-[8px] text-[#fff]" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bb-blog-details-comment mb-[30px]">
                  <div className="main-title mb-[12px]">
                    <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                      Comments
                    </h4>
                  </div>
                  <div className="bb-comment-box flex mb-[24px] max-[575px]:flex-col">
                    <div className="inner-image mr-[15px] max-[575px]:mr-[0] max-[575px]:mb-[15px]">
                      <img
                        src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/reviews/1.jpg"
                        alt="reviews-1"
                        className="max-w-[50px] rounded-[15px]"
                      />
                    </div>
                    <div className="inner-contact flex flex-col justify-center">
                      <h5 className="sub-title font-quicksand tracking-[0.03rem] leading-[1.2] mb-[4px] text-[16px] font-bold text-[#3d4750]">
                        Mariya Lykra
                      </h5>
                      <span className="font-Poppins leading-[26px] tracking-[0.02rem] mb-[4px] text-[14px] font-light text-[#777]">
                        May 14,2020
                      </span>
                      <p className="font-Poppins mb-[6px] text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Nemo, et? Quam eius facere optio explicabo
                        consequatur aut ad. Magnam, aspernatur!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bb-blog-details-comment">
                  <div className="main-title mb-[12px]">
                    <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                      Leave A Reply
                    </h4>
                  </div>
                  <form method="post">
                    <div className="flex flex-wrap mx-[-12px]">
                      <div className="min-[992px]:w-[50%] w-full px-[12px]">
                        <div className="bb-details-input mb-[24px]">
                          <input
                            type="text"
                            placeholder="Enter Your Name"
                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] leading-[26px] rounded-[10px]"
                          />
                        </div>
                      </div>
                      <div className="min-[992px]:w-[50%] w-full px-[12px]">
                        <div className="bb-details-input mb-[24px]">
                          <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] leading-[26px] rounded-[10px]"
                          />
                        </div>
                      </div>
                      <div className="w-full px-[12px]">
                        <div className="bb-details-input mb-[24px]">
                          <textarea
                            placeholder="Message"
                            className="w-full h-[200px] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="w-full px-[12px]">
                        <div className="bb-details-buttons flex">
                          <a
                            
                            className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[18px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                          >
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
