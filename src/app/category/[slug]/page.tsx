"use client"
import { categoryService } from '@/_services/common/categoryService';
import { productService } from '@/_services/common/productService';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCardThree from '@/components/products/ProductCardThree';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { string } from 'zod';


const Page = () => {

    const params = useParams();
    const slug = params?.slug as string | undefined;



    const [categoriesData, setCategoriesData] = useState([]);
    const [productData, setProductData] = useState([]);

    const [loading, setLoadinng] = useState(true);




    const fetchData = async () => {
        try {
            const [categories, productData] = await Promise.all([
                categoryService.getSubcategoryAll('all', slug),
                productService.getProductsByCategory('all', slug),
            ]);

            setCategoriesData(categories?.categories);
            setProductData(productData?.products);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoadinng(false);
        }
    };





    useEffect(() => {
        fetchData();
    }, []);


    //console.log(categoriesData)

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    

    return (
        <>

            <Breadcrumb title={slug?.toLocaleUpperCase()} />

            {/* Category section */}
            <section className="section-category pt-[50px] max-[1199px]:pt-[35px] mb-[24px]">
                <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                    <div className="flex flex-wrap w-full">
                        <div className="w-full px-[12px]">
                            <div className="bb-category-6-colum owl-carousel">
                                <Slider {...settings} className="category-slider">
                                    {
                                        loading ?
                                            Array.from({ length: 6 }).map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="min-[1200px]:w-[16.66%] min-[768px]:w-[33.33%] min-[576px]:w-[50%] w-full px-[12px] mb-[24px]"
                                                >
                                                    <div className="bb-category-box p-[30px] rounded-[20px] flex flex-col items-center text-center max-[1399px]:p-[20px] bg-[#fef1f1]">
                                                        {/* Skeleton for Category Image */}
                                                        <div className="category-image mb-[12px]">
                                                            <div className="skeleton w-[50px] h-[50px] max-[1399px]:h-[65px] max-[1399px]:w-[65px] max-[1199px]:h-[50px] max-[1199px]:w-[50px] rounded-md bg-gray-200" />
                                                        </div>

                                                        {/* Skeleton for Text */}
                                                        <div className="category-sub-contact w-full">
                                                            <div className="skeleton w-[70%] h-[16px] bg-gray-200 mx-auto mb-[8px]" />
                                                            <div className="skeleton w-[50%] h-[14px] bg-gray-200 mx-auto" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))


                                            : (
                                                categoriesData.map((category, index) => (
                                                    <div className="pr-2 pl-2" key={category._id}>
                                                        <div
                                                            className={`bb-category-box p-[30px] rounded-[20px] flex flex-col items-center text-center max-[1399px]:p-[20px] category-items-${index + 1} ${(index % 2 === 0 ? 'bg-[#f4f1fe]' : 'bg-[#fef1f1]')}`}
                                                            data-aos-duration={1000}
                                                            data-aos-delay={(index + 1) * 200}
                                                        >
                                                            <div className="category-image mb-[12px] flex items-center justify-center">
                                                                <img
                                                                    src={category?.image?.url}
                                                                    alt={category?.name}
                                                                    className="w-[50px] h-[50px] max-[1399px]:h-[65px] max-[1399px]:w-[65px] max-[1199px]:h-[50px] max-[1199px]:w-[50px] rounded-full"
                                                                />
                                                            </div>
                                                            <div className="category-sub-contact">
                                                                <h5 className="mb-[2px] text-[16px] font-quicksand text-[#3d4750] font-semibold tracking-[0.03rem] leading-[1.2]">
                                                                    <Link
                                                                        href={`/category/${slug}/${category?.slug}`}
                                                                        className="font-Poppins text-[16px] font-medium leading-[1.2] tracking-[0.03rem] text-[#3d4750] capitalize"
                                                                    >
                                                                        {category?.name}
                                                                    </Link>
                                                                </h5>
                                                                <p className="font-Poppins text-[13px] text-[#686e7d] leading-[25px] font-light tracking-[0.03rem]">
                                                                    {category?.productCount} items
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Shop section */}
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
                                                            {slug}
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
                                            productData.map((product, index) => (
                                                <div
                                                    key={index}
                                                    className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-[50%] px-[12px] mb-[24px] "

                                                >
                                                    <ProductCardThree product={product} />
                                                </div>
                                            ))
                                        )
                                    }
                                    {/* <div
                                        className="min-[1200px]:w-[20%] min-[992px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
                                        data-aos="fade-up"
                                        data-aos-duration={1000}
                                        data-aos-delay={300}
                                    >
                                        <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                                            <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                                                <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
                                                    <span className="text-[14px] text-[#777] font-medium uppercase">
                                                        New
                                                    </span>
                                                </span>
                                                <a href="javascript:void(0)">
                                                    <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                                                        <img
                                                            className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                                                            src="assets/img/new-product/1.jpg"
                                                            alt="product-1"
                                                        />
                                                        <img
                                                            className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                                                            src="assets/img/new-product/back-1.jpg"
                                                            alt="product-1"
                                                        />
                                                    </div>
                                                </a>
                                                <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                                                    <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                                                        <a
                                                            href="javascript:void(0)"
                                                            title="Wishlist"
                                                            className="w-[35px] h-[35px] flex items-center justify-center"
                                                        >
                                                            <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                                                        </a>
                                                    </li>
                                                    <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                                                        <a
                                                            href="javascript:void(0)"
                                                            title="Quick View"
                                                            className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                                                        >
                                                            <i className="ri-eye-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                                                        </a>
                                                    </li>
                                                    <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                                                        <a
                                                            href="compare.html"
                                                            title="Compare"
                                                            className="w-[35px] h-[35px] flex items-center justify-center"
                                                        >
                                                            <i className="ri-repeat-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                                                        </a>
                                                    </li>
                                                    <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                                                        <a
                                                            href="javascript:void(0)"
                                                            title="Add To Cart"
                                                            className="w-[35px] h-[35px] flex items-center justify-center"
                                                        >
                                                            <i className="ri-shopping-bag-4-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="bb-pro-contact p-[20px]">
                                                <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                                                    <a
                                                        href="shop-left-sidebar-col-3.html"
                                                        className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
                                                    >
                                                        Snacks
                                                    </a>
                                                    <span className="bb-pro-rating">
                                                        <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                                                        <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                                                        <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                                                        <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                                                        <i className="ri-star-line float-left text-[15px] mr-[3px] leading-[18px] text-[#777]" />
                                                    </span>
                                                </div>
                                                <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                                                    <a
                                                        href="product-left-sidebar.html"
                                                        className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                                                    >
                                                        Ground Nuts Oil Pack
                                                    </a>
                                                </h4>
                                                <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                    Cumque consectetur sit mollitia nihil magnam perspiciatis
                                                    eos atque qui cupiditate delectus. Provident totam optio
                                                    sapiente nam.
                                                </p>
                                                <div className="bb-price flex flex-wrap justify-between">
                                                    <div className="inner-price mx-[-3px]">
                                                        <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                                                            $15
                                                        </span>
                                                        <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                                                            $22
                                                        </span>
                                                    </div>
                                                    <span className="last-items text-[14px] text-[#686e7d]">
                                                        500g
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}


export default Page