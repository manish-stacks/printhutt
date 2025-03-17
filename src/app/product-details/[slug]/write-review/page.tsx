"use client";
import React, { useEffect, useState } from 'react';
import { BiCamera, BiHelpCircle, BiMessageSquare, BiStar, BiX } from 'react-icons/bi';
import { BsShieldCheck } from 'react-icons/bs';
import { notFound, useParams, useRouter } from 'next/navigation';
import { get_product_by_slug } from '@/_services/admin/product';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';
import { commonApi } from '@/_services/common/common';
import { RiShieldCheckLine } from 'react-icons/ri';
import confetti from 'canvas-confetti';
import { useUserStore } from '@/store/useUserStore';



export default function RatingsReviews() {

    const [hasPurchased, setHasPurchased] = useState(true);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const params = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadImage, setUploadImage] = useState([])
    const [showModal, setShowModal] = useState(false);
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const router = useRouter();

    // console.log(isLoggedIn);
    useEffect(() => {
        if (!params?.slug) {
            return notFound();
        }
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [params, isLoggedIn]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const product = await get_product_by_slug(params?.slug);
            const orderCheck = await commonApi.checkProductOrder(params?.slug);
            console.log(orderCheck);

            if (!orderCheck.reviewExists) {
                setHasPurchased(false);
            }
            if (!product) {
                return notFound();
            }
            setProduct(product);
            // console.lo(product)
        } catch (error) {
            console.error('Error fetching product:', error);
            notFound();
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (params?.slug) {
            fetchOrder();
        }
    }, [params]);


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
        setSelectedImages(prev => [...prev, ...newImages]);

        const newFiles = Array.from(e.target.files); // Convert FileList to an array
        setUploadImage(prev => {
            const existingFileNames = prev.map(file => file.name);
            const filteredFiles = newFiles.filter(file => !existingFileNames.includes(file.name)); // Prevent duplicates

            return [...prev, ...filteredFiles];
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            setSubmitError('Please select a rating');
            return;
        }

        if (reviewText.trim().length < 10) {
            setSubmitError('Please write a review with at least 10 characters');
            return;
        }

        if (selectedImages.length > 4) {
            setSubmitError('You can upload maximum 4 images');
            return
        }
        setIsSubmitting(true);
        setSubmitError('');
        try {
            const formData = new FormData();
            formData.append('rating', rating.toString());
            formData.append('review', reviewText);
            formData.append('productId', product._id);
            uploadImage.forEach((image) => {
                formData.append(`images`, image);
            })


            const response = await commonApi.postReviews(formData);
            console.log(response);
            if (response.success) {
                setSubmitSuccess(true);
                setShowModal(true);
            }
        } catch (error) {
            setSubmitError('Failed to submit review. Please try again later.');
            console.error('Error submitting review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    const resetForm = () => {
        setRating(0);
        setReviewText('');
        setSelectedImages([]);
        setSubmitSuccess(false);
        setShowModal(false);
    };

    if (showModal) {
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        confetti({
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: { y: 0.6 }
        });

    }
    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div className="min-h-screen bg-gray-50 pt-3">
            <section className="bg-white shadow-sm ">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Ratings & Reviews</h1>
                    <div className="flex items-center space-x-4">
                        <Link href={`/product-details/${product?.slug}`} className="text-lg font-medium text-gray-900">{product?.title?.slice(0, 28)}...</Link>
                        <img
                            src={product?.thumbnail?.url}
                            alt="Product"
                            className="rounded-lg h-12 w-12 object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">What makes a good review</h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <BiStar className="h-5 w-5 text-yellow-400 mt-1 mr-3" />
                                    <p className="text-sm text-gray-600">Share your honest experience with the product</p>
                                </div>
                                <div className="flex items-start">
                                    <BiMessageSquare className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                                    <p className="text-sm text-gray-600">Include specific details about features and usage</p>
                                </div>
                                <div className="flex items-start">
                                    <BsShieldCheck className="h-5 w-5 text-green-500 mt-1 mr-3" />
                                    <p className="text-sm text-gray-600">Keep it respectful and constructive</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-7">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Why review a product?</h2>
                            <p className="text-sm text-gray-600">Your valuable feedback helps other shoppers make informed decisions and helps improve products.</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2">
                        {hasPurchased ? (
                            <div className="bg-white rounded-lg shadow p-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Write Your Review</h2>

                                {submitSuccess ? (
                                    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                                        <p className="text-green-700">Thank you! Your review has been submitted successfully.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {submitError && (
                                            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                                <p className="text-red-700">{submitError}</p>
                                            </div>
                                        )}

                                        {/* Rating */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
                                            <div className="flex space-x-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className="focus:outline-none"
                                                    >
                                                        <BiStar
                                                            className={`h-8 w-8 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                                }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Review Text */}
                                        <div>
                                            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Review
                                            </label>
                                            <textarea
                                                id="review"
                                                rows={4}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="Share your experience with this product..."
                                                value={reviewText}
                                                onChange={(e) => setReviewText(e.target.value)}
                                            />
                                        </div>

                                        {/* Image Upload */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Add Photos
                                            </label>
                                            <div className="grid grid-cols-6 gap-4 mb-4">
                                                {selectedImages.map((img, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={img}
                                                            alt={`Upload ${index + 1}`}
                                                            className="h-24 w-24 object-cover rounded-lg"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                                {selectedImages.length < 4 && (
                                                    <label className="h-24 w-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            multiple
                                                        />
                                                        <BiCamera className="h-8 w-8 text-gray-400" />
                                                    </label>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                You can upload up to 4 images. Supported formats: JPG, PNG
                                            </p>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <img
                                    src="https://res.cloudinary.com/dkprths9f/image/upload/v1742025289/flat-never-leave-your-pet_23-2148521875_tc1gmz.avif"
                                    alt="Review illustration"
                                    className="mx-auto mb-6 rounded-lg h-52 w-52 object-cover"
                                />
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Haven't purchased this product?</h2>
                                <p className="text-gray-600 mb-6">
                                    Sorry! You are not allowed to review this product since you haven't bought it yet.
                                </p>
                                <div className="inline-flex items-center text-sm text-blue-600">
                                    <BiHelpCircle className="h-4 w-4 mr-2" />
                                    <a href="#" className="hover:text-blue-800">Need help? Contact support</a>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 bg-blue-50 rounded-lg p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <BiHelpCircle className="h-5 w-5 text-blue-400" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">How to write a helpful review</h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Focus on your personal experience</li>
                                            <li>Be specific about pros and cons</li>
                                            <li>Include photos if possible</li>
                                            <li>Keep it honest and unbiased</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
                        <button
                            onClick={() => resetForm()}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <BiX className="h-6 w-6" />
                        </button>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <RiShieldCheckLine className="h-8 w-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                            <p className="text-gray-600 mb-6">
                                Your review has been submitted successfully. We appreciate your feedback!
                            </p>
                            <button
                                onClick={() => resetForm()}
                                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>


    );
}

