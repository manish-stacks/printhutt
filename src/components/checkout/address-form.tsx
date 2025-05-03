import { getAddress, saveAddress } from '@/_services/common/address';
import { type AddressFormData, addressSchema } from '@/lib/types/address';
import React, { useEffect, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';
import Image from 'next/image';
import PaymentMethod from './payment-method';
import { FaMap } from 'react-icons/fa';

interface TypeSelectorProps {
    onChangeAddress: (type: string) => void;
    isCheckout: boolean;
    placeOrder: () => Promise<void>;
    paymentMethod: 'online' | 'offline';
    setPaymentFunction: (value: string) => void;
    totalPrice: {
        discountPrice: number;
        shippingTotal: number;
        totalPrice: number;
    };
}
export const CheckoutAddressForm = ({ onChangeAddress, isCheckout, placeOrder, paymentMethod, setPaymentFunction, totalPrice }: TypeSelectorProps) => {
    const [selectedAddress, setSelectedAddress] = useState<boolean>(true);
    const [addresslist, setAddresslist] = useState<AddressFormData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<Partial<AddressFormData>>({
        addressType: 'home',
    });

    const fetchAddress = async () => {
        try {
            setIsLoading(true);
            const response: AddressFormData[] = await getAddress();
            if (response.addresses.length > 0) {
                setSelectedAddress(true);
                setAddresslist(response.addresses);
                const defaultAddress = response.addresses.find((address) => address.isDefault);
                if (defaultAddress) {
                    onChangeAddress(defaultAddress._id);
                }
            } else {
                setSelectedAddress(false);
                setAddresslist([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const validatedData = addressSchema.parse(formData);
            await saveAddress(validatedData);
            toast.success('Address saved successfully');
            fetchAddress();
            setSelectedAddress(true);
        } catch (error) {
            if (error instanceof ZodError) {
                const formErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path[0] && typeof err.path[0] === 'string') {
                        formErrors[err.path[0]] = err.message;
                    }
                });
                setErrors(formErrors);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const changeAddress = (id: string) => {
        onChangeAddress(id);
        setAddresslist((prev) =>
            prev.map((address) =>
                address._id === id
                    ? { ...address, isDefault: true }
                    : { ...address, isDefault: false }
            )
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[200px]">
                <p className="text-gray-600">Loading ...</p>
            </div>
        );
    }

    if (isCheckout) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            
            <div className="flex items-center justify-between cursor-pointer bg-gray-100 p-3 rounded-t-lg">
                <div className="flex items-center gap-2">
                    <FaMap size={24} className='text-orange-600' />
                    <h3 className="text-lg font-medium text-gray-800">Delivery Address</h3>
                </div>
            </div>

            {/* Address Selection Toggle */}
            <div className="bg-white rounded-xl shadow-sm my-2">
                <div className="flex space-x-6 mb-6">
                    <button
                        onClick={() => setSelectedAddress(true)}
                        className={`flex-1 py-3 px-4 rounded-lg transition-all ${selectedAddress
                                ? 'bg-indigo-400 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Saved Addresses
                    </button>
                    <button
                        onClick={() => setSelectedAddress(false)}
                        className={`flex-1 py-3 px-4 rounded-lg transition-all ${!selectedAddress
                                ? 'bg-indigo-400 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Add New Address
                    </button>
                </div>

                {selectedAddress ? (
                    <div className="space-y-4">
                        {addresslist.length > 0 ? (
                            addresslist.map((address) => (
                                <div
                                    key={address._id}
                                    onClick={() => changeAddress(address._id)}
                                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${address.isDefault
                                            ? 'border-indigo-500 bg-indigo-50'
                                            : 'border-gray-200 hover:border-indigo-300'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h3 className="font-medium">{address.fullName}</h3>
                                                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                                    {address.addressType.toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm">
                                                {address.addressLine} {address.city}, {address.state} - {address.postCode}
                                            </p>
                                            <p className="text-gray-600 text-sm mt-2">📱 {address.mobileNumber}</p>
                                        </div>
                                        {address.isDefault && (
                                            <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                                                Selected
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No saved addresses found</p>
                            </div>
                        )}

                        <PaymentMethod
                            value={paymentMethod}
                            onChange={(value) => setPaymentFunction(value)}
                            totalPrice={totalPrice.discountPrice || 0}
                        />

                        <button
                            onClick={placeOrder}
                            disabled={isCheckout}
                            className={`w-full flex items-center justify-center bb-btn-2 transition-all duration-300 ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[10px] px-[20px] text-[18px] font-normal text-[#fff] bg-[#000000] rounded-[5px] border border-solid border-[#000000] mt-2 ${isCheckout ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isCheckout ? (
                                'Placing Order...'
                            ) : (
                                <>
                                    Place Order&nbsp;
                                    <Image src="/img/shape/upi_options.svg" alt="upi" width={40} height={40} />
                                    <RiArrowRightSLine className="text-[20px] ml-[5px]" />
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                    value={formData.fullName || ''}
                                    onChange={handleChange}
                                />
                                {errors.fullName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    placeholder="Mobile Number"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                    value={formData.mobileNumber || ''}
                                    onChange={handleChange}
                                />
                                {errors.mobileNumber && (
                                    <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="addressLine"
                                    placeholder="Address (Area and Street)"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                    value={formData.addressLine || ''}
                                    onChange={handleChange}
                                />
                                {errors.addressLine && (
                                    <p className="mt-1 text-sm text-red-500">{errors.addressLine}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City/District/Town"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                    value={formData.city || ''}
                                    onChange={handleChange}
                                />
                                {errors.city && (
                                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="postCode"
                                    placeholder="Post Code"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                    value={formData.postCode || ''}
                                    onChange={handleChange}
                                />
                                {errors.postCode && (
                                    <p className="mt-1 text-sm text-red-500">{errors.postCode}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                    value={formData.state || ''}
                                    onChange={handleChange}
                                />
                                {errors.state && (
                                    <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="alternatePhone"
                                    placeholder="Alternate Phone (Optional)"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                    value={formData.alternatePhone || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-span-full hidden">
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="addressType"
                                            value="home"
                                            checked={formData.addressType === 'home'}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    addressType: e.target.value as 'home' | 'work',
                                                }))
                                            }
                                            className="form-radio h-5 w-5 text-indigo-600"
                                        />
                                        <span>Home (All day delivery)</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="addressType"
                                            value="work"
                                            checked={formData.addressType === 'work'}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    addressType: e.target.value as 'home' | 'work',
                                                }))
                                            }
                                            className="form-radio h-5 w-5 text-indigo-600"
                                        />
                                        <span>Work (Delivery between 10 AM - 5 PM)</span>
                                    </label>
                                </div>
                                {errors.addressType && (
                                    <p className="mt-1 text-sm text-red-500">{errors.addressType}</p>
                                )}
                            </div>
                            <div className="col-span-full">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Address'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

