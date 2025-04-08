import React from 'react'
import { wishlistService } from '@/_services/common/wishlist';
import { formatCurrency } from '@/helpers/helpers';
import { Product } from '@/lib/types/product';
import { useCartStore } from '@/store/useCartStore';
import useQuickStore from '@/store/useQuickStore';
import { useUserStore } from '@/store/useUserStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface PopupProps {
    product: Product;
    deleteWishlist: (productId: string) => void;
}

const WishListcart = ({ product, deleteWishlist }: PopupProps) => {

    const addToCart = useCartStore(state => state.addToCart);
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const router = useRouter();
    const handleAddToCart = (productData: Product) => {
        addToCart(productData, 1);
        toast('Added to cart');
    };

    const { openQuickView } = useQuickStore();

    const quickViewModel = (productData: Product) => {
        openQuickView(productData);
    }


    const handleAddToWishlist = async (productData: Product) => {
        if (!isLoggedIn) return router.push('/login');
        const response = await wishlistService.addWishlist(productData._id);
        // console.log(response);
        toast(response?.message);
    }

   



    return (
        <>

            <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                    <span className="bb-remove-wish absolute right-[15px] top-[15px] z-[10]">
                        <button onClick={() => deleteWishlist(product?.productId?._id)} >
                            <i className="ri-close-circle-fill transition-all duration-[0.3s] ease-in-out text-[22px] text-[#686e7d] hover:text-[#6c7fd8]" />
                        </button>
                    </span>
                    <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
                        <span className="text-[14px] text-[#777] font-medium uppercase">
                            {(product?.productId.new || product?.productId?.trending || product?.productId?.sale) && (
                                <span className="text-[14px] text-[#777] font-medium uppercase">
                                    {product?.productId.new ? "New" : product?.productId.trending ? "Trend" : "Sale"}
                                </span>
                            )}
                        </span>
                    </span>
                    <a >
                        <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <Image
                                className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                                src={product?.productId?.thumbnail?.url}
                                alt={product?.productId.title}
                                width={800}
                                height={800}
                            />
                            <Image
                                className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                                src={product?.productId.images[0]?.url}
                                alt={product?.productId.title}
                                width={800}
                                height={800}
                            />
                        </div>
                    </a>
                    <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                        <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <button
                                onClick={() => handleAddToWishlist(product?.productId)}
                                title="Wishlist"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                                <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </button>
                        </li>
                        <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <button
                                onClick={() => quickViewModel(product?.productId)}
                                title="Quick View"
                                className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                            >
                                <i className="ri-eye-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </button>
                        </li>
                        <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <Link
                                href={"/compare"}
                                title="Compare"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                                <i className="ri-repeat-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </Link>
                        </li>
                        <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                                onClick={() => handleAddToCart(product?.productId)}
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

                        <span className="bb-pro-rating">
                            {Array.from({ length: 5 }, (_, index) => (
                                <i
                                    key={index}
                                    className={`float-left text-[15px] mr-[3px] leading-[18px] ${index < Math.round(product?.productId.rating)
                                        ? "ri-star-fill text-[#fea99a]"
                                        : "ri-star-line text-[#777]"
                                        }`}
                                />
                            ))}
                        </span>
                    </div>
                    <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                        <Link href={`/product-details/${product?.productId.slug}`}
                            className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                        >
                            {product?.productId.title || 'Na'}
                        </Link>
                    </h4>
                    <div className="bb-price flex flex-wrap justify-between">
                        <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                                {product?.productId?.discountType === 'percentage'
                                    ? formatCurrency(product?.productId?.price - (product?.productId?.price * product?.productId?.discountPrice) / 100)
                                    : formatCurrency(product?.productId?.price - product?.productId?.discountPrice)}
                            </span>
                            <span className="old-price px-[3px] text-[14px] max-[480px]:text-[10px] text-[#686e7d] line-through">
                                {product?.productId?.discountPrice > 0 ? formatCurrency(product?.productId?.price) : ''}
                            </span>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default WishListcart