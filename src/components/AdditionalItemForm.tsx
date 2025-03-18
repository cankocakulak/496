import React, { useState } from 'react';
import { CatalogItem, PurchaserInfo } from '@/models/types';
import { CatalogItemSection } from './CatalogItemSection';
import { useScreen } from '@/contexts/ScreenContext';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { orderService } from '@/services/orderService';

interface AdditionalItemFormProps {
  onNextItem: () => void;
  onFinish: () => void;
  purchaserInfo: PurchaserInfo;
}

export const AdditionalItemForm = ({ onNextItem, onFinish, purchaserInfo }: AdditionalItemFormProps) => {
  const { resetToMain } = useScreen();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const [item, setItem] = useState<CatalogItem>({
    itemNumber: '',
    quantity: 1,
    costPerItem: 0,
    total: 0
  });

  const [balanceOwing, setBalanceOwing] = useState(0);

  useInactivityTimer(30000, () => {
    resetForm();
    resetToMain();
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!item.itemNumber) newErrors.itemNumber = 'Item number is required';
    if (item.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';
    if (item.costPerItem <= 0) newErrors.costPerItem = 'Cost must be greater than 0';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 3000);
      return false;
    }
    return true;
  };

  const handleNextItem = () => {
    console.log('Next Item clicked in AdditionalItemForm');
    if (!validateForm()) {
      console.log('Validation failed:', errors);
      return;
    }

    if (confirm('Add another item to this order?')) {
      console.log('Adding item, current total:', item.total);
      // Add current item to balance
      const newTotal = balanceOwing + item.total;
      setBalanceOwing(newTotal);
      
      setItem({
        itemNumber: '',
        quantity: 1,
        costPerItem: 0,
        total: 0
      });

      onNextItem();
    }
  };

  const handleTriggerInvoice = async () => {
    if (!validateForm()) return;

    if (confirm('Generate invoice for this order?')) {
      setProcessing(true);
      try {
        await orderService.notifyShippingAndBilling({
          purchaser: purchaserInfo,
          items: [item],
          total: balanceOwing + item.total
        });
        
        alert('Order processed successfully!');
        resetForm();
        onFinish();
      } catch (error) {
        alert(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setProcessing(false);
      }
    }
  };

  const resetForm = () => {
    setItem({
      itemNumber: '',
      quantity: 1,
      costPerItem: 0,
      total: 0
    });
    setBalanceOwing(0);
  };

  const handleItemChange = (field: keyof CatalogItem, value: string | number) => {
    const updatedItem = { ...item, [field]: value };
    
    // Automatically calculate total when quantity or cost changes
    if (field === 'quantity' || field === 'costPerItem') {
      const quantity = field === 'quantity' ? Number(value) : item.quantity;
      const cost = field === 'costPerItem' ? Number(value) : item.costPerItem;
      updatedItem.total = quantity * cost;
    }
    
    setItem(updatedItem);
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
          onItemChange={handleItemChange}
          errors={errors}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button 
          type="button"
          onClick={() => handleNextItem()}
          disabled={processing}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next Catalog Item (PF8)
        </button>
        <button 
          type="button"
          onClick={() => handleTriggerInvoice()}
          disabled={processing}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : 'Trigger Invoice (PF5)'}
        </button>
      </div>
    </div>
  );
}; 