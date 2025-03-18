"use client";

import { OrderForm } from '@/components/OrderForm';
import { AdditionalItemForm } from '@/components/AdditionalItemForm';
import { ScreenProvider } from '@/contexts/ScreenContext';
import { MainScreen } from '@/components/MainScreen';
import { useScreen } from '@/contexts/ScreenContext';
import { useState } from 'react';
import { PurchaserInfo, CatalogItem } from '@/models/types';

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
  const [orderItems, setOrderItems] = useState<CatalogItem[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);

  const handleOrderFormComplete = (info: PurchaserInfo, item: CatalogItem) => {
    setPurchaserInfo(info);
    setOrderItems([item]);
    setTotalBalance(item.total);
    setScreen('additional');
  };

  const handleAdditionalItem = (item: CatalogItem) => {
    setOrderItems(prev => [...prev, item]);
    setTotalBalance(prev => prev + item.total);
  };

  const handleFinish = () => {
    setPurchaserInfo(null);
    setOrderItems([]);
    setTotalBalance(0);
    setScreen('main');
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
          onNextItem={handleAdditionalItem}
          onFinish={handleFinish}
          purchaserInfo={purchaserInfo}
          orderItems={orderItems}
          totalBalance={totalBalance}
        />
      )}
    </main>
  );
}
