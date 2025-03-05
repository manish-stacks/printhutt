"use client"

import ProductCardThree from '@/components/products/ProductCardThree';
import { productService } from '@/_services/common/productService';
import Breadcrumb from '@/components/Breadcrumb';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
interface PropsInterface {
    subslug: string;
}
const SubCategory = ({ subslug }: PropsInterface) => {
    const [products, setProductData] = useState([]);
    const [loading, setLoadinng] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const products = await productService.getProductsBySubCategory('all', subslug);
                setProductData(products?.products);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadinng(false);
            }
        })();
    }, []);



    return (
        <>
            <Breadcrumb title={subslug?.toLocaleUpperCase()} />
            <section className="section-shop pb-[50px] max-[1199px]:pb-[35px]">
                <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                    <div className="flex flex-wrap w-full px-[12px]">

                        <div className="w-full">
                            <div className="bb-shop-pro-inner">
                                <div className="flex flex-wrap mx-[-12px] mb-[-24px]">
                                    <div className="w-full px-[12px]">
                                        <div className="bb-pro-list-top mb-[24px] rounded-[20px] flex bg-[#f8f8fb] border-[1px] border-solid border-[#eee] justify-between">
                                            <div className="flex flex-wrap w-full">
                                                <div className="w-[50%] px-[12px] max-[420px]:w-full">
                                                    <div className="bb-bl-btn py-[10px] flex max-[420px]:justify-center">
                                                        <button
                                                            type="button"
                                                            className="grid-btn btn-grid-100 h-[38px] w-[38px] flex justify-center items-center border-[0] p-[5px] bg-transparent mr-[5px] active"
                                                            title="grid"
                                                        >
                                                            <i className="ri-apps-line text-[20px]" />
                                                        </button>
                                                        <div className="uppercase py-1 px-3">
                                                            {subslug}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    {
                                        loading ? (
                                            Array.from({ length: 8 }, (_, index) => (
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
                                            ))
                                        ) : (
                                            products.map((product, index) => (
                                                <div
                                                    key={index}
                                                    className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-[50%] px-[12px] mb-[24px] "

                                                >
                                                    <ProductCardThree product={product} />
                                                </div>
                                            ))
                                        )
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SubCategory