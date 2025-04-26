'use client';

import { ISlider } from '@/lib/types';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import { RiLoader2Line } from 'react-icons/ri';
import Select from 'react-select';

interface SliderFormProps {
  formData: Partial<ISlider>;
  isSubmitting: boolean;
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClose: () => void;
  mode: 'add' | 'edit';
}

export function SliderForm({
  formData,
  isSubmitting,
  onSubmit,
  onChange,
  onClose,
  mode
}: SliderFormProps) {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    formData.slider = file;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const options = [
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' }
  ];

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        <div className="px-3 relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              {mode === 'add' ? 'Add Slider' : 'Edit Slider'}
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
            <form onSubmit={onSubmit} className="space-y-4" encType='multipart/form-data'>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter slider title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">  Image Size Should Be 1900 x 550.</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {image ? (
                      <Image  width={200} height={200} src={image} alt="Preview" className="mx-auto max-w-full rounded-md w-100 h-40" />
                    ) : (
                      <div className="mx-auto h-100 w-32 flex items-center justify-center rounded-lg bg-gray-50">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                    <div className="mt-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Upload Image
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Link
                </label>
                <input
                  type="text"
                  name="link"
                  value={formData.link || ''}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter slider link"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Level
                  </label>
                  <input
                    type="number"
                    name="level"
                    value={formData.level || ''}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Status
                  </label>
                  <Select
                    name="isActive"
                    value={options.find(option => option.value === formData.isActive)}
                    options={options}
                    onChange={(selectedOption) => {
                      onChange({
                        target: {
                          name: 'isActive',
                          value: selectedOption?.value || ''
                        }
                      } );
                    }}
                    className="basic-single"
                    classNamePrefix="select"
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