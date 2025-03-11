import React, { Suspense, useEffect, useState } from 'react'
import ProductSlider from '../ProductSlider'
import { productService } from '@/_services/common/productService';

const DayoftheWeek = () => {

    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true)
            const products = await productService.getTopProducts(6)
            setProductData(products?.products);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            {/* min-[1400px]:max-w-[1320px] */}
            <section className="section-deal overflow-hidden py-[50px] max-[1199px]:py-[35px]">
                <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                    <div className="flex flex-wrap w-full">
                        <div className="w-full px-[12px] mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                            <div
                                className="section-title bb-deal mb-[20px] pb-[20px] z-[1] relative flex justify-between max-[991px]:pb-[0] max-[991px]:flex-col max-[991px]:justify-center max-[991px]:text-center"
                                data-aos="fade-up"
                                data-aos-duration={1000}
                                data-aos-delay={200}
                            >
                                <div className="section-detail max-[991px]:mb-[12px]">
                                    <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                                        Day of the <span className="text-[#6c7fd8]">deal</span>
                                    </h2>
                                    <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                                        Don&apos;t wait. The time will never be just right.
                                    </p>
                                </div>
                                <div id="dealend" className="dealend-timer" />
                            </div>
                        </div>
                        <div className="w-full mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] px-[12px]">
                            <div className="bb-deal-slider m-[-12px]">
                                <div className="bb-deal-block owl-carousel"></div>

                                {loading ? (
                                    <div className="flex flex-wrap w-full">
                                        {Array.from({ length: 4 }, (_, index) => (
                                            <div
                                                key={index}
                                                className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                                                data-aos="fade-up"
                                                data-aos-duration={1000}
                                                data-aos-delay={200}
                                            >
                                                <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                                                    {/* Skeleton for Image */}
                                                    <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                                                        <div className="skeleton w-full h-[300px] bg-gray-200 rounded-t-[20px]" />
                                                    </div>

                                                    {/* Skeleton for Product Content */}
                                                    <div className="bb-pro-contact p-[20px]">
                                                        {/* Skeleton for Subtitle */}
                                                        <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                                                            <div className="skeleton w-[50%] h-[16px] bg-gray-200" />
                                                            <div className="skeleton w-[30%] h-[16px] bg-gray-200" />
                                                        </div>

                                                        {/* Skeleton for Title */}
                                                        <div className="bb-pro-title mb-[8px]">
                                                            <div className="skeleton w-[80%] h-[18px] bg-gray-200" />
                                                        </div>

                                                        {/* Skeleton for Price */}
                                                        <div className="bb-price flex flex-wrap justify-between">
                                                            <div className="skeleton w-[40%] h-[18px] bg-gray-200" />
                                                            <div className="skeleton w-[20%] h-[18px] bg-gray-200" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <ProductSlider products={productData} />
                                    </Suspense>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DayoftheWeek