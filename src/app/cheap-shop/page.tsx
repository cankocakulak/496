"use client";

import { OrderForm } from '@/components/OrderForm';
import { AdditionalItemForm } from '@/components/AdditionalItemForm';
import { ScreenProvider } from '@/contexts/ScreenContext';
import { MainScreen } from '@/components/MainScreen';
import { useScreen } from '@/contexts/ScreenContext';
import { useState } from 'react';
import { PurchaserInfo } from '@/models/types';

export default function CheapShop() {
  return (
    <ScreenProvider>
      <CheapShopContent />
    </ScreenProvider>
  );
}

function CheapShopContent() {
  const { currentScreen, setScreen } = useScreen();
  const [purchaserInfo, setPurchaserInfo] = useState<PurchaserInfo | null>(null);

  const handleOrderFormComplete = (info: PurchaserInfo) => {
    setPurchaserInfo(info);
    setScreen('additional');
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cheap Shop Catalog Store</h1>
      
      {currentScreen === 'main' && (
        <MainScreen onStartOrder={() => setScreen('order')} />
      )}
      
      {currentScreen === 'order' && (
        <OrderForm onNextItem={handleOrderFormComplete} />
      )}
      
      {currentScreen === 'additional' && purchaserInfo && (
        <AdditionalItemForm 
          onNextItem={() => setScreen('additional')}
          onFinish={() => setScreen('main')}
          purchaserInfo={purchaserInfo}
        />
      )}
    </main>
  );
}
