import React from 'react';

interface NeonTextProps {
  text: string;
  color: string;
  font: string;
  width: number;
  height: number;
  fontSize: number;
}

export const NeonText: React.FC<NeonTextProps> = ({ text, color, font, width, height, fontSize }) => {
  const neonStyle = {
    filter: `drop-shadow(0 0 2px ${color}) drop-shadow(0 0 4px ${color}) drop-shadow(0 0 6px ${color})`,
    color: color,
    width: `${width}px`,
    height: `${height}px`,
    fontSize: `${fontSize}px`,
  };

  return (
    <div className="relative group">
      <div 
        className={`${font} flex items-center justify-center transition-all duration-300`}
        style={neonStyle}
      >
        {text}
      </div>
      
      {/* Size Indicators */}
      <div className="absolute top-1/2 -left-8 w-8 border-t border-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-1/2 -right-8 w-8 border-t border-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -top-8 left-1/2 h-8 border-l border-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-8 left-1/2 h-8 border-l border-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Size Labels */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        {height}"
      </div>
      <div className="absolute bottom-1/2 -left-16 transform -translate-y-1/2 bg-black/75 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        {width}"
      </div>
    </div>
  );
};