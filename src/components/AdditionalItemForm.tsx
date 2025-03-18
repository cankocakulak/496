import React, { useState } from 'react';
import { CatalogItem } from '@/models/types';
import { CatalogItemSection } from './CatalogItemSection';

export const AdditionalItemForm = () => {
  const [item, setItem] = useState<CatalogItem>({
    itemNumber: '',
    quantity: 1,
    costPerItem: 0,
    total: 0
  });

  const [balanceOwing, setBalanceOwing] = useState(0);

  const handleNextItem = () => {
    if (confirm('Add another item to the order?')) {
      setItem({
        itemNumber: '',
        quantity: 1,
        costPerItem: 0,
        total: 0
      });
    }
  };

  const handleTriggerInvoice = () => {
    if (confirm('Generate invoice for this order?')) {
      alert(`Invoice generated! Total: $${balanceOwing + item.total}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Additional Item</h2>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <CatalogItemSection 
          item={item}
          balanceOwing={balanceOwing}
          onItemChange={setItem}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button 
          onClick={handleNextItem}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next Catalog Item (PF8)
        </button>
        <button 
          onClick={handleTriggerInvoice}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Trigger Invoice (PF5)
        </button>
      </div>
    </div>
  );
}; 