import React from 'react';

const ShimmerCard = () => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="w-72 h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      <div className="animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
