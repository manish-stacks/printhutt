import { ReturnPolicy } from '@/lib/types';
import { ChangeEvent, FormEvent } from 'react';
import { RiLoader2Line } from 'react-icons/ri';


interface ReturnPolicyFormProps {
    formData: Partial<ReturnPolicy>;
    isSubmitting: boolean;
    onSubmit: (e: FormEvent) => void;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onClose: () => void;
    mode: 'add' | 'edit';
}

export function ReturnPolicyForm({
    formData,
    isSubmitting,
    onSubmit,
    onChange,
    onClose,
    mode
}: ReturnPolicyFormProps) {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative p-4 w-full max-w-4xl max-h-full">
                <div className="px-3 relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {mode === 'add' ? 'Add Return Policy' : 'Edit Return Policy'}
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
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Return Period
                                </label>
                                <input
                                    type="text"
                                    name="returnPeriod"
                                    value={formData.returnPeriod || ''}
                                    onChange={onChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="e.g., 30 days"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Restocking Fee (%)
                                </label>
                                <input
                                    type="number"
                                    name="restockingFee"
                                    value={formData.restockingFee || ''}
                                    onChange={onChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Enter restocking fee percentage"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Policy Details
                                </label>
                                <textarea
                                    name="policyDetails"
                                    value={formData.policyDetails || ''}
                                    onChange={onChange}
                                    rows={4}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Enter detailed return policy information"
                                />
                            </div>

                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                                disabled={isSubmitting}
                            >
                                {isSubmitting && (
                                    <RiLoader2Line className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}