import React, { useState } from 'react'
import { RiCheckFill } from 'react-icons/ri'

export const CheckoutAddressForm = () => {

    const [selectedAddress, setSelectedAddress] = useState<boolean>(true);

    // const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // setSelectedAddress(event.target.value === 'existing'); 
    //     console.log(event.target.name)
    //     event.target.name === 'address' ? setSelectedAddress(true) : setSelectedAddress(false);
    // };
    const handleAddressChange = () => {
        setSelectedAddress((prev) => !prev);
    }

    return (
        <>
            <div className="min-[992px]:w-[66.66%] w-full px-[12px] mb-[24px]">
                <div
                    className="bb-checkout-contact border-[1px] border-solid border-[#eee] p-[20px] bg-[#f1f3f6]"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={400}
                >

                    <div className="bg-white mb-4 p-4 rounded shadow-sm">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <span className="w-8 h-8 rounded-full bg-[#29bc29] text-white flex items-center justify-center text-sm">1</span>
                                <span className="ml-2 font-medium text-[#29bc29] uppercase flex">LOGIN OR SIGNUP <RiCheckFill className="h-5 w-5 ms-4" /></span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#E10176] p-4">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <span className="w-8 h-8 rounded-full bg-white text-[#E10176] flex items-center justify-center text-sm">2</span>
                                <span className="ml-2 font-medium text-white uppercase">Delivery Address</span>
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
                                    onChange={()=>{}}
                                />
                                <label
                                    htmlFor="address1"
                                    className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                >
                                    I want to use an existing address
                                </label>
                            </div>
                            <div className="radio-itens" onClick={handleAddressChange}>
                                <input
                                    type="radio"
                                    id="new-address"
                                    name="new-address"
                                    checked={selectedAddress === false}
                                    onChange={()=>{}}
                                    className="w-auto mr-[2px] p-[10px]"
                                />
                                <label
                                    htmlFor="address2"
                                    className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                >
                                    I want to use new address
                                </label>
                            </div>
                        </div>

                        {selectedAddress === true && (


                            <div className="space-y-4 ">
                                <div className="py-4 max-w-full overflow-hidden border-s-4 border-lime-500">
                                    <div className="flex items-start justify-between space-x-4 max-[480px]:flex-col max-[480px]:space-x-0 max-[480px]:space-y-3">
                                        {/* Address Details */}
                                        <div className="relative text-sm text-gray-700 pl-6 cursor-pointer w-full max-w-[calc(100%-100px)]">
                                            <div>
                                                <span className='text-sm text-white bg-amber-500 px-2 rounded-lg'>Selected</span>
                                            </div>
                                            <p className="font-medium flex items-center space-x-2  break-words">
                                                <span>Manish Kumar</span>
                                                <span className="bg-slate-100 px-3 py-1 rounded text-xs text-gray-600">Home</span>
                                                <span className="font-bold text-black">6200027897</span>
                                            </p>
                                            <p className="mt-1 text-gray-600 break-words">
                                                82A, Gali Number 11, C-Block, Saroop Vihar, New Delhi, Delhi
                                            </p>
                                        </div>

                                        {/* Edit Button */}
                                        <div className="ml-auto flex items-center w-full max-w-[100px] justify-end">
                                            <a
                                                href="#"
                                                className="text-blue-500 font-semibold uppercase hover:text-blue-700 transition-colors duration-200"
                                            >
                                                Edit
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        )}
                        {selectedAddress === false && (
                            <div className="input-box-form mt-[20px] ">
                                <form method="post">
                                    <div className="flex flex-wrap mx-[-12px]">
                                        <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                            <div className="input-item mb-[24px]">
                                                <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                                    Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter your Name"
                                                    className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                                                />
                                            </div>
                                        </div>
                                        <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                            <div className="input-item mb-[24px]">
                                                <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                                    Mobile Number *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter your Mobile Number"
                                                    className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                                                />
                                            </div>
                                        </div>
                                        <div className="w-full px-[12px]">
                                            <div className="input-item mb-[24px]">
                                                <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                                    Address *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Address (Area and Street)"
                                                    className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                                                />
                                            </div>
                                        </div>
                                        <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                            <div className="input-item mb-[24px]">

                                                <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                                    City/District/Town *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="City/District/Town"
                                                    className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                                                />
                                            </div>
                                        </div>
                                        <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                            <div className="input-item mb-[24px]">
                                                <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                                    Post Code *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Post Code"
                                                    className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                                                />
                                            </div>
                                        </div>

                                        <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                            <div className="input-item mb-[24px]">
                                                <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                                    Region State *
                                                </label>
                                                <div className="custom-select p-[10px] border-[1px] border-solid border-[#eee] leading-[26px] rounded-[10px]">
                                                    <select>
                                                        <option value="option1">Region/State</option>
                                                        <option value="option1">Region/State 1</option>
                                                        <option value="option2">Region/State 2</option>
                                                        <option value="option3">Region/State 3</option>
                                                        <option value="option4">Region/State 4</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="min-[992px]:w-[50%] w-full px-[12px]">
                                            <div className="input-item mb-[24px]">
                                                <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                                    Alternate Phone (Optional) *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Alternate Phone (Optional)"
                                                    className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"
                                                />
                                            </div>
                                        </div>

                                        <div className="checkout-radio flex mb-[10px] max-[480px]:flex-col  px-[12px]">
                                            <div className="radio-itens mr-[20px]">
                                                <input
                                                    type="radio"
                                                    id="address1"
                                                    name="addressd"
                                                    className="w-auto mr-[2px] p-[10px]"

                                                />
                                                <label
                                                    htmlFor="address1"
                                                    className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                                >
                                                    Home (All day delivery)
                                                </label>
                                            </div>
                                            <div className="radio-itens">
                                                <input
                                                    type="radio"
                                                    id="address2"
                                                    name="addressd"
                                                    className="w-auto mr-[2px] p-[10px]"
                                                />
                                                <label
                                                    htmlFor="address2"
                                                    className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                                >
                                                    Work (Delivery between 10 AM - 5 PM)
                                                </label>
                                            </div>
                                        </div>

                                        <div className="w-full px-[12px]">
                                            <div className="input-button">
                                                <button
                                                    type="button"
                                                    className="bb-btn-2 inline-block items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                                                >
                                                    Place Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

