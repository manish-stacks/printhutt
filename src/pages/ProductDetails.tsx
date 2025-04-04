'use client';
import { Product } from '@/lib/types/product';
import { wishlistService } from '@/_services/common/wishlist';
import React, { useState, useEffect, useMemo } from 'react';
import { BiBell, BiChevronLeft, BiChevronRight, BiHeart, BiPlus, BiStar, BiX, BiZoomIn } from 'react-icons/bi';
import { BsFileText } from 'react-icons/bs';
import { RiDiscountPercentFill, RiShoppingBag2Line, RiThumbUpFill } from 'react-icons/ri';
import { motion } from "framer-motion";
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import { formatCurrency } from '@/helpers/helpers';
import ProductSlider from '@/components/ProductSlider';
import useCartSidebarStore from '@/store/useCartSidebarStore';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import Link from 'next/link';
interface ProductProps {
  product: {
    _id: string;
    title: string;
    short_description: string;
    description: string;
    slug: string;
    imgAlt: string;
    thumbnail: { url: string };
    images: { url: string }[];
    varient: { size: string; price: number; discountPrice?: number; discountType?: string; _id: string }[];
    brand: string;
    dimensions: string;
    shippingFee?: number;
    weight?: number;
    isVarientStatus?: boolean;
    returnPolicy?: { returnPeriod?: string };
    warrantyInformation?: { durationMonths?: number; warrantyType?: string; claimProcess?: string };
    shippingInformation?: { shippingTime?: string; shippingMethod?: string };
    offers?: { offerTitle?: string; offerDescription?: string }[];
    discountPrice?: number;
    discountType?: string;
    price?: number;
    meta?: {
      meta_title?: string;
      meta_description?: string;
      meta_keywords?: string;
    };
    customizeLink: string;
    isCustomize?: boolean;
    reviews?: {
      userId?: { displayName?: string };
      rating?: number;
      review?: string;
      createdAt?: string;
      images?: { url: string }[];
    }[];
  };
  relatedProduct: Product[];

}
export default function ProductDetails({ product, relatedProduct }: ProductProps) {
  const [selectedSize, setSelectedSize] = useState(product?.varient[0]?._id || '0');
  const [showDescriptions, setShowDescriptions] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'product' | 'brand'>('product');
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 58, seconds: 28 });
  const { openCartSidebarView } = useCartSidebarStore();
  const addToCart = useCartStore(state => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  // const items = useCartStore((state) => state.items);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sizes = useMemo(() => product?.varient || [], [product]);

  const productImages = useMemo(() => {
    const thumbnailUrl = product?.thumbnail?.url ? `${product.thumbnail.url}?auto=format&fit=crop&w=800&q=80` : null;
    const imageUrls = product?.images?.map((image) => `${image.url}?auto=format&fit=crop&w=800&q=80`) || [];
    return [thumbnailUrl, ...imageUrls].filter(Boolean);
  }, [product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const keyHighlights = useMemo(() => [
    { label: "Brand", value: product?.brand },
    { label: "DimensionsFit", value: product?.dimensions },
    { label: "Delivery", value: "5-8 Days or Depends on Location" },
    { label: "Outer Material", value: "A-Grade Standard Quality" },
    { label: "Shipping", value: product?.shippingFee || 'Free Shipping' },
    { label: "Weight", value: `${product?.weight}g` },
  ], [product]);

  const reviews = useMemo(() => [
    { id: 1, rating: 5, comment: "Best one I ever bought!", author: "Alroy", date: "6 January 2025", helpful: 2 },
    { id: 2, rating: 4, comment: "Great quality and design", author: "Sarah", date: "15 January 2025", helpful: 1 },
  ], []);

  const ratingCounts = useMemo(() => ({
    5: 251,
    4: 139,
    3: 55,
    2: 1,
    1: 3
  }), []);

  const totalRatings = useMemo(() => Object.values(ratingCounts).reduce((a, b) => a + b, 0), [ratingCounts]);

  const averageRating = useMemo(() =>
    Object.entries(ratingCounts).reduce((acc, [rating, count]) => acc + (Number(rating) * count), 0) / totalRatings,
    [ratingCounts, totalRatings]
  );

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };




  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);




  // const handleQuantityChange = (change: number) => {
  //   const newQuantity = Math.max(1, quantity + change);
  //   setQuantity(newQuantity);
  // };

  // const item = items.find(item => item._id === product?._id) || { _id: '', quantity: 0 };

  const calculateDiscountedPrice = useMemo(() => {
    if (!product || product.price == null) return null;
    const discountedPrice =
      product.discountType === "percentage"
        ? product.price - (product.price * (product.discountPrice ?? 0)) / 100
        : product.price - (product.discountPrice || 0);

    return formatCurrency(discountedPrice);
  }, [product]);

  const onchangeVarient = (id: string) => {
    setSelectedSize(id)
    const varient = product?.varient.find(item => item._id === id);
    if (product && varient) {
      product.price = varient.price || 0;
    }

  }

  const handleAddToCart = () => {
    if (!product || quantity <= 0) {
      toast.error('Please select quantity');
      return;
    }
    if (product.isCustomize) {
      return router.push(product.customizeLink);
    }
    addToCart(product, quantity);
    openCartSidebarView();
    return toast.success('Product added to cart successfully!');
  }



  const handleAddToWishlist = async () => {
    if (!isLoggedIn) return router.push('/login');
    await wishlistService.addWishlist(product._id);
    return toast.success('Product added to wishlist successfully!');
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb title={"Product Page"} />
        {/* Image Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-6xl mx-4">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-rose-700 hover:text-rose-800 z-[999]"
              >
                <BiX className="w-8 h-8" />
              </button>
              <div className="relative flex items-center justify-center">
                <img
                  src={productImages[currentImageIndex]}
                  alt={currentImageIndex === 0 ? product?.imgAlt || "Product Image" : `${product?.slug}-${currentImageIndex + 1}`}
                  className="w-auto h-[800px] sm:w-full max-[567px]:h-0 object-contain"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-600/60 hover:bg-slate-600/70 p-2 rounded-full"
                >
                  <BiChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-600/60 hover:bg-slate-600/70 p-2 rounded-full"
                >
                  <BiChevronRight className="w-8 h-8 text-white" />
                </button>
              </div>
              <div className="flex justify-center mt-4 gap-2">
                {productImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-2 h-2 rounded-full ${currentImageIndex === i ? 'bg-white' : 'bg-white/50'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Product Images */}

          <div className="md:sticky md:top-8 space-y-4 h-fit">
            {/* Main Image */}
            <div
              className={`aspect-square bg-white rounded-lg overflow-hidden relative shadow-lg ${!isMobile ? 'cursor-zoom-in' : ''}`}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => !isMobile && setIsZoomed(true)}
              onMouseLeave={() => !isMobile && setIsZoomed(false)}
              onClick={() => setShowModal(true)}
            >
              <img
                src={productImages[currentImageIndex]}
                alt={currentImageIndex === 0 ? product?.imgAlt || "Product Image" : `${product?.slug}-${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-200"
                style={!isMobile ? {
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transition: isZoomed ? 'none' : 'transform 0.3s ease-out'
                } : {}}
              />

              {/* Zoom indicator */}
              {!isZoomed && (
                <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full">
                  <BiZoomIn className="w-5 h-5 text-gray-600" />
                </div>
              )}

              {/* Navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}

                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <BiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <BiChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnails Slider */}
            <div className="relative">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-2 pb-2">
                  {productImages.map((image, index) => (
                    <div
                      key={index}
                      // className={`min-w-[70px] sm:min-w-[100px] aspect-square bg-white rounded-lg overflow-hidden cursor-pointer ${currentImageIndex === index ? 'ring-2 ring-black' : ''
                      //   }`}
                      className={`
                          flex-none w-24 max-[567px]:w-20 aspect-square rounded-lg overflow-hidden
                          ${currentImageIndex === index
                          ? 'ring-2 ring-black ring-offset-2'
                          : 'hover:opacity-75'
                        }
                        `}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={index === 0 ? product?.imgAlt || "Product Image" : `${product?.slug}-${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>




              {/* Gradient overlays to indicate scroll */}
              <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-gray-50 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-gray-50 pointer-events-none" />
            </div>
          </div>

          {/* Right side - Product Details */}
          <div className="space-y-6 mt-8 md:mt-0">


            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{product?.title}</h1>
              <p className="text-xs sm:text-sm text-gray-500">{product?.short_description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg sm:text-2xl font-bold">{calculateDiscountedPrice}</span>
                      {product?.discountPrice && product?.price != null && product.discountPrice > 0 && (
                        <span className="text-sm sm:text-lg text-rose-700 line-through">
                          {formatCurrency(product.price)}
                        </span>
                      )}
                      {product.discountPrice && product?.discountPrice > 0 && (
                        <span className="text-sm sm:text-lg text-green-600 font-semibold">
                          {
                            product.discountType === "percentage"
                              ? `${product.discountPrice}%`
                              : `${formatCurrency(product.discountPrice)}`
                          }
                          OFF
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">inclusive of all taxes</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiStar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm sm:text-lg font-medium">4.4</span>
                    <span className="text-blue-600 text-sm sm:text-lg cursor-pointer">| {totalRatings} Reviews</span>
                  </div>
                </div>
              </div>

              {
                product?.isVarientStatus && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
                    <div className="mt-2 grid grid-cols-8 gap-2">
                      {sizes.map((size, index) => (
                        <button
                          key={index}
                          className={`py-2 text-sm font-medium rounded-md ${selectedSize === size._id
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
                            }`}
                          onClick={() => onchangeVarient(size._id)}
                        >
                          {size.size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              <div className="flex justify-between items-center bg-blue-50 p-2 sm:p-4 rounded-lg">

                <div className="font-semibold text-black text-xs sm:text-base">
                  Sale ends in: <span className="font-bold">
                    {`${String(timeLeft.hours).padStart(2, '0')}:
                    ${String(timeLeft.minutes).padStart(2, '0')}:
                    ${String(timeLeft.seconds).padStart(2, '0')}`}
                  </span>
                </div>

                <motion.div
                  animate={{ x: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <BiBell className="text-gray-600 text-xl" />
                </motion.div>


              </div>
              <div className="space-y-2">
                <div className="flex gap-2" >
                  <button onClick={() => handleAddToCart()} className="flex-1 bg-yellow-400 text-slate-700 py-3 px-6 rounded-md font-medium hover:bg-yellow-500 flex items-center justify-center gap-2">
                    <RiShoppingBag2Line className="w-5 h-5" /> {product?.isCustomize ? "Customize & Buy" : "ADD TO BAG"}
                  </button>
                  <button onClick={() => handleAddToWishlist()} className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                    <BiHeart className="w-6 h-6" />
                  </button>
                </div>
              </div>


              <div className="py-4">
                <Image src={"/img/shape/badges.png"} width={400} height={50} alt="badges" className='w-[50%] max-[567px]:w-full' />
              </div>
              {/* <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center bg-slate-100 px-2 py-6 rounded-md text-slate-800">
                <BsTruck className="w-6 h-6 mx-auto mb-2" />
                <p className="text-md">Free Shipping</p>
              </div>
              <div className="text-center bg-slate-100 px-2 py-6 rounded-md text-slate-800">
                <BiPackage className="w-6 h-6 mx-auto mb-2" />
                <p className="text-md">Premium Quality</p>
              </div>
              <div className="text-center bg-slate-100 px-2 py-6 rounded-md text-slate-800">
                <RiRotateLockLine className="w-6 h-6 mx-auto mb-2" />
                <p className="text-md">Secure Payment</p>
              </div>
            </div> */}

              <div className=" p-4 border border-green-400 bg-gradient-to-t from-green-200 to-green-50 rounded-lg flex items-center space-x-3 shadow-md">
                <RiDiscountPercentFill className="text-green-600" size={32} />
                <p className="text-black font-medium max-[567px]:text-xs">
                  Get ₹100 Off on prepaid orders above. <br />Coupon code - <span className="font-bold">FLAT100</span>
                </p>
              </div>

              <div className="space-y-4">
                {/* Key Highlights */}
                <div className="border-t pt-4">
                  <div className="w-full py-2">
                    <span className="text-xl text-slate-900 font-medium">Key Highlights</span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {keyHighlights.map((highlight, index) => (
                      <div key={index} className="space-y-1 border-b pb-2">
                        <p className="text-md text-gray-500">{highlight.label}</p>
                        <p className="text-md font-medium text-slate-700">{highlight.value}</p>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Product Description */}

                <div  >
                  <div className="w-full cursor-pointer flex justify-between items-center py-2" onClick={() => setShowDescriptions(!showDescriptions)}>
                    <div className="flex items-center gap-2">
                      <BsFileText className="text-gray-600" size={30} />
                      <div>
                        <p className="font-semibold text-black">Product Description</p>
                        <p className="text-gray-500 text-sm">Manufacture, Care and Fit</p>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: showDescriptions ? 45 : 0 }}>
                      <BiPlus className="text-gray-600" size={20} />
                    </motion.div>
                  </div>
                  {showDescriptions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-gray-700"
                    >
                      <div className="mt-4 text-sm text-gray-600">
                        <div className="bb-details">
                          <div
                            dangerouslySetInnerHTML={{ __html: product?.description }}
                            className="mb-[12px] font-Poppins text-[#686e7d] leading-[28px] tracking-[0.03rem] font-dark"
                          />
                          <div className="details-info">
                            <ul className="list-disc pl-[20px] mb-[0]">
                              <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                                Warranty : {product?.warrantyInformation?.durationMonths} Months ({product?.warrantyInformation?.warrantyType?.toUpperCase() ?? "N/A"}) <span title={product?.warrantyInformation?.claimProcess} className="text-blue-600">how?</span>
                              </li>
                              <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                                Shipping : {product?.shippingInformation?.shippingTime} ({product?.shippingInformation?.shippingMethod})
                              </li>
                              {
                                product?.offers && product?.offers.length > 0 && (
                                  <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                                    Offers: {product?.offers.map((offer, index) => (
                                      <span key={index} className="font-Poppins text-[#777] text-[14px] leading-[28px] tracking-[0.03rem]">
                                        {offer.offerTitle} - {offer.offerDescription}
                                      </span>
                                    ))}
                                  </li>
                                )
                              }

                            </ul>
                            <ul className="list-disc pl-[20px] mb-[0]">
                              <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                                <span className="inline-flex font-medium min-w-[150px]">
                                  Highlights
                                </span>
                                Form FactorWhole
                              </li>
                              <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                                <span className="inline-flex font-medium min-w-[150px]">
                                  Return
                                </span>
                                {product?.returnPolicy?.returnPeriod || 'No Returns Allowed'}

                              </li>
                              <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                                <span className="inline-flex font-medium min-w-[150px]">
                                  Services
                                </span>
                                Cash on Delivery available
                              </li>
                            </ul>
                          </div>
                        </div>

                      </div>

                    </motion.div>
                  )}
                </div>


                <div className="w-full">
                  <div className="flex border-b">
                    <button
                      className={`px-4 py-2 font-semibold w-1/2 text-md max-[567px]:text-xs max-[567px]:p-0 ${activeTab === 'product' ? 'border-b-2 border-yellow-500 text-black' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('product')}
                    >
                      Product Reviews
                    </button>
                    <button
                      className={`px-4 py-2 font-semibold w-1/2 text-md max-[567px]:text-xs max-[567px]:p-0 ${activeTab === 'brand' ? 'border-b-2 border-yellow-500 text-black' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('brand')}
                    >
                      Brand Reviews
                    </button>
                  </div>
                  <div className="p-4">
                    {activeTab === 'product' ? (
                      <div className="mt-4 space-y-6">
                        <p className="text-black font-medium text-md flex gap-2 max-[567px]:text-xs"><RiThumbUpFill size={20} />87% of verified buyers recommend this product.</p>
                        <div className="flex flex-col md:flex-row items-center justify-between">
                          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
                            <div className="text-center md:text-left">
                              <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
                              <div className="flex items-center justify-center mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <BiStar key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                              <p className="text-sm text-gray-500 mt-1 mb-4">{totalRatings} ratings</p>
                              <Link href={`/product-details/${product?.slug}/write-review`} className='border-2 border-sky-500 text-sky-600 px-4 py-2 rounded-md mt-2 font-semibold'>RATE</Link>
                            </div>
                            <div className="flex-1 space-y-2 md:space-y-0 md:flex md:flex-col md:gap-2 max-[567px]:p-3">
                              {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center gap-2">
                                  <span className="text-sm w-3">{rating}</span>
                                  <BiStar className="w-4 h-4 text-yellow-400 fill-current" />
                                  <div className="w-52 h-2 bg-gray-300 ml-2 rounded-full overflow-hidden">
                                    <div className="h-2 bg-green-500" style={{ width: `${(ratingCounts[rating as 1 | 2 | 3 | 4 | 5] / totalRatings) * 100}%` }} />
                                  </div>
                                  <span className="text-sm text-gray-500 w-10">({ratingCounts[rating as 1 | 2 | 3 | 4 | 5]})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>


                        <div className="space-y-4">

                          {
                            product?.reviews && product?.reviews?.length > 0 ? (
                              product?.reviews.map((review, index) => (
                                <div key={index}>
                                  <div className="reviews-bb-box flex mb-[24px] max-[575px]:flex-col">
                                    <div className="inner-image mr-[12px] max-[575px]:mr-[0] max-[575px]:mb-[12px]">
                                      <img
                                        src="/img/dummy-image.jpg"
                                        alt="img-1"
                                        className="w-[50px] h-[50px] max-w-[50px] rounded-[10px]"
                                      />
                                    </div>
                                    <div className="inner-contact">
                                      <h4 className="font-quicksand leading-[1.2] tracking-[0.03rem] mb-[5px] text-[16px] font-bold text-[#3d4750]">
                                        {review?.userId?.displayName || "User"}
                                      </h4>
                                      <div className="bb-pro-rating flex">
                                        {Array(review?.rating || 5)
                                          .fill(0)
                                          .map((_, starIndex) => (
                                            <i
                                              key={starIndex}
                                              className={`${starIndex < (review.rating ?? 5)
                                                ? "ri-star-fill text-[#fea99a]"
                                                : "ri-star-line text-[#777]"
                                                } float-left text-[15px] mr-[3px]`}
                                            />
                                          ))}
                                      </div>
                                      <p className="font-Poppins text-[14px] leading-[26px] font-light tracking-[0.03rem] text-[#686e7d]">
                                        {review.review}
                                      </p>
                                    </div>
                                  </div>
                                  {
                                    review?.images && (
                                      <div className="reviews-bb-box flex mb-[24px] max-[575px]:flex-col">
                                        {
                                          review?.images.map((image, index) => (
                                            <div key={index} className="inner-image mr-[12px] max-[575px]:mr-[0] max-[575px]:mb-[12px]">
                                              <img
                                                src={image.url}
                                                alt={`img-${index}`}
                                                className="w-[50px] h-[50px] max-w-[50px] rounded-[10px]"
                                              />
                                            </div>
                                          ))
                                        }

                                      </div>
                                    )
                                  }

                                </div>
                              ))
                            ) : (
                              reviews.map((review) => (
                                <div key={review.id} className="border-t pt-4">
                                  <div className="flex items-center mb-2">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <BiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                  </div>
                                  <p className="text-sm mb-2">{review.comment}</p>
                                  <div className="flex items-center justify-between text-sm text-gray-500">
                                    <p>{review.author} - {review.date}</p>
                                    <div className="flex items-center">
                                      <span>{review.helpful} people found this helpful</span>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )
                          }
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600">Brand Reviews section content goes here.</p>
                    )}
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>


      <section className="section-related-product py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div
                className="section-title mb-[20px] pb-[20px] z-[5] relative flex flex-col max-[991px]:pb-[0]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail max-[991px]:mb-[12px]">
                  <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                    You May Also Like
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    Browse The Collection of Top Products.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-[12px]">
              <div className="bb-deal-slider m-[-12px]">
                <div className="bb-deal-block">
                  <ProductSlider products={relatedProduct} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}