import React, { useState } from "react";
import Image from "next/image";
import type { ImageType } from "@/lib/types";
import { FaTrash } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";

interface ImageUploadProps {
  onImagesChange: (images: ImageType[]) => void;
  images: ImageType[];
}

export function ImageUpload({ onImagesChange, images }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      await handleFiles(files);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      await handleFiles(files);
    }
  };

  const handleFiles = async (files: File[]) => {
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      public_id: Math.random().toString(36).substring(7),
      fileType: file.type,
      file: file,
    }));

    onImagesChange([...images, ...newImages]);
  };

  const removeImage = (public_id: string) => {
    onImagesChange(images.filter((img) => img.public_id !== public_id));
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? "border-primary" : "border-gray-200"
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
                accept="image/*"
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

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.public_id} className="relative group">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt="Product image"
                  fill
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
      )}
    </div>
  );
} 