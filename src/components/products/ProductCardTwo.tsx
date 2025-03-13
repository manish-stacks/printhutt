"use client"
import { wishlistService } from '@/_services/common/wishlist';
import { formatCurrency } from '@/helpers/helpers';
import { Product } from '@/lib/types/product';
import { useCartStore } from '@/store/useCartStore';
import useQuickStore from '@/store/useQuickStore';
import { useUserStore } from '@/store/useUserStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React from 'react'
import { toast } from 'react-toastify';

interface PopupProps {
    product: Product;
}


const ProductCardTwo = ({ product }: PopupProps) => {

    const addToCart = useCartStore(state => state.addToCart);
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const router = useRouter();
    const handleAddToCart = (product: Product) => {
        if (product?.isCustomize) {
            return router.push(product?.customizeLink);
        }
        addToCart(product, 1);
        toast('Added to cart');
    };


    const { openQuickView } = useQuickStore();

    const quickViewModel = () => {
        openQuickView(product);
    }
    const handleAddToWishlist = async (product: Product) => {
        if (!isLoggedIn) return router.push('/login');
        const response = await wishlistService.addWishlist(product._id);

        toast(response.message);
    }

    return (
        <>
            <div
                className="bb-deal-card p-[12px]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
            >
                <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                    <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
                            <span className="text-[14px] text-[#777] font-medium uppercase">
                                {(product.new || product.trending || product.sale) && (
                                    <span className="text-[14px] text-[#777] font-medium uppercase">
                                        {product.new ? "New" : product.trending ? "Trend" : "Sale"}
                                    </span>
                                )}
                            </span>
                        </span>
                        {product.discountPrice > 0 && (
                            <span className={`discount transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] right-[10px] bg-rose-500 text-[#fff] font-medium text-[12px] px-2 rounded-full`}>
                                Off {
                                    product.discountType === 'percentage'
                                        ? `${product?.discountPrice}%`
                                        : `${formatCurrency(product?.discountPrice)}`
                                }
                            </span>
                        )}

                        <Link href={`/product-details/${product.slug}`}>
                            <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                                <Image
                                    className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                                    src={product?.thumbnail?.url}
                                    alt={product.title}
                                    width={800}
                                    height={800}
                                />
                                <img
                                    className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                                    src={product?.images[0]?.url}
                                    alt={product.title}
                                    width={800}
                                    height={800}
                                />
                            </div>
                        </Link>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                                <button
                                    onClick={() => handleAddToWishlist(product)}
                                    title="Wishlist"
                                    className="w-[35px] h-[35px] flex items-center justify-center"
                                >
                                    <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                                </button>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                                <button
                                    onClick={quickViewModel}
                                    title="Quick View"
                                    className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                                >
                                    <i className="ri-eye-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                                </button>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                                <Link
                                    href="/compare"
                                    title="Compare"
                                    className="w-[35px] h-[35px] flex items-center justify-center"
                                >
                                    <i className="ri-repeat-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                                </Link>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    title="Add To Cart"
                                    className="w-[35px] h-[35px] flex items-center justify-center"
                                >
                                    <i className="ri-shopping-bag-4-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="bb-pro-contact p-[20px]">
                        <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                            <Link
                                href={`/category/${product?.category?.slug}`}
                                className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
                            >
                                {product?.category?.name || 'PrintHutt'}
                            </Link>
                            <span className="bb-pro-rating">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <i
                                        key={index}
                                        className={`float-left text-[15px] mr-[3px] leading-[18px] ${index < Math.round(product.rating)
                                            ? "ri-star-fill text-[#fea99a]"
                                            : "ri-star-line text-[#777]"
                                            }`}
                                    />
                                ))}
                            </span>
                        </div>
                        <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                            <Link href={`/product-details/${product.slug}`}
                                className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                            >
                                {product.title}
                            </Link>
                        </h4>
                        {product?.showPrice ? (
                            <div className="bb-price flex flex-wrap justify-between">
                                <div className="inner-price mx-[-3px]">
                                    <span className="new-price px-[3px] text-[16px] max-[480px]:text-[12px] text-green-800 font-bold">
                                        {product.discountType === 'percentage'
                                            ? formatCurrency(product.price - (product.price * product.discountPrice) / 100)
                                            : formatCurrency(product.price - product.discountPrice)}
                                    </span>
                                    <span className="old-price px-[3px] text-[14px] max-[480px]:text-[10px] text-rose-600 line-through">
                                        {product.discountPrice > 0 ? formatCurrency(product.price) : ''}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={product?.customizeLink}
                                className="font-Poppins leading-[28px]  text-[#6c7fd8] hover:text-[#3d4750]"
                            >
                                Customize & Buy
                            </Link>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductCardTwo