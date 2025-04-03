"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaTimes, FaTag, FaRupeeSign } from "react-icons/fa"
import confetti from "canvas-confetti"

interface CouponSuccessModalProps {
    isOpen?: boolean
    onClose: () => void
    coupon?: string
    discountAmount?: string
}

const CouponSuccessModal: React.FC<CouponSuccessModalProps> = ({
    isOpen = true,
    onClose,
    coupon = "FLAT100",
    discountAmount = "200",
}) => {
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        if (isOpen && !showConfetti) {
            setShowConfetti(true)
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            })
        }
    }, [isOpen, showConfetti])


    useEffect(() => {
        setTimeout(() => {
            onClose()
        }, 3000)
    }, [isOpen])

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 20 }}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                    {/* Success Animation Container */}
                    <motion.div
                        initial={{ backgroundColor: "#4F46E5" }}

                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                        className="p-8 text-center relative"
                    >
                        {/* <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="inline-block"
            >
              <FaCheckCircle className="text-white text-7xl mx-auto" />
            </motion.div> */}

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                        >
                            <FaTimes size={24} />
                        </motion.button>
                    </motion.div>

                    {/* Content */}
                    <div className="p-8">
                        <h3 className="text-3xl font-bold text-gray-800 text-center mb-2">Woohoo! Coupon Applied!</h3>
                        <p className="text-gray-600 text-center mb-8">Your discount has been successfully applied to your order.</p>

                        {/* Coupon Details Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 mb-8 shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-indigo-100 p-2 rounded-full">
                                        <FaTag className="text-indigo-600 text-xl" />
                                    </div>
                                    <span className="font-bold text-xl text-gray-800">{coupon}</span>
                                </div>
                                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                                    Active
                                </span>
                            </div>

                            {/* Discount Amount */}
                            <div className="bg-white rounded-xl p-4 shadow-md">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Discount Applied:</span>
                                    <div className="flex items-center text-2xl font-bold text-green-600">
                                        <FaRupeeSign className="mr-1" size={20} />
                                        {parseFloat(discountAmount).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg"
                        >
                            Continue Shopping
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default CouponSuccessModal