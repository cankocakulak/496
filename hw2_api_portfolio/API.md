# Cheap Shop API Documentation

## Components

### OrderForm
Primary order entry dialog.

Props:
- onNextItem: () => void
  Callback when user wants to add another item

State:
- purchaserInfo: PurchaserInfo
- currentItem: CatalogItem
- balanceOwing: number

### AdditionalItemForm
Secondary item entry dialog.

Props: None

State:
- item: CatalogItem
- balanceOwing: number

### PurchaserInfoSection
Reusable purchaser information form.

Props:
- purchaserInfo: PurchaserInfo
- onPurchaserInfoChange: (info: PurchaserInfo) => void

### CatalogItemSection
Reusable catalog item form.

Props:
- item: CatalogItem
- balanceOwing: number
- onItemChange: (item: CatalogItem) => void 