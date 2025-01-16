import { formatCurrency } from '@/helpers/helpers';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import React from 'react'
import { toast } from 'react-toastify';

interface QuickViewProps {
    product: {
        title: string;
        thumbnail: { url: string };
        short_description: string;
        slug: string;
        discountType:string;
        discountPrice: number;
        price: number;
        oldPrice: string;
        rating: number;
    };
    onClose: () => void;
}

const QuickView = ({ product, onClose }: QuickViewProps) => {

    const [quantity, setQuantity] = React.useState(1);
    const addToCart = useCartStore(state => state.addToCart);


    const handleQuantityChange = (change: number) => {
        const newQuantity = Math.max(1, quantity + change);
        setQuantity(newQuantity);
    };


    const handleAddToCart = () => {
        if (!product || quantity <= 0) {
            toast.error('Please select quantity');
            return;
        }
        addToCart(product, quantity);
        onClose();
        toast('Added to cart');
    }
    // console.log(product)
    return (
        <>
            <div className="bb-modal-overlay w-full h-screen fixed top-0 left-0 z-[26] bg-[#000000b3]" onClick={onClose} />
            <div className="bb-modal quickview-modal max-[575px]:w-full fixed top-[45%] max-[767px]:top-[50%] left-[50%] z-[30] max-[767px]:w-full max-[767px]:max-h-full max-[767px]:overflow-y-auto">
                <div className="bb-modal-dialog h-full my-[0%] mx-auto max-w-[700px] w-[700px] max-[991px]:max-w-[650px] max-[991px]:w-[650px] max-[767px]:w-[80%] max-[767px]:h-auto max-[767px]:max-w-[80%] max-[767px]:m-[0] max-[767px]:py-[35px] max-[767px]:mx-auto max-[575px]:w-[90%] transition-transform duration-[0.3s] ease-out ">
                    <div className="modal-content p-[24px] relative bg-[#fff] rounded-[20px] overflow-hidden">
                        <button
                            type="button"
                            className="bb-close-modal transition-all duration-[0.3s] ease-in-out w-[16px] h-[20px] absolute top-[-5px] right-[27px] bg-[#e04e4eb3] rounded-[10px] cursor-pointer hover:bg-[#e04e4e]"
                            title="Close"
                            onClick={onClose}
                        />
                        <div className="modal-body mx-[-12px] max-[767px]:mx-[0]">
                            <div className="flex flex-wrap mx-[-12px] mb-[-24px]">
                                <div className="min-[768px]:w-[41.66%] min-[576px]:w-full px-[12px] mb-[24px]">
                                    <div className="single-pro-img single-pro-img-no-sidebar h-full border-[1px] border-solid border-[#eee] overflow-hidden rounded-[20px]">
                                        <div className="single-product-scroll h-full">
                                            <div className="single-slide zoom-image-hover h-full bg-[#fff] flex items-center">
                                                <img
                                                    className="img-responsive max-w-full block"
                                                    src={product?.thumbnail?.url}
                                                    alt={product.title}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="min-[768px]:w-[58.33%] min-[576px]:w-full px-[12px] mb-[24px]">
                                    <div className="quickview-pro-content">
                                        <h5 className="bb-quick-title">
                                            <Link
                                                href={`/product-details/${product.slug}`}
                                                className="font-Poppins tracking-[0.03rem] mb-[10px] block text-[#3d4750] text-[20px] leading-[30px] font-medium"
                                            >
                                                {product.title}
                                            </Link>
                                        </h5>
                                        <div className="bb-pro-rating flex mb-[10px]">
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <i
                                                    key={index}
                                                    className={`float-left text-[15px] mr-[3px] leading-[18px] ${index < product.rating
                                                        ? "ri-star-fill text-[#fea99a]"
                                                        : "ri-star-line text-[#777]"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="bb-quickview-desc mb-[10px] text-[15px] leading-[24px] text-[#777] font-light">
                                            {product.short_description}
                                        </div>
                                        <div className="bb-quickview-price pt-[5px] pb-[10px] flex items-center justify-left">
                                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                                                {product.discountType === 'percentage'
                                                    ? formatCurrency(product.price - (product.price * product.discountPrice) / 100)
                                                    : formatCurrency(product.price - product.discountPrice)}
                                            </span>
                                            <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                                                {product.discountPrice > 0 ? formatCurrency(product.price) : ''}
                                            </span>
                                        </div>

                                        <div className="bb-quickview-qty flex max-[360px]:justify-center">
                                            <div className="qty-plus-minus w-[85px] h-[40px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px] max-[360px]:m-[auto]">
                                                <div className="dec bb-qtybtn" onClick={() => handleQuantityChange(-1)}>-</div>
                                                <input
                                                    className="qty-input text-[#777] float-left text-[14px] h-auto m-[0] p-[0] text-center w-[32px] outline-[0] font-normal leading-[35px] rounded-[10px]"
                                                    type="text"
                                                    name="bb-qtybtn"
                                                    min="1"
                                                    readOnly
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                                />
                                                <div className="inc bb-qtybtn" onClick={() => handleQuantityChange(1)}>+</div>
                                            </div>
                                            <div className="bb-quickview-cart ml-[4px] max-[360px]:mt-[15px] max-[360px]:ml-[0] max-[360px]:flex max-[360px]:justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddToCart()}
                                                    className="bb-btn-1 transition-all duration-[0.3s] ease-in-out font-Poppins h-[40px] leading-[28px] tracking-[0.03rem] py-[3px] px-[20px] text-[14px] font-normal text-[#3d4750] bg-transparent rounded-[10px] border-[1px] border-solid border-[#3d4750] hover:bg-[#6c7fd8] hover:border-[#6c7fd8] hover:text-[#fff]"
                                                >
                                                    <i className="ri-shopping-bag-line pr-[8px]" />
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default QuickView