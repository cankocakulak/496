export interface PurchaserInfo {
    name: string;
    phone: string;
    postalCode: string;
    province: string;
    city: string;
    deliveryAddress: string;
    todaysDate: string;
    creditCardNo: string;
    validationId: string;
    [key: string]: string;
  }
  
  export interface CatalogItem {
    itemNumber: string;
    quantity: number;
    costPerItem: number;
    total: number;
    [key: string]: string | number;
  }
  
  export interface Order {
    purchaser: PurchaserInfo;
    items: CatalogItem[];
    balanceOwing: number;
  }