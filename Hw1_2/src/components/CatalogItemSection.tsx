import React from 'react';
import { CatalogItem } from '@/models/types';
import { CATALOG_ITEM_FIELDS, BALANCE_FIELD } from '@/models/formFields';

interface CatalogItemSectionProps {
  item: CatalogItem;
  balanceOwing: number;
  onItemChange: (field: keyof CatalogItem, value: string | number) => void;
  errors: Record<string, string>;
}

export const CatalogItemSection = ({
  item,
  balanceOwing,
  onItemChange,
  errors
}: CatalogItemSectionProps) => {
  const calculateTotal = (quantity: number, cost: number) => {
    return quantity * cost;
  };

  return (
    <section>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Number
          </label>
          <input
            type="text"
            value={item.itemNumber}
            onChange={(e) => onItemChange('itemNumber', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.itemNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.itemNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.itemNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={item.quantity || ''}
            onChange={(e) => {
              const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
              onItemChange('quantity', value);
            }}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.quantity ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cost Per Item
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={item.costPerItem || ''}
            onChange={(e) => {
              const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
              onItemChange('costPerItem', value);
            }}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.costPerItem ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.costPerItem && (
            <p className="text-red-500 text-sm mt-1">{errors.costPerItem}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total
          </label>
          <input
            type="text"
            readOnly
            value={`$${item.total.toFixed(2)}`}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-right text-lg font-semibold">
          Balance Owing: ${balanceOwing.toFixed(2)}
        </p>
      </div>
    </section>
  );
}; 