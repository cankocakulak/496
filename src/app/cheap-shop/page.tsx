"use client";

import { OrderForm } from '@/components/OrderForm';
import { AdditionalItemForm } from '@/components/AdditionalItemForm';
import { ScreenProvider } from '@/contexts/ScreenContext';
import { MainScreen } from '@/components/MainScreen';
import { useScreen } from '@/contexts/ScreenContext';

export default function CheapShop() {
  return (
    <ScreenProvider>
      <CheapShopContent />
    </ScreenProvider>
  );
}

function CheapShopContent() {
  const { currentScreen, setScreen } = useScreen();

  const handleNextItem = () => {
    console.log('Switching to additional screen');
    setScreen('additional');
  };

  const handleFinish = () => {
    console.log('Switching to main screen');
    setScreen('main');
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cheap Shop Catalog Store</h1>
      
      {currentScreen === 'main' && (
        <MainScreen onStartOrder={() => {
          console.log('Starting order');
          setScreen('order');
        }} />
      )}
      
      {currentScreen === 'order' && (
        <OrderForm onNextItem={handleNextItem} />
      )}
      
      {currentScreen === 'additional' && (
        <AdditionalItemForm 
          onNextItem={handleNextItem}
          onFinish={handleFinish}
        />
      )}
    </main>
  );
}
