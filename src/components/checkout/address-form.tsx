import { getAddress, saveAddress } from '@/_services/common/address';
import { type AddressFormData, addressSchema } from '@/lib/types/address';
import React, { useEffect, useState } from 'react'
import { RiArrowRightSLine, RiCheckFill } from 'react-icons/ri'
import { toast } from 'react-toastify';
import { ZodError } from 'zod';
import LoadingSpinner from '../LoadingSpinner';
import Image from 'next/image';
import PaymentMethod from './payment-method';

interface TypeSelectorProps {
    onChangeAddress: (type: string) => void;
    isCheckout: boolean;
    placeOrder: () => Promise<void>;
    paymentMethod: 'online' | 'offline';
    setPaymentFunction: (value: string) => void
    totalPrice: {
        discountPrice: number
        shippingTotal: number
        totalPrice: number
    }
}
export const CheckoutAddressForm = ({ onChangeAddress, isCheckout, placeOrder, paymentMethod, setPaymentFunction, totalPrice }: TypeSelectorProps) => {

    const [selectedAddress, setSelectedAddress] = useState<boolean>(true);
    const [addresslist, setAddresslist] = useState<AddressFormData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAddress = async () => {
        try {
            setIsLoading(true);
            const response: AddressFormData[] = await getAddress();
            console.log(response)
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


    const handleAddressChange = () => {
        setSelectedAddress((prev) => !prev);
    }


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<Partial<AddressFormData>>({
        addressType: 'home',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when field is modified
        if (errors[name]) {
            setErrors(prev => {
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
                    if (err.path[0] && typeof err.path[0] === "string") {
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
    }

    const changeAddress = (id: string) => {
        onChangeAddress(id)
        setAddresslist((prev) =>
            prev.map((address) =>
                address._id === id
                    ? { ...address, isDefault: true }
                    : { ...address, isDefault: false }
            )
        );
    }


    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[200px]">
                <p className="text-gray-600">Loading ...</p>
            </div>
        );
    }
    return (
        <>

            <div className="bg-white mb-4 p-4 rounded shadow-sm hidden">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-[#29bc29] text-white flex items-center justify-center text-sm">1</span>
                        <span className="ml-2 font-medium text-[#29bc29] uppercase flex">LOGIN OR SIGNUP <RiCheckFill className="h-5 w-5 ms-4" /></span>
                    </div>
                </div>
            </div>

            <div className="bg-[#E10176] p-4 hidden">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-white text-[#E10176] flex items-center justify-center text-sm">2</span>
                        <span className="ml-2 font-medium text-white uppercase max-[480px]:text-sm">Delivery Address</span>
                    </div>
                </div>
            </div>


            <div className=" bg-white px-5 py-5">
                <div className="checkout-radio flex mb-[10px] max-[480px]:flex-col">
                    <div className="radio-itens mr-[20px]" onClick={handleAddressChange}>
                        <input
                            type="radio"
                            id="address"
                            name="addres"
                            className="w-auto mr-[2px] p-[10px]"
                            checked={selectedAddress === true}
                            onChange={() => { }}
                        />
                        <label
                            htmlFor="address1"
                            className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                        >
                            Use an existing address
                        </label>
                    </div>
                    <div className="radio-itens" onClick={handleAddressChange}>
                        <input
                            type="radio"
                            id="new-address"
                            name="new-address"
                            checked={selectedAddress === false}
                            onChange={() => { }}
                            className="w-auto mr-[2px] p-[10px]"
                        />
                        <label
                            htmlFor="address2"
                            className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                        >
                            Use new address
                        </label>
                    </div>
                </div>

                {selectedAddress ? (
                    <div className="space-y-4 ">

                        {
                            addresslist.length > 0 ? (
                                <>
                                    <div className="flex flex-col space-y-4">
                                        {addresslist.map((address) => (
                                            <div
                                                onClick={() => changeAddress(address?._id)}
                                                key={address?._id}
                                                className={`py-4 max-w-full overflow-hidden border-s-4 ${address.isDefault ? 'border-lime-500' : ' border-slate-500'} `}>

                                                <div className="flex items-start justify-between space-x-4 max-[480px]:flex-col max-[480px]:space-x-0 max-[480px]:space-y-3">
                                                    {/* Address Details */}
                                                    <div className="relative text-sm text-gray-700 pl-6 cursor-pointer w-full max-w-[calc(100%-100px)]">
                                                        {address.isDefault && (
                                                            <div>
                                                                <span className='text-sm text-white bg-amber-500 px-2 rounded-lg'>Selected</span>
                                                            </div>
                                                        )}

                                                        <p className="font-medium flex items-center space-x-2  break-words">
                                                            <span>{address.fullName}</span>
                                                            <span className="bg-slate-100 px-3 py-1 rounded text-xs text-gray-600">{address.addressType}</span>
                                                            <span className="font-bold text-black">{address.mobileNumber}</span>
                                                        </p>
                                                        <p className="mt-1 text-gray-600 break-words">
                                                            {address.addressLine}, {address.city}, {address.state}, {address.postCode}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <PaymentMethod
                                        value={paymentMethod}
                                        // onChange={(value) => setPaymentMethod(value)}
                                        onChange={(value) => setPaymentFunction(value)}
                                        totalPrice={totalPrice.discountPrice || 0}
                                    />
                                    {isCheckout ? (
                                        <div className="w-full flex items-center justify-center bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[10px] px-[20px] text-[18px] font-normal text-[#fff] bg-[#000000] rounded-[5px] border-[1px] border-solid border-[#000000] mt-2">Placing Order...</div>
                                    ) : (
                                        <button
                                            onClick={placeOrder}
                                            className="w-full flex items-center justify-center bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[10px] px-[20px] text-[18px] font-normal text-[#fff] bg-[#000000] rounded-[5px] border-[1px] border-solid border-[#000000] mt-2"
                                        >
                                            Place Order &nbsp;<Image src={"/img/shape/upi_options.svg"} alt="arrow" width={40} height={40} /> <RiArrowRightSLine className="text-[20px] ml-[5px]" />
                                        </button>

                                    )}


                                </>
                            ) : (
                                <div className="flex items-center justify-center h-[200px]">
                                    <p className="text-gray-600">No address found</p>
                                </div>
                            )
                        }

                    </div>
                ) : (
                    <div className="input-box-form mt-[20px] ">
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="flex flex-wrap mx-[-12px]">
                                <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                    <div className="input-item mb-[24px]">
                                        {/* <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                            Name *
                                        </label> */}
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Name"
                                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"
                                            value={formData.fullName || ''}
                                            onChange={handleChange}
                                        />
                                        {errors.fullName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                    <div className="input-item mb-[24px]">
                                        {/* <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                            Mobile Number *
                                        </label> */}
                                        <input
                                            type="text"
                                            name="mobileNumber"
                                            placeholder="Mobile Number"
                                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"
                                            value={formData.mobileNumber || ''}
                                            onChange={handleChange}
                                        />
                                        {errors.mobileNumber && (
                                            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full px-[12px]">
                                    <div className="input-item mb-[24px]">
                                        {/* <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                            Address *
                                        </label> */}
                                        <input
                                            type="text"
                                            name="addressLine"
                                            placeholder="Address (Area and Street)"
                                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"
                                            value={formData.addressLine || ''}
                                            onChange={handleChange}
                                        />
                                        {errors.addressLine && (
                                            <p className="text-red-500 text-sm mt-1">{errors.addressLine}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                    <div className="input-item mb-[24px]">

                                        {/* <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                            City/District/Town *
                                        </label> */}
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City/District/Town"
                                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"
                                            value={formData.city || ''}
                                            onChange={handleChange}
                                        />
                                        {errors.city && (
                                            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                    <div className="input-item mb-[24px]">
                                        {/* <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                            Post Code *
                                        </label> */}
                                        <input
                                            type="text"
                                            name="postCode"
                                            placeholder="Post Code"
                                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"
                                            value={formData.postCode || ''}
                                            onChange={handleChange}
                                        />
                                        {errors.postCode && (
                                            <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                    <div className="input-item mb-[24px]">
                                        {/* <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                            Region State *
                                        </label> */}
                                        <input
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"
                                            value={formData.state || ''}
                                            onChange={handleChange}
                                        />
                                        {errors.state && (
                                            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                                        )}

                                    </div>
                                </div>

                                <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                    <div className="input-item mb-[24px]">
                                        {/* <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                            Alternate Phone (Optional) *
                                        </label> */}
                                        <input
                                            type="text"
                                            name="alternatePhone"
                                            placeholder="Alternate Phone (Optional)"
                                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"
                                            value={formData.alternatePhone || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="checkout-radio flex mb-[10px] max-[480px]:flex-col  px-[12px]">
                                    <div className="radio-itens mr-[20px]">
                                        <input
                                            type="radio"
                                            id="addressType1"
                                            name="addressType"
                                            className="w-auto mr-[2px] p-[10px]"
                                            value="home"
                                            checked={formData.addressType === 'home'}
                                            onChange={(e) => setFormData(prev => ({ ...prev, addressType: e.target.value as "home" | "work", }))}
                                        />
                                        <label
                                            htmlFor="addressType1"
                                            className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                        >
                                            Home (All day delivery)
                                        </label>
                                    </div>
                                    <div className="radio-itens">
                                        <input
                                            type="radio"
                                            id="addressType"
                                            name="addressType"
                                            className="w-auto mr-[2px] p-[10px]"
                                            value="work"
                                            checked={formData.addressType === 'work'}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, addressType: e.target.value as "home" | "work", }))}
                                        />
                                        <label
                                            htmlFor="addressType"
                                            className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                        >
                                            Work (Delivery between 10 AM - 5 PM)
                                        </label>
                                    </div>
                                    {errors.addressType && (
                                        <p className="text-red-500 text-sm">{errors.addressType}</p>
                                    )}

                                </div>

                                <div className="w-full px-[12px]">
                                    <div className="input-button">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bb-btn-2 inline-block items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                                        >
                                            {isSubmitting ? 'Saving...' : 'Save Address'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>


        </>
    )
}

