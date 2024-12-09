import type { ShippingInformation } from '@/lib/types';
import { ChangeEvent, FormEvent } from 'react';
import { RiLoader2Line } from 'react-icons/ri';


interface WarrantyFormProps {
    formData: Partial<ShippingInformation>;
    isSubmitting: boolean;
    onSubmit: (e: FormEvent) => void;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onClose: () => void;
    mode: 'add' | 'edit';
}

export function ShippingForm({ formData, isSubmitting, onSubmit, onChange, onClose, mode }: WarrantyFormProps) {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative p-4 w-full max-w-4xl max-h-full">
                <div className="px-3 relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {mode === 'add' ? 'Add Warranty' : 'Edit Warranty'}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            x
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <form onSubmit={onSubmit} className="mx-auto space-y-5 max-w-4xl">


                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Coverage
                                </label>
                                <textarea
                                    id="shippingMethod"
                                    name="shippingMethod"
                                    value={formData.shippingMethod || ''}
                                    onChange={onChange}
                                    rows={2}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Standard Shipping"
                                />
                            </div>

                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Shipping Fee
                                </label>
                                <input
                                    type="number"
                                    id="shippingFee"
                                    name="shippingFee"
                                    value={formData.shippingFee || ''}
                                    onChange={onChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Warranty duration in months"
                                />
                            </div>

                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Claim Process
                                </label>
                                <textarea
                                    id="shippingTime"
                                    name="shippingTime"
                                    value={formData.shippingTime || ''}
                                    onChange={onChange}
                                    rows={3}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="3-5 business days"
                                />
                            </div>

                            <div className="w-full">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                >
                                    {isSubmitting && (
                                        <RiLoader2Line className="mr-2 h-4 w-4 animate-spin inline" />
                                    )}
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}