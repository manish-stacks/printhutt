'use client'

import { useState, useEffect, useRef } from "react"
import { getAllCouponsPagination } from "@/_services/admin/coupon"
import { FaTimes, FaChevronLeft, FaChevronRight, FaRupeeSign, FaTag, FaCheck } from "react-icons/fa"
import { motion } from "framer-motion"
import LoadingSpinner from "./LoadingSpinner"

interface Coupon {
    code: string
    description: string
    discountType: "percentage" | "fixed"
    discountValue: number
    minimumPurchaseAmount: number
    maxDiscountAmount: number
    createdAt: string
}

interface CouponsSliderProps {
    isOpen: boolean
    onClose: () => void
    handle_select: (coupon: Coupon) => void
    total_money: { discountPrice: number }
}


const Coupons_Slider: React.FC<CouponsSliderProps> = ({ isOpen, onClose, handle_select, total_money }) => {
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
    const sliderRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (isOpen) {
            fetchCoupons()
        }
    }, [isOpen, page])

    const fetchCoupons = async () => {
        try {
            setLoading(true)
            const response = await getAllCouponsPagination(page, search)
            if (response && response.coupons) {
                setCoupons(response.coupons || [])
            } else {
                console.error("No coupons found in response", response)
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    const handleCouponSelect = (coupon: Coupon) => {
        if (total_money?.discountPrice >= coupon.minimumPurchaseAmount) {
            setSelectedCoupon(coupon)
            handle_select(coupon)
            setTimeout(() => {
                onClose()
            }, 500)
        }
    }

    const isCouponValid = (coupon: Coupon): boolean => {
        return total_money?.discountPrice >= coupon.minimumPurchaseAmount
    }

    const slideLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -200, behavior: "smooth" })
        }
    }

    const slideRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 200, behavior: "smooth" })
        }
    }

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center ${isOpen ? "" : "pointer-events-none"}`}
        >
            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl"
            >
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <FaTag className="text-indigo-600 text-2xl" />
                        <h2 className="text-2xl font-bold text-gray-800">Available Coupons</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="relative">
                    <button
                        onClick={slideLeft}
                        className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 text-gray-600 hover:text-indigo-600 transition-all z-10"
                    >
                        <FaChevronLeft size={18} />
                    </button>
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide px-4"
                        style={{ scrollSnapType: "x mandatory" }}
                    >
                        {coupons.length > 0 ? (
                            coupons.map((coupon) => {
                                const isValid = isCouponValid(coupon)
                                const isSelected = selectedCoupon?.code === coupon.code

                                return (
                                    <motion.div
                                        key={coupon.code}
                                        whileHover={{ scale: isValid ? 1.02 : 1, y: isValid ? -5 : 0 }}
                                        whileTap={{ scale: isValid ? 0.98 : 1 }}
                                        className={`flex-shrink-0 w-72 bg-gradient-to-br rounded-2xl shadow-md overflow-hidden transition-all relative
                                            ${isValid
                                                ? 'from-gray-50 to-gray-100 cursor-pointer border border-gray-200 hover:border-indigo-300'
                                                : 'from-gray-100 to-gray-200 opacity-60 cursor-not-allowed border border-gray-300'
                                            }
                                            ${isSelected ? 'ring-2 ring-indigo-600' : ''}`}
                                        style={{ scrollSnapAlign: "start" }}
                                        onClick={() => isValid && handleCouponSelect(coupon)}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-3 right-3 bg-indigo-600 text-white p-2 rounded-full z-10">
                                                <FaCheck size={12} />
                                            </div>
                                        )}

                                        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-5">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-bold text-white bg-white bg-opacity-20 px-3 py-1 rounded-full">
                                                    {coupon.code}
                                                </h3>
                                                {isValid ? (
                                                    <div className="bg-yellow-400 text-indigo-900 text-sm font-bold px-3 py-1 rounded-full">
                                                        AVAILABLE
                                                    </div>
                                                ) : (
                                                    <div className="bg-gray-400 text-white text-sm font-bold px-3 py-1 rounded-full">
                                                        NOT ELIGIBLE
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-indigo-100 mt-3 text-sm">{coupon.description}</p>
                                        </div>
                                        <div className="p-5">
                                            <div className="text-3xl font-bold text-indigo-600 mb-3">
                                                {coupon.discountType === "percentage" ? (
                                                    `${coupon.discountValue}% OFF`
                                                ) : (
                                                    <span className="flex items-center">
                                                        <FaRupeeSign className="mr-1" />
                                                        {coupon.discountValue}
                                                        <span className="text-sm font-normal text-gray-600 ml-1">OFF</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-sm flex items-center text-gray-600">
                                                    <span className="w-24">Min. Purchase:</span>
                                                    <span className={`font-semibold ${!isValid ? 'text-red-500' : ''}`}>
                                                        ₹{coupon.minimumPurchaseAmount}
                                                    </span>
                                                </p>
                                                <p className="text-sm flex items-center text-gray-600">
                                                    <span className="w-24">Max Discount:</span>
                                                    <span className="font-semibold">₹{coupon.maxDiscountAmount}</span>
                                                </p>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <p className="text-xs text-gray-500">
                                                    Valid until: {new Date(coupon.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })
                        ) : (
                            <div className="flex items-center justify-center w-full py-8">
                                <p className="text-gray-500 text-center">No coupons available at the moment.</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={slideRight}
                        className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 text-gray-600 hover:text-indigo-600 transition-all z-10"
                    >
                        <FaChevronRight size={18} />
                    </button>
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        disabled={page === 1}
                        onClick={handlePrevPage}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                    >
                        Previous
                    </button>
                    <span className="text-gray-600 font-medium">Page {page}</span>
                    <button
                        onClick={handleNextPage}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all font-medium"
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Coupons_Slider
