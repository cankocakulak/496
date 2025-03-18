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

  return (
    <div className="additional-item-form">
      <CatalogItemSection 
        item={item}
        balanceOwing={balanceOwing}
        onItemChange={setItem}
      />

      <div className="actions">
        <button onClick={() => confirm("Add another item to the order?")}>
          Next Catalog Item (PF8)
        </button>
        <button onClick={() => confirm("Generate invoice for this order?")}>
          Trigger Invoice (PF5)
        </button>
      </div>
    </div>
  );
}; 