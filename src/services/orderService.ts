import { PurchaserInfo, CatalogItem } from '@/models/types';

interface OrderDetails {
  purchaser: PurchaserInfo;
  items: CatalogItem[];
  total: number;
}

export const orderService = {
  async notifyShippingAndBilling(orderDetails: OrderDetails) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Shipping and billing notified:', orderDetails);
      return true;
    } catch (error) {
      console.error('Failed to notify shipping and billing:', error);
      throw new Error('Failed to process order. Please try again.');
    }
  }
}; 