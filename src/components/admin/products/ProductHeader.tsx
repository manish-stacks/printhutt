import React from 'react';

export default function ProductHeader() {
  return (
    <div className="w-full bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md shadow-black-300">
      <h3 className="text-lg font-bold">Create Product</h3>
      <button className="bg-blue-500 text-white py-1 px-7 rounded">Back</button>
    </div>
  );
}