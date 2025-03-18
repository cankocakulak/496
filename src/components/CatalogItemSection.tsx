import React from 'react';
import { CatalogItem } from '@/models/types';
import { CATALOG_ITEM_FIELDS, BALANCE_FIELD } from '@/models/formFields';

interface CatalogItemSectionProps {
  item: CatalogItem;
  balanceOwing: number;
  onItemChange: (item: CatalogItem) => void;
}

export const CatalogItemSection = ({ item, balanceOwing, onItemChange }: CatalogItemSectionProps) => {
  const calculateTotal = (quantity: number, cost: number) => {
    return quantity * cost;
  };

  return (
    <section className="catalog-item">
      <h2>Catalog Item</h2>
      <div className="form-grid">
        {CATALOG_ITEM_FIELDS.map(field => (
          <React.Fragment key={field.name}>
            <label>{field.label}</label>
            {field.hasSpinners ? (
              <div className="quantity-input">
                <input
                  type={field.type}
                  min={field.min}
                  value={item[field.name]}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (field.name === 'quantity') {
                      const quantity = parseInt(value) || 0;
                      const total = calculateTotal(quantity, item.costPerItem);
                      onItemChange({ ...item, quantity, total });
                    } else if (field.name === 'costPerItem') {
                      const costPerItem = parseFloat(value) || 0;
                      const total = calculateTotal(item.quantity, costPerItem);
                      onItemChange({ ...item, costPerItem, total });
                    } else {
                      onItemChange({ ...item, [field.name]: value });
                    }
                  }}
                  readOnly={field.readOnly}
                />
                {field.hasSpinners && (
                  <div className="spinners">
                    <button>▲</button>
                    <button>▼</button>
                  </div>
                )}
              </div>
            ) : (
              <input
                type={field.type}
                step={field.step}
                value={item[field.name]}
                onChange={(e) => {
                  const value = e.target.value;
                  if (field.name === 'quantity') {
                    const quantity = parseInt(value) || 0;
                    const total = calculateTotal(quantity, item.costPerItem);
                    onItemChange({ ...item, quantity, total });
                  } else if (field.name === 'costPerItem') {
                    const costPerItem = parseFloat(value) || 0;
                    const total = calculateTotal(item.quantity, costPerItem);
                    onItemChange({ ...item, costPerItem, total });
                  } else {
                    onItemChange({ ...item, [field.name]: value });
                  }
                }}
                readOnly={field.readOnly}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="balance-section">
        <label>{BALANCE_FIELD.label}</label>
        <input
          type={BALANCE_FIELD.type}
          value={balanceOwing.toFixed(2)}
          readOnly={BALANCE_FIELD.readOnly}
        />
      </div>
    </section>
  );
}; 