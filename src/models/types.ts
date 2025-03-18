export interface PurchaserInfo {
    name: string;
    phone: string;
    postalCode: string;
    province: string;
    city: string;
    deliveryAddress: string;
    todaysDate: Date;
    creditCardNo: string;
    validationId: string;
  }
  
  export interface CatalogItem {
    itemNumber: string;
    quantity: number;
    costPerItem: number;
    total: number;
  }
  
  export interface Order {
    purchaser: PurchaserInfo;
    items: CatalogItem[];
    balanceOwing: number;
  }