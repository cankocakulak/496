import React, { useState } from 'react';
import { PurchaserInfo, CatalogItem } from '@/models/types';
import { CatalogItemSection } from './CatalogItemSection';
import { PURCHASER_FIELDS, CATALOG_ITEM_FIELDS } from '@/models/formFields';
import { PurchaserInfoSection } from '@/components/PurchaserInfoSection';

interface OrderFormProps {
  onNextItem: () => void;
}

export const OrderForm = ({ onNextItem }: OrderFormProps) => {
  const [purchaserInfo, setPurchaserInfo] = useState<PurchaserInfo>({
    name: '',
    phone: '',
    postalCode: '',
    province: '',
    city: '',
    deliveryAddress: '',
    todaysDate: new Date().toISOString().split('T')[0],
    creditCardNo: '',
    validationId: ''
  });

  const [currentItem, setCurrentItem] = useState<CatalogItem>({
    itemNumber: '',
    quantity: 1,
    costPerItem: 0,
    total: 0
  });

  const [balanceOwing, setBalanceOwing] = useState(0);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <PurchaserInfoSection 
        purchaserInfo={purchaserInfo}
        onPurchaserInfoChange={setPurchaserInfo}
      />

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <CatalogItemSection 
          item={currentItem}
          balanceOwing={balanceOwing}
          onItemChange={setCurrentItem}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button 
          onClick={onNextItem}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next Catalog Item (PF5)
        </button>
        <button 
          onClick={() => confirm("Generate invoice for this order?")}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Trigger Invoice (PF8)
        </button>
      </div>
    </div>
  );
}; 