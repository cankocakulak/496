import React, { useState } from 'react';
import { PurchaserInfo, CatalogItem } from '@/models/types';
import { CatalogItemSection } from './CatalogItemSection';
import { PURCHASER_FIELDS, CATALOG_ITEM_FIELDS } from '@/models/formFields';
import { PurchaserInfoSection } from '@/components/PurchaserInfoSection';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useScreen } from '@/contexts/ScreenContext';
import { orderService } from '@/services/orderService';

interface OrderFormProps {
  onNextItem: (info: PurchaserInfo) => void;
}

export const OrderForm = ({ onNextItem }: OrderFormProps) => {
  const { resetToMain, currentScreen } = useScreen();
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
  const [processing, setProcessing] = useState(false);

  // Add validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Enhanced inactivity timer
  useInactivityTimer(30000, () => {
    resetForm();
    resetToMain();
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate catalog item first (since that's what we're adding)
    if (!currentItem.itemNumber.trim()) {
      newErrors.itemNumber = 'Item number is required';
    }
    if (currentItem.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }
    if (currentItem.costPerItem <= 0) {
      newErrors.costPerItem = 'Cost must be greater than 0';
    }
    if (currentItem.total <= 0) {
      newErrors.total = 'Total must be greater than 0';
    }

    // Only validate purchaser info when triggering invoice
    if (currentScreen === 'order') {
      if (!purchaserInfo.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!purchaserInfo.phone.trim()) {
        newErrors.phone = 'Phone is required';
      }
      if (!purchaserInfo.postalCode.trim()) {
        newErrors.postalCode = 'Postal code is required';
      } else if (!/^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(purchaserInfo.postalCode)) {
        newErrors.postalCode = 'Format should be: A1A 1A1';
      }
    }

    setErrors(newErrors);

    // If there are errors, show an alert with all error messages
    if (Object.keys(newErrors).length > 0) {
      const errorMessage = Object.entries(newErrors)
        .map(([field, message]) => `${field}: ${message}`)
        .join('\n');
      alert('Please fix the following errors:\n\n' + errorMessage);
      return false;
    }

    return true;
  };

  const handleNextItem = () => {
    if (!validateForm()) return;

    if (confirm('Add another item to this order?')) {
      // Calculate running total first
      const newTotal = balanceOwing + currentItem.total;
      setBalanceOwing(newTotal);
      
      // Pass purchaser info to parent
      onNextItem(purchaserInfo);
    }
  };

  const handleTriggerInvoice = async () => {
    if (!validateForm()) return;

    if (confirm('Generate invoice for this order?')) {
      setProcessing(true);
      try {
        await orderService.notifyShippingAndBilling({
          purchaser: purchaserInfo,
          items: [currentItem],
          total: balanceOwing + currentItem.total
        });
        
        alert('Order processed successfully!');
        resetForm();
        resetToMain();
      } catch (error) {
        alert(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setProcessing(false);
      }
    }
  };

  const resetForm = () => {
    setPurchaserInfo({
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
    setCurrentItem({
      itemNumber: '',
      quantity: 1,
      costPerItem: 0,
      total: 0
    });
    setBalanceOwing(0);
  };

  // Update CatalogItemSection to calculate total when either quantity or cost changes
  const handleItemChange = (field: keyof CatalogItem, value: string | number) => {
    const updatedItem = { ...currentItem, [field]: value };
    
    // Automatically calculate total when quantity or cost changes
    if (field === 'quantity' || field === 'costPerItem') {
      const quantity = field === 'quantity' ? Number(value) : currentItem.quantity;
      const cost = field === 'costPerItem' ? Number(value) : currentItem.costPerItem;
      updatedItem.total = quantity * cost;
    }
    
    setCurrentItem(updatedItem);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <PurchaserInfoSection 
        purchaserInfo={purchaserInfo}
        onPurchaserInfoChange={setPurchaserInfo}
        errors={errors}
      />

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <CatalogItemSection 
          item={currentItem}
          balanceOwing={balanceOwing}
          onItemChange={handleItemChange}
          errors={errors}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button 
          type="button"
          onClick={() => handleNextItem()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next Catalog Item (PF5)
        </button>
        <button 
          type="button"
          onClick={() => handleTriggerInvoice()}
          disabled={processing}
          className={`px-4 py-2 ${
            processing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600'
          } text-white rounded-md focus:outline-none focus:ring-2`}
        >
          {processing ? 'Processing...' : 'Trigger Invoice (PF8)'}
        </button>
      </div>
    </div>
  );
}; 