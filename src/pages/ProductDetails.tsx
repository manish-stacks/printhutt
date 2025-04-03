'use client';
import { Product } from '@/lib/types/product';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { BiBell, BiChevronDown, BiChevronLeft, BiChevronRight, BiHeart, BiPackage, BiPlus, BiStar, BiX } from 'react-icons/bi';
import { BsChevronDown, BsChevronLeft, BsChevronRight, BsFileText, BsTruck } from 'react-icons/bs';
import { RiDiscountPercentFill, RiRotateLockLine, RiShoppingBag2Line, RiThumbUpFill } from 'react-icons/ri';
import { motion } from "framer-motion";
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import { formatCurrency } from '@/helpers/helpers';
import ProductSlider from '@/components/ProductSlider';
interface ProductProps {
  product: Product | null;
  relatedProduct: Product[];
}
export default function ProductDetails({ product, relatedProduct }: ProductProps) {
  const [selectedSize, setSelectedSize] = useState(product?.varient[0]?.size || '0');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDescriptions, setShowDescriptions] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'product' | 'brand'>('product');
  // const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 56, seconds: 28 });

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
    if (!product) return [];
    return [product.thumbnail.url, ...product.images.map((image) => image.url)];
  }, [product]);



  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed || isMobile) return;
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    },
    [isZoomed, isMobile]
  );

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

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  }, [productImages]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  }, [productImages]);



  const calculateDiscountedPrice = useCallback(() => {
    if (!product) return null;
    const discountedPrice =
      product.discountType === "percentage"
        ? product.price - (product.price * product.discountPrice) / 100
        : product.price - (product.discountPrice || 0);

    return product.price ? formatCurrency(discountedPrice) : null;
  }, [product]);





  const [_, forceRender] = useState(0); // Only used to force render when needed
  const timeLeft = useRef({ hours: 0, minutes: 56, seconds: 28 }); // Initial countdown time

  useEffect(() => {
    const interval = setInterval(() => {
      const { hours, minutes, seconds } = timeLeft.current;

      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(interval);
        return;
      }

      let newHours = hours,
        newMinutes = minutes,
        newSeconds = seconds - 1;

      if (newSeconds < 0) {
        newSeconds = 59;
        newMinutes -= 1;
      }
      if (newMinutes < 0) {
        newMinutes = 59;
        newHours -= 1;
      }

      timeLeft.current = { hours: newHours, minutes: newMinutes, seconds: newSeconds };

      forceRender((prev) => prev + 1); // Only force render when needed
    }, 1000);

    return () => clearInterval(interval);
  }, []);


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
            {/* Main Product Image */}
            <div
              className={`aspect-square bg-white rounded-lg overflow-hidden relative ${!isMobile ? 'cursor-zoom-in' : ''}`}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => !isMobile && setIsZoomed(true)}
              onMouseLeave={() => !isMobile && setIsZoomed(false)}
              onClick={() => setShowModal(true)}
            >
              <img
                src={productImages[currentImageIndex]}
                alt={currentImageIndex === 0 ? product?.imgAlt || "Product Image" : `${product?.slug}-${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                style={!isMobile ? {
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transition: isZoomed ? 'none' : 'transform 0.3s ease-out'
                } : {}}
              />
            </div>

            {/* Thumbnail Grid (Ensure Single Line) */}
            <div className="flex overflow-x-auto space-x-2 py-2">
              {productImages.map((img, i) => (
                <div
                  key={i}
                  className={`min-w-[70px] sm:min-w-[100px] aspect-square bg-white rounded-lg overflow-hidden cursor-pointer ${currentImageIndex === i ? 'ring-2 ring-black' : ''
                    }`}
                  onClick={() => setCurrentImageIndex(i)}
                >
                  <img
                    src={img}
                    alt={i === 0 ? product?.imgAlt || "Product Image" : `${product?.slug}-${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons Fixed on Left & Right */}
            <div className="relative flex items-center justify-between w-full mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-0 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
              >
                <BsChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-0 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
              >
                <BsChevronRight className="w-6 h-6" />
              </button>
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
                      <span className="text-lg sm:text-2xl font-bold">{calculateDiscountedPrice()}</span>
                      {product?.discountPrice > 0 && (
                        <span className="text-sm sm:text-lg text-rose-700 line-through">{formatCurrency(product?.price)}</span>
                      )}
                      {product?.discountPrice > 0 && (
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
                    <span className="text-blue-600 text-sm sm:text-lg cursor-pointer">| 11 Reviews</span>
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
                          className={`py-2 text-sm font-medium rounded-md ${selectedSize === size.size
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
                            }`}
                          onClick={() => setSelectedSize(size.size)}
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
                    {`${String(timeLeft.current.hours).padStart(2, "0")}h : 
                    ${String(timeLeft.current.minutes).padStart(2, "0")}m : 
                    ${String(timeLeft.current.seconds).padStart(2, "0")}s`}
                  </span>
                </div>

                <motion.div
                  animate={{ x: [0, 8, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                >
                  <BiBell className="text-gray-600 text-sm sm:text-md" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <button className="flex-1 bg-yellow-400 text-slate-700 py-3 px-6 rounded-md font-medium hover:bg-yellow-500 flex items-center justify-center gap-2">
                    <RiShoppingBag2Line className="w-5 h-5" /> ADD TO BAG
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                    <BiHeart className="w-6 h-6" />
                  </button>
                </div>
              </div>


              <div className="py-4">
                <Image src={"/img/shape/badges.png"} width={400} height={50} alt="badges" className='w-[60%]' />
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
                <p className="text-black font-medium">
                  Get Extra ₹100 Off on orders above Rs.500. <br />Coupon code - <span className="font-bold">FLAT100</span>
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
                                Warranty : {product?.warrantyInformation?.durationMonths} Months ({product?.warrantyInformation?.warrantyType.toUpperCase()}) <span title={product?.warrantyInformation?.claimProcess} className="text-blue-600">how?</span>
                              </li>
                              <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                                Shipping : {product?.shippingInformation?.shippingTime} ({product?.shippingInformation?.shippingMethod})
                              </li>
                              {
                                product?.offers.length > 0 && (
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
                              <p className="text-sm text-gray-500 mt-1">{totalRatings} ratings</p>
                            </div>
                            <div className="flex-1 space-y-2 md:space-y-0 md:flex md:flex-col md:gap-2">
                              {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center gap-2">
                                  <span className="text-sm w-3">{rating}</span>
                                  <BiStar className="w-4 h-4 text-yellow-400 fill-current" />
                                  <div className="w-52 h-2 bg-gray-300 ml-2 rounded-full overflow-hidden">
                                    <div className="h-2 bg-green-500" style={{ width: `${(ratingCounts[rating] / totalRatings) * 100}%` }} />
                                  </div>
                                  <span className="text-sm text-gray-500 w-10">({ratingCounts[rating]})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>


                        <div className="space-y-4">
                          {reviews.map((review) => (
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
                          ))}
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