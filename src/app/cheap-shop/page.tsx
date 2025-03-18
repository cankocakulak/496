"use client";

import { OrderForm } from '@/components/OrderForm';
import { AdditionalItemForm } from '@/components/AdditionalItemForm';
import { useState } from 'react';
import '@/styles/forms.css';

export default function CheapShop() {
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);

  const handleNextItem = () => {
    if (confirm("Add another item to this order?")) {
      setShowAdditionalForm(true);
    }
  };

  return (
    <main className="p-4">
      <h1>Cheap Shop Catalog Store</h1>
      {showAdditionalForm ? (
        <AdditionalItemForm />
      ) : (
        <OrderForm onNextItem={handleNextItem} />
      )}
    </main>
  );
}
