"use client"
import { userService } from '@/_services/common/userService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUserStore } from '@/store/useUserStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ProfileSettings = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const logoutStore = useUserStore((state) => state.logout);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        number: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.post('/api/auth/me');
                setFormData({
                    email: data.user.email,
                    number: data.user.number,
                    password: '',
                    confirmPassword: '',
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await userService.updateProfile(formData);
            console.log(response);
            await logoutStore();
            window.localStorage.removeItem('user-store');
            window.location.reload();

            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update address");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <>
            <div className="max-w-10xl mx-auto lg:px-10 py-20">
                <div className="w-full md:w-12/12 lg:w-12/12 mb-5">
                    <div className="bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                            <p className="text-gray-600">Manage your profile settings</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white px-5 py-10">
                    <form className="space-y-6" method="post" onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" onChange={handleChange} name="email" value={formData.email} id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" onChange={handleChange} name="password" value={formData.password} id="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input type="password" onChange={handleChange} name="confirmPassword" value={formData.confirmPassword} id="confirm-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="w-full px-[12px]">
                            <div className="input-button">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bb-btn-2 inline-block items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Address'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    {/* Additional content can go here */}
                </div>
            </div>
        </>
    )
}

export default ProfileSettings