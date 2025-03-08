import React, { useRef } from 'react';
import Draggable from "react-draggable";
interface NeonTextProps {
  text: string;
  color: string;
  font: string;
  width: number;
  height: number;
  fontSize: number;
}

export const NeonText: React.FC<NeonTextProps> = ({ text, color, font, width, height, fontSize }) => {

  function hexToRgb(hex: string): string {
    hex = hex.replace(/^#/, '');
    let r = 0, g = 0, b = 0;

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
    return `${r}, ${g}, ${b}`;
  }

  function adjustColor(colorCode: string, amount: number): string {
    let [r, g, b] = colorCode.match(/\d+/g)!.map(Number);
    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));
    return `rgb(${r}, ${g}, ${b})`;
  }

  const baseRgb = `rgb(${hexToRgb(color)})`;
  const glowColor = adjustColor(baseRgb, 40); // Slightly brightened

  const neonStyle: React.CSSProperties = {
    textShadow: `
      ${glowColor} 0px 0px 6px, 
      ${color} 0px 0px 12px, 
      ${color} 0px 0px 16px, 
      rgba(255,255,255,0.6) 0px 0px 20px
    `,
    color: color,
    // width: `${width*50}px`,
    // height: `${height*20}px`,
    fontSize: `${fontSize}px`,
    fontFamily: font,
    fontWeight: 'bold',
    whiteSpace: 'pre-line', // Supports multi-line input
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '100px',
  };
  const nodeRef = useRef(null);
  return (
    // <div className="relative w-[80%] h-[300px] bg-black mt-8 rounded-lg flex items-center justify-center overflow-hidden">
      <Draggable
        nodeRef={nodeRef}
        bounds="parent"
        defaultPosition={{ x: 0, y: 0 }}>
        <div className="relative group cursor-move" ref={nodeRef}>
          {/* Neon Text */}
          <div className="transition-all duration-300" style={neonStyle}>
            {text || 'Your Text'}
          </div>

          {/* Size Indicators */}
          <div className="absolute top-1/2 -left-8 w-8 border-t border-gray-400 opacity-100 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-1/2 -right-8 w-8 border-t border-gray-400 opacity-100 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -top-8 left-1/2 h-8 border-l border-gray-400 opacity-100 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -bottom-8 left-1/2 h-8 border-l border-gray-400 opacity-100 group-hover:opacity-100 transition-opacity" />

          {/* Size Labels */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-2 py-1 rounded text-sm opacity-100 group-hover:opacity-100 transition-opacity">
            {width}"
          </div>
          <div className="absolute bottom-[38%] -left-20 transform -translate-y-1/2 bg-black/75 text-white px-2 py-1 rounded text-sm opacity-100 group-hover:opacity-100 transition-opacity">
            {height}"
          </div>
        </div>
      </Draggable>
    // </div >
  );
};
