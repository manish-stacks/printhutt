import { previewImages } from '@/app/product/neon/_data/preview-images';
import React from 'react';
// import { previewImages } from '../data/preview-images';

interface PreviewGalleryProps {
  selectedPreview: number;
  onPreviewChange: (id: number) => void;
}

export const PreviewGallery: React.FC<PreviewGalleryProps> = ({
  selectedPreview,
  onPreviewChange,
}) => {
  return (
    <div className="absolute bottom-[2.25rem] left-[35%]  transform -translate-x-[35%] bg-black/50 p-2 rounded-lg max-w-full overflow-x-auto hidden md:block lg:block">
      <div className="flex space-x-2 min-w-max px-2">
        {previewImages.map((image) => (
          <button
            key={image.id}
            onClick={() => onPreviewChange(image.id)}
            className="relative group"
          >
            <div className={`w-20 h-20 rounded-lg overflow-hidden transition-all duration-200
              ${selectedPreview === image.id ? 'ring-2 ring-blue-500 scale-105' : 'opacity-75 hover:opacity-100'}`}>
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {selectedPreview === image.id && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Active
                </div>
              )}
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/75 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {image.alt}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};