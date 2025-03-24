import React from 'react';

interface SizeControlsProps {
  width: number;
  height: number;
  fontSize: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onFontSizeChange: (size: number) => void;
}

export const SizeControls: React.FC<SizeControlsProps> = ({
  // width,
  // height,
  fontSize,
  // onWidthChange,
  // onHeightChange,
  onFontSizeChange,
}) => {
  return (
    <div className="space-y-4">
      {/* <h3 className="text-xl font-semibold">4. CHOOSE SIZE</h3> */}
      <div className="space-y-6">
        {/* <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">Width</label>
            <span className="text-sm text-gray-500">{width}"</span>
          </div>
          <input
            type="range"
            min="12"
            max="48"
            value={width}
            onChange={(e) => onWidthChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div> */}
        {/* <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">Height</label>
            <span className="text-sm text-gray-500">{height}"</span>
          </div>
          <input
            type="range"
            min="6"
            max="36"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div> */}
        <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">Text Size</label>
            <span className="text-sm text-gray-500">{fontSize}px</span>
          </div>
          <input
            type="range"
            min="14"
            max="190"
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
      </div>
    </div>
  );
};