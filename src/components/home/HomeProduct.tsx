import Image from 'next/image'
import React from 'react'

const HomeProduct = () => {
    return (
        <>
            <section className="section-vendors overflow-hidden pt-[50px] max-[1199px]:pt-[35px] pb-[100px] max-[1199px]:pb-[70px]">
                <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                    <div className="flex flex-wrap w-full mb-[-24px]">
                        <div className="w-full px-[12px]">
                            <div
                                className="section-title mb-[20px] pb-[20px] z-[5] relative flex flex-col items-center text-center max-[991px]:pb-[0]"
                                data-aos="fade-up"
                                data-aos-duration={1000}
                                data-aos-delay={200}
                            >
                                <div className="section-detail max-[991px]:mb-[12px]">
                                    <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                                        Top{" "}
                                        <span className="text-[#6c7fd8]">Pre Design Product</span>
                                    </h2>
                                    <p className="font-Poppins max-w-[600px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                                        Explore the trendiest products at PrintHutt and bring them
                                        home to decorate your space!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="min-[992px]:w-[41.66%] w-full px-[12px] mb-[24px]"
                            data-aos="fade-up"
                            data-aos-duration={1000}
                            data-aos-delay={200}
                        >
                            <div className="bb-vendors-img sticky top-[0]">
                                <div className="tab-content">
                                    <div className="tab-vendors-pane" id="vendors_tab_one">
                                        <a

                                            className="bb-vendor-init transition-all duration-[0.3s] ease-in-out absolute right-[20px] top-[20px] h-[35px] w-[35px] bg-[#00000080] hover:bg-[#000000cc] flex justify-center items-center rounded-[10px]"
                                        >
                                            <i className="ri-arrow-right-up-line text-[20px] text-[#fff]" />
                                        </a>
                                        <img                                            src="https://printhutt.com/media/imgpsh_fullsize_anim.jfif"
                                            alt="vendors-img-1"
                                            className="w-full rounded-[30px] border-[1px] border-solid border-[#eee]"
                                        />
                                        <div className="vendors-local-shape absolute bottom-[0] right-[0] h-[120px] w-[120px] bg-[#fff] pt-[20px] pl-[20px] rounded-tl-[30px]">
                                            <div className="inner-shape relative" />
                                            <Image 
                                                fill
                                                src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/vendors/vendor-1.jpg"
                                                alt="vendor"
                                                className="w-[100px] h-[100px] rounded-[30px] border-[1px] border-solid border-[#eee]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="min-[992px]:w-[58.33%] w-full px-[12px] mb-[24px]">
                            <ul
                                className="bb-vendors-tab-nav flex flex-wrap mb-[-24px]"
                                id="vendorstab"
                            >
                                <li
                                    className="nav-item w-full mb-[24px]"
                                    data-aos="fade-up"
                                    data-aos-duration={1000}
                                    data-aos-delay={200}
                                >
                                    <a
                                        className="nav-link p-[30px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[30px] block"
                                        href="#vendors_tab_one"
                                    >
                                        <div className="bb-vendors-box">
                                            <div className="inner-heading mb-[5px] flex justify-between max-[420px]:flex-col">
                                                <h5 className="font-quicksand text-[18px] font-bold tracking-[0.03rem] leading-[1.2] text-[#3d4750]">
                                                    Fridge Magnet
                                                </h5>
                                                <span className="font-Poppins text-[14px] text-[#686e7d] leading-[28px] font-normal tracking-[0.03rem]">
                                                    Sales - 587
                                                </span>
                                            </div>
                                            <p className="font-Poppins text-[14px] leading-[20px] text-[#686e7d] font-light tracking-[0.03rem]">
                                                Magnet (5) | Acrylic (30)
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li
                                    className="nav-item w-full mb-[24px]"
                                    data-aos="fade-up"
                                    data-aos-duration={1000}
                                    data-aos-delay={400}
                                >
                                    <a
                                        className="nav-link p-[30px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[30px] block"
                                        href="#vendors_tab_two"
                                    >
                                        <div className="bb-vendors-box">
                                            <div className="inner-heading mb-[5px] flex justify-between max-[420px]:flex-col">
                                                <h5 className="font-quicksand text-[18px] font-bold tracking-[0.03rem] leading-[1.2] text-[#3d4750]">
                                                    Name Plate
                                                </h5>
                                                <span className="font-Poppins text-[14px] text-[#686e7d] leading-[28px] font-normal tracking-[0.03rem]">
                                                    Sales - 428
                                                </span>
                                            </div>
                                            <p className="font-Poppins text-[14px] leading-[20px] text-[#686e7d] font-light tracking-[0.03rem]">
                                                Name Plate (8) | Lamp (15) | Fridge Magnet (04){" "}
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li
                                    className="nav-item w-full mb-[24px]"
                                    data-aos="fade-up"
                                    data-aos-duration={1000}
                                    data-aos-delay={600}
                                >
                                    <a
                                        className="nav-link p-[30px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[30px] block"
                                        href="#vendors_tab_three"
                                    >
                                        <div className="bb-vendors-box">
                                            <div className="inner-heading mb-[5px] flex justify-between max-[420px]:flex-col">
                                                <h5 className="font-quicksand text-[18px] font-bold tracking-[0.03rem] leading-[1.2] text-[#3d4750]">
                                                    Neon
                                                </h5>
                                                <span className="font-Poppins text-[14px] text-[#686e7d] leading-[28px] font-normal tracking-[0.03rem]">
                                                    Sales - 1024
                                                </span>
                                            </div>
                                            <p className="font-Poppins text-[14px] leading-[20px] text-[#686e7d] font-light tracking-[0.03rem]">
                                                Name Plate (16) | Lamp (42) | Fridge Magnet (18){" "}
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li
                                    className="nav-item w-full mb-[24px]"
                                    data-aos="fade-up"
                                    data-aos-duration={1000}
                                    data-aos-delay={800}
                                >
                                    <a
                                        className="nav-link p-[30px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[30px] block"
                                        href="#vendors_tab_four"
                                    >
                                        <div className="bb-vendors-box">
                                            <div className="inner-heading mb-[5px] flex justify-between max-[420px]:flex-col">
                                                <h5 className="font-quicksand text-[18px] font-bold tracking-[0.03rem] leading-[1.2] text-[#3d4750]">
                                                    Key Chain
                                                </h5>
                                                <span className="font-Poppins text-[14px] text-[#686e7d] leading-[28px] font-normal tracking-[0.03rem]">
                                                    Sales - 210
                                                </span>
                                            </div>
                                            <p className="font-Poppins text-[14px] leading-[20px] text-[#686e7d] font-light tracking-[0.03rem]">
                                                Acrylic Keychains (2) | Wooden Keychain (10)
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default HomeProduct