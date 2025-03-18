# Cheap Shop Design Portfolio

## Overview
A modern web-based implementation of a catalog shopping system that replaces traditional paper-based ordering, featuring real-time validation and error handling.

## Design Goals
1. Simplify order entry process
2. Reduce errors in order processing
3. Improve user experience
4. Maintain familiar workflow
5. Provide immediate feedback
6. Ensure data accuracy

## Implementation Details
1. React/Next.js for modern web interface
2. TypeScript for type safety
3. Modular component architecture
4. Tailwind CSS for styling
5. Real-time validation
6. Automatic calculations
7. Error handling and feedback
8. Inactivity timeout management

## Shopping Scenarios

### Scenario 1: Single Item Purchase
1. Customer browses catalog, finds item (e.g., Desk #D123)
2. Clerk enters:
   - Customer information (with format validation)
   - Item #D123, Quantity: 1, Price: $299.99
3. System automatically calculates total
4. Validation ensures all required fields are filled
5. Clicks "Trigger Invoice"
6. Processing state shows operation progress
7. Total: $299.99
8. Confirmation displayed

### Scenario 2: Multiple Items
1. Customer selects:
   - Chair #C456 ($149.99)
   - Desk #D123 ($299.99)
2. Clerk enters:
   - Customer information (with validation)
   - First item details
3. System calculates running total
4. Clicks "Next Catalog Item" (after validation)
5. Confirmation dialog ensures intentional action
6. Enters second item
7. Running total updates automatically
8. Clicks "Trigger Invoice"
9. Final total: $449.98
10. Order confirmation displayed

### Scenario 3: Error Handling and Recovery
1. Customer wants to order:
   - Bookshelf #B789 ($199.99)
   - Lamp #L456 ($79.99)

2. Clerk enters first item:
   - Enters postal code as "L5G5H7" (incorrect format)
   - System shows error: "Format should be: A1A 1A1"
   - Clerk corrects to "L5G 5H7"
   
3. Continues with item entry:
   - Enters item number "B789"
   - Accidentally enters quantity as "0"
   - System shows error: "Quantity must be at least 1"
   - Enters cost as "-199.99"
   - System shows error: "Cost must be greater than 0"
   
4. Clerk corrects entries:
   - Updates quantity to "1"
   - Fixes cost to "199.99"
   - Total updates automatically to "$199.99"
   
5. Clicks "Next Catalog Item"
   - Confirmation dialog appears
   - Running total saved
   
6. Enters second item:
   - No activity for 25 seconds
   - System shows warning: "Session will timeout in 5 seconds"
   - Clerk moves mouse, timeout reset
   
7. Completes second item:
   - Item #L456
   - Quantity: 1
   - Cost: $79.99
   - Total updates to "$279.98"
   
8. Clicks "Trigger Invoice"
   - System validates all fields
   - Shows processing state
   - Confirms order completion
   - Returns to main screen

Key Validation Features Demonstrated:
- Postal code format validation
- Quantity minimum value check
- Cost positive value check
- Inactivity timeout warning
- Running total accuracy
- Required field validation
- Processing state indication
- Confirmation dialogs

## Security Features
1. 30-second inactivity timeout
2. Form validation
3. Processing state protection
4. Confirmation dialogs

## Error Handling
1. Real-time field validation
2. Visual error indicators
3. Clear error messages
4. Format-specific validation (e.g., postal codes)
5. Numeric input validation

## User Experience Enhancements
1. Automatic total calculations
2. Running balance display
3. Processing state indicators
4. Confirmation dialogs
5. Field-specific error messages
6. Visual feedback for invalid fields

## Future Enhancements
1. Inventory integration
2. Customer database
3. Digital catalog integration
4. Receipt printing
5. Barcode scanner support
6. Order history tracking
7. Export functionality
8. Mobile responsiveness 