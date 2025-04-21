import { formatCurrency } from '@/helpers/helpers';
import Image from 'next/image';
import React from 'react';
import { BiCreditCard } from 'react-icons/bi';
import { BsQrCode } from 'react-icons/bs';
import { FaTruck } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri';

interface TypeSelectorProps {
    value: 'online' | 'offline';
    onChange: (value: 'online' | 'offline') => void;
    totalPrice: number;
}

interface PaymentOption {
    id: string;
    title: string;
    icon: React.ReactNode;
    discount?: string;
    basePrice: number;
    finalPrice: string | number;
    additionalFee?: number;
}

const PaymentMethod = ({ value, onChange, totalPrice }: TypeSelectorProps) => {
    const paymentOptions: PaymentOption[] = [
        {
            id: 'upi',
            title: 'Pay using UPI',
            icon: <BsQrCode className="w-6 h-6" />,
            discount: '',
            basePrice: 3600,
            finalPrice: formatCurrency(totalPrice)
        },
        {
            id: 'cards',
            title: 'Cards',
            icon: <BiCreditCard className="w-6 h-6" />,
            discount: '',
            basePrice: 3600,
            finalPrice: formatCurrency(totalPrice)
        },
        {
            id: 'netbanking',
            title: 'Netbanking',
            icon: <RiBankLine className="w-6 h-6" />,
            discount: '',
            basePrice: 3600,
            finalPrice: formatCurrency(totalPrice)
        },
        {
            id: 'cod',
            title: 'Cash on delivery',
            icon: <FaTruck className="w-6 h-6" />,
            additionalFee: 49,
            basePrice: 3600,
            finalPrice: formatCurrency((totalPrice * 0.20)),
        }
    ];
    const [selectedOption, setSelectedOption] = React.useState<string>('upi');

    return (
        <div className="bg-white ">
        
            <div className="flex items-center justify-between cursor-pointer bg-gray-100 p-3 rounded-t-lg">
                <div className="flex items-center gap-2">
                    <RiBankLine size={24} className='text-orange-600' />
                    <h3 className="text-lg font-medium text-gray-800">Choose Payment Method</h3>
                </div>
            </div>


            <div className="grid gap-2 mt-2">
                {paymentOptions.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => {
                            setSelectedOption(option.id);
                            onChange(option.additionalFee ? 'offline' : 'online');
                        }}
                        className={`
                            relative rounded-xl transition-all duration-200 
                            ${selectedOption === option.id
                                ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                                : 'border-2 border-gray-100 hover:border-blue-200 hover:shadow-md'
                            }
                        `}
                    >
                        <div className="flex items-center p-2 cursor-pointer">
                            <div className={`
                                p-1 rounded-lg mr-4
                                ${selectedOption === option.id ? 'bg-blue-100' : 'bg-gray-50'}
                            `}>
                                {option.icon}
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {option.title}
                                </h3>
                                {!option.additionalFee && (
                                    <div className="flex items-center mt-1">
                                        {option.title === 'Pay using UPI' && (
                                            <Image
                                                src="/img/shape/upi_options.svg"
                                                alt="upi"
                                                width={60}
                                                height={24}
                                                className="mr-2"
                                            />
                                        )}
                                        <span className="text-green-600 font-medium">
                                            Pay {option.finalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                                {option.additionalFee && (
                                    <div className="mt-1">
                                        <span className="text-gray-600">20% partial payment</span>
                                        <span className="block text-green-600 font-medium mt-1">
                                            Pay {option.finalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className={`
                                ml-4 rounded-full p-2
                                ${selectedOption === option.id ? 'text-blue-500' : 'text-gray-400'}
                            `}>
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {selectedOption === option.id ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    )}
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentMethod;