import React, { useRef } from 'react';
import Draggable from "react-draggable";
interface NeonTextProps {
  text: string;
  color: string;
  font: string;
  width: number;
  height: number;
  fontSize: number;
  textAlignment: string;
}

export const NeonText: React.FC<NeonTextProps> = ({ text, color, font, width, height, fontSize, textAlignment }) => {

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

  function adjustColor(colorCode: string, factor: number): string {
    let [r, g, b] = colorCode.match(/\d+/g)!.map(Number);
    r = Math.max(0, Math.floor(r * factor));
    g = Math.max(0, Math.floor(g * factor));
    b = Math.max(0, Math.floor(b * factor));
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Example usage
  const baseRgb = `rgb(${hexToRgb(color)})`;
  const darkColor = adjustColor(baseRgb, 0.7);

  const neonStyle: React.CSSProperties = {
    textShadow: `${darkColor} 0px 0px 3px, rgba(0, 0, 0,0.3) 1px 1px 1px, ${color} 0px 0px 6px, ${color} 0px 0px 10px, ${color} 0px 0px 13px, ${color} 0px 0px 16px, ${color} 0px 0px 20px, ${color} 0px 0px 24px, ${color} 0px 0px 28px, ${color} 0px 0px 32px, ${color} 0px 0px 40px`,
    color: '#fff',
    fontSize: `${fontSize}px`,
    fontFamily: font,
    // width: `${width+100}px`,
    // height: `${height*10}px`,
    fontWeight: 'bold',
    whiteSpace: 'pre-line',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '120px',
    padding: '30px 60px',
    textAlignLast: textAlignment,
  };

  const nodeRef = useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      defaultPosition={{ x: 0, y: 0 }}>
      <div className="relative group cursor-move" ref={nodeRef}>
        <div className="transition-all duration-300 max-[567px]:!text-lg" style={neonStyle}>
          {text || 'Your Text'}
        </div>
        <div className="absolute top-1/2 -left-8 w-8 border-t border-gray-400 opacity-100 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-1/2 -right-8 w-8 border-t border-gray-400 opacity-100 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -top-8 left-1/2 h-8 border-l border-gray-400 opacity-100 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -bottom-8 left-1/2 h-8 border-l border-gray-400 opacity-100 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-2 py-1 rounded text-sm opacity-100 group-hover:opacity-100 transition-opacity">
          {width}"
        </div>
        <div className="absolute bottom-[38%] -left-20 transform -translate-y-1/2 bg-black/75 text-white px-2 py-1 rounded text-sm opacity-100 group-hover:opacity-100 transition-opacity">
          {height}"
        </div>
      </div>
    </Draggable>
  );
};
