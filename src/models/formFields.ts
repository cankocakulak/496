export const PURCHASER_FIELDS = [
  { name: 'name', label: 'Name:', type: 'text' },
  { name: 'phone', label: 'Phone:', type: 'text' },
  { name: 'postalCode', label: 'Postal Code:', type: 'text' },
  { name: 'province', label: 'Province:', type: 'text' },
  { name: 'city', label: 'City:', type: 'text' },
  { name: 'deliveryAddress', label: 'Delivery Address:', type: 'text' },
  { name: 'todaysDate', label: "Today's date:", type: 'date' },
  { name: 'creditCardNo', label: 'Credit Card No.:', type: 'text' },
  { name: 'validationId', label: 'for dept use: validation id:', type: 'text' }
];

export const CATALOG_ITEM_FIELDS = [
  { name: 'itemNumber', label: 'Number:', type: 'text' },
  { 
    name: 'quantity', 
    label: 'Quantity:', 
    type: 'number',
    min: 1,
    hasSpinners: true 
  },
  { 
    name: 'costPerItem', 
    label: 'Cost/Item:', 
    type: 'number',
    step: '0.01' 
  },
  { 
    name: 'total', 
    label: 'Total:', 
    type: 'text',
    readOnly: true 
  }
];

export const BALANCE_FIELD = {
  name: 'balanceOwing',
  label: 'Balance Owing:',
  type: 'text',
  readOnly: true
}; 