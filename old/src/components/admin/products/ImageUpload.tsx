import React, { useState } from 'react';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { RiImageAddFill, RiLoader2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { removeProductImage } from '@/_services/admin/product';


interface ImageType {
  url: string;
  public_id: string;
  fileType: string;
  file?: File;
}

interface ImageUploadProps {
  onImagesChange: (images: ImageType[]) => void;
  images: ImageType[];
  productId: string;
}

export function ImageUpload({ onImagesChange, images, productId }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error('File type not supported. Please upload JPG, PNG, or GIF images.');
      return false;
    }

    if (file.size > maxSize) {
      toast.error('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const processFiles = async (files: File[]) => {
    const maxImages = 10;
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const validFiles = files.filter(validateFile);

    const newImages = validFiles.map((file) => ({
      url: URL.createObjectURL(file),
      public_id: Math.random().toString(36).substring(7),
      fileType: file.type,
      file: file,
    }));

    onImagesChange([...images, ...newImages]);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      await processFiles(files);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      await processFiles(files);
    }
  };

  const removeImage = async (public_id: string) => {
    const imageToRemove = images.find(img => img.public_id === public_id);
    
    if (imageToRemove?.url && productId) {
      try {
        setLoading(true)
        const data: { success: boolean; message: string } = await removeProductImage(productId, imageToRemove);
        if (data.success) {
          toast(data.message)
        }
      } finally {
        setLoading(false)
      }

      URL.revokeObjectURL(imageToRemove.url);
    }
    onImagesChange(images.filter((img) => img.public_id !== public_id));
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? "border-primary" : "border-gray-200"
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="mx-auto flex flex-col items-center">
          <RiImageAddFill className="h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="image-upload" className="cursor-pointer">
              <span className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                Upload Images
              </span>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Drop your images here or click to upload
          </p>
        </div>
      </div>
      {
        loading ? (
          <div className='flex justify-center text-center'>
            <RiLoader2Line className="mr-2 h-12 w-12 animate-spin" />
          </div>
        ) : (

          images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.public_id} className="relative group">
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src={image.url}
                      alt="Product image"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(image.public_id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove image"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )

        )

      }

    </div>
  );
}