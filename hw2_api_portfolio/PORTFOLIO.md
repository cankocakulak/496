# Cheap Shop Design Portfolio

## Overview
A modern web-based implementation of a catalog shopping system that replaces traditional paper-based ordering.

## Design Goals
1. Simplify order entry process
2. Reduce errors in order processing
3. Improve user experience
4. Maintain familiar workflow

## Implementation Details
1. React/Next.js for modern web interface
2. TypeScript for type safety
3. Modular component architecture
4. Tailwind CSS for styling

## Shopping Scenarios

### Scenario 1: Single Item Purchase
1. Customer browses catalog, finds item (e.g., Desk #D123)
2. Clerk enters:
   - Customer information
   - Item #D123, Quantity: 1, Price: $299.99
3. Clicks "Trigger Invoice"
4. Total: $299.99

### Scenario 2: Multiple Items
1. Customer selects:
   - Chair #C456 ($149.99)
   - Desk #D123 ($299.99)
2. Clerk enters:
   - Customer information
   - First item details
3. Clicks "Next Catalog Item"
4. Enters second item
5. Clicks "Trigger Invoice"
6. Total: $449.98

## Future Enhancements
1. Inventory integration
2. Customer database
3. Digital catalog integration
4. Receipt printing 