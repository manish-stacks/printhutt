import { formatCurrency } from '@/helpers/helpers';
import React from 'react';

interface TypeSelectorProps {
    value: 'online' | 'offline';
    onChange: (value: 'online' | 'offline') => void;
    totalPrice: number;
}

const PaymentMethod = ({ value, onChange, totalPrice }: TypeSelectorProps) => {
    
    return (
        <>
            <div className="sub-title mb-[12px] mt-10 border-t-2 border-solid border-[#eee]">
                <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750] py-2">
                    Payment Method
                </h4>
            </div>
            
            <div className="checkout-method mb-[24px] pb-4 overflow-auto">
                {/* <span className="details font-Poppins leading-[26px] tracking-[0.02rem] text-[15px] font-medium text-[#686e7d]">
                    Please select the preferred shipping method to use on this order.
                </span> */}
                <div className="bb-del-option mt-[12px] flex max-[480px]:flex-col">
                    <div className="inner-del w-[50%] max-[480px]:w-full space-y-2">
                        <div className="radio-itens">
                            <input
                                type="radio"
                                id="online"
                                name="paymentMode"
                                className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                                value="online"
                                checked={value === 'online'}
                                onChange={(e) => onChange(e.target.value as 'online' | 'offline')}
                            />
                            <label
                                htmlFor="online"
                                className="relative pl-[26px] cursor-pointer leading-[16px] inline-block text-[#686e7d] tracking-[0]"
                            >
                                UPI, Credit/Debit Card
                            </label>
                        </div>

                        <div className="radio-itens">
                            <input
                                type="radio"
                                id="offline"
                                name="paymentMode"
                                className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                                value="offline"
                                checked={value === 'offline'}
                                onChange={(e) => onChange(e.target.value as 'online' | 'offline')}
                            />
                            <label
                                htmlFor="offline"
                                className="relative pl-[26px] cursor-pointer leading-[16px] inline-block text-[#686e7d] tracking-[0]"
                            >
                                Cash On Delivery
                            </label>
                        </div>
                    </div>
                </div>

                {/* Conditional Rendering for the table */}
                {value === 'offline' && (
                    <div className="border p-4 md:p-6 rounded-lg bg-white mt-3 ">
                        <div className="alert bg-red-100 text-red-700 p-3 rounded text-sm">
                        For Cash on Delivery (COD) orders, a partial payment is required, and processing may take 2-3 additional business days due to product handling.
                        </div>
                        <div className="my-3">
                            <h4 className="text-lg font-bold">Price Details</h4>
                        </div>
                        <div className="overflow-auto">
                            <table className="w-full text-left border-collapse border border-slate-400">
                                <tbody>
                                    <tr>
                                        <td className="py-2 text-gray-600 border border-slate-300 px-3">Total Product Price</td>
                                        <td className="py-2 font-medium text-gray-800 border border-slate-300">{formatCurrency(totalPrice)}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 text-gray-600 border border-slate-300 px-3">20% Payable before order</td>
                                        <td className="py-2 font-bold text-gray-900 border border-slate-300">
                                             {formatCurrency((totalPrice* 0.20))}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PaymentMethod;