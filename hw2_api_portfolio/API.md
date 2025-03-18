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
- errors: Record<string, string>
- processing: boolean

Features:
- Real-time validation
- Automatic total calculation
- 30-second inactivity timeout
- Blinking error fields (3-second duration)
- Inline error messages
- Processing state handling

### AdditionalItemForm
Secondary item entry dialog.

Props:
- onNextItem: () => void
- onFinish: () => void

State:
- item: CatalogItem
- balanceOwing: number
- errors: Record<string, string>
- processing: boolean

Features:
- Maintains running total
- Real-time validation
- Automatic total calculation
- 30-second inactivity timeout
- Blinking error fields (3-second duration)
- Inline error messages

### PurchaserInfoSection
Reusable purchaser information form.

Props:
- purchaserInfo: PurchaserInfo
- onPurchaserInfoChange: (info: PurchaserInfo) => void
- errors: Record<string, string>

Features:
- Postal code format validation (A1A 1A1)
- Field-specific error messages
- Blinking error indicators
- Tabbed navigation support

### CatalogItemSection
Reusable catalog item form.

Props:
- item: CatalogItem
- balanceOwing: number
- onItemChange: (field: keyof CatalogItem, value: string | number) => void
- errors: Record<string, string>

Features:
- Real-time total calculation
- Numeric input validation
- Running balance display
- Field-specific error messages
- Blinking error indicators 