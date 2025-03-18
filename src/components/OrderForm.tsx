import React, { useState } from 'react';
import { PurchaserInfo, CatalogItem } from '@/models/types';
import { CatalogItemSection } from './CatalogItemSection';
import { PURCHASER_FIELDS } from '@/models/formFields';

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
    <div className="order-form">
      <section className="purchaser-info">
        <h2>Purchaser</h2>
        <div className="form-grid">
          {PURCHASER_FIELDS.map(field => (
            <React.Fragment key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                value={purchaserInfo[field.name]}
                onChange={(e) => setPurchaserInfo({
                  ...purchaserInfo,
                  [field.name]: e.target.value
                })}
              />
            </React.Fragment>
          ))}
        </div>
      </section>

      <CatalogItemSection 
        item={currentItem}
        balanceOwing={balanceOwing}
        onItemChange={setCurrentItem}
      />

      <div className="actions">
        <button onClick={onNextItem}>
          Next Catalog Item (PF5)
        </button>
        <button onClick={() => confirm("Generate invoice for this order?")}>
          Trigger Invoice (PF8)
        </button>
      </div>
    </div>
  );
}; 