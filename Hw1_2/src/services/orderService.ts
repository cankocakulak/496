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
      
      // Show notification modal
      const modalContent = `
        Order Details:
        --------------
        Customer: ${orderDetails.purchaser.name}
        Total: $${orderDetails.total.toFixed(2)}
        
        Items:
        ${orderDetails.items.map(item => 
          `- ${item.itemNumber}: ${item.quantity} x $${item.costPerItem.toFixed(2)}`
        ).join('\n')}
        
        Shipping to:
        ${orderDetails.purchaser.deliveryAddress}
        ${orderDetails.purchaser.city}, ${orderDetails.purchaser.province}
        ${orderDetails.purchaser.postalCode}
        
        Order has been sent to shipping and billing departments.
      `;

      alert(modalContent);
      console.log('Shipping and billing notified:', orderDetails);
      return true;
    } catch (error) {
      console.error('Failed to notify shipping and billing:', error);
      throw new Error('Failed to process order. Please try again.');
    }
  }
}; 