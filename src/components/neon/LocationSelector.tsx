import React from 'react';

interface LocationSelectorProps {
  isIndoor: boolean;
  onLocationChange: (isIndoor: boolean) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  isIndoor,
  onLocationChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">5. INDOOR OR OUTDOOR</h3>
      <div className="flex gap-4">
        <button
          onClick={() => onLocationChange(true)}
          className={`flex-1 p-4 rounded-lg border-2 transition-all ${
            isIndoor ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <div className="font-medium">Indoor</div>
          <div className="text-sm text-gray-500 mt-1">
            Perfect for home or business use
          </div>
        </button>
        <button
          onClick={() => onLocationChange(false)}
          className={`flex-1 p-4 rounded-lg border-2 transition-all ${
            !isIndoor ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <div className="font-medium">Outdoor</div>
          <div className="text-sm text-gray-500 mt-1">
            IP67 Waterproof rating
          </div>
        </button>
      </div>
    </div>
  );
};