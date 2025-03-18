import React from 'react';
import { PurchaserInfo } from '@/models/types';
import { PURCHASER_FIELDS } from '@/models/formFields';

interface PurchaserInfoSectionProps {
  purchaserInfo: PurchaserInfo;
  onPurchaserInfoChange: (info: PurchaserInfo) => void;
  errors: Record<string, string>;
}

export const PurchaserInfoSection = ({
  purchaserInfo,
  onPurchaserInfoChange,
  errors
}: PurchaserInfoSectionProps) => {
  return (
    <section>
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Purchaser</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {PURCHASER_FIELDS.map((field, index) => (
          <div key={field.name} className={`${field.name === 'deliveryAddress' ? 'col-span-2' : ''}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              tabIndex={index + 1}
              type={field.type}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[field.name] ? 'border-red-500' : ''
              }`}
              value={purchaserInfo[field.name]}
              onChange={(e) => onPurchaserInfoChange({
                ...purchaserInfo,
                [field.name]: e.target.value
              })}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}; 