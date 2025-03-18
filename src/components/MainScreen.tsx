import React from 'react';

interface MainScreenProps {
  onStartOrder: () => void;
}

export const MainScreen = ({ onStartOrder }: MainScreenProps) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Welcome to Cheap Shop Catalog Store
      </h2>
      
      <p className="text-gray-600 mb-8">
        Click below to start a new order or wait for 30 seconds to reset the system.
      </p>

      <button
        onClick={onStartOrder}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Start New Order
      </button>
    </div>
  );
}; 