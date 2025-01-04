import { ChangeEvent, FormEvent } from 'react';
import { RiLoader2Line } from 'react-icons/ri';
import type { Offer } from '@/lib/types/offer';


interface OfferFormProps {
  formData: Partial<Offer>;
  isSubmitting: boolean;
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClose: () => void;
  mode: 'add' | 'edit';
}

export function OfferForm({
  formData,
  isSubmitting,
  onSubmit,
  onChange,
  onClose,
  mode
}: OfferFormProps) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        <div className="px-3 relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              {mode === 'add' ? 'Add Offer' : 'Edit Offer'}
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
                  Offer Title
                </label>
                <input
                  type="text"
                  name="offerTitle"
                  value={formData.offerTitle || ''}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter offer title"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea
                  name="offerDescription"
                  value={formData.offerDescription || ''}
                  onChange={onChange}
                  rows={3}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter offer description"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage || ''}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter discount percentage"
                  min="0"
                  max="100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Valid From
                  </label>
                  <input
                    type="datetime-local"
                    name="validFrom"
                    value={formData.validFrom || ''}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Valid To
                  </label>
                  <input
                    type="datetime-local"
                    name="validTo"
                    value={formData.validTo || ''}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
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