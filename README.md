# React TypeScript Projects

This repository contains two projects demonstrating different aspects of web application development using React and TypeScript.

## 1. Object-Oriented Drawing Editor

A simple object-oriented drawing editor demonstrating core OOP principles using TypeScript and React. This project allows users to create, move, and erase shapes in an interactive canvas.

### Key Components
- `src/components/DrawingEditor.tsx` - Main component handling the drawing interface
- `src/models/shapes/ShapeRegistry.ts` - Core OOP implementation with shape definitions

### Features
- Create squares, circles, and lines
- Move shapes by dragging
- Erase shapes
- Select and highlight shapes
- Clear all shapes

## 2. Cheap Shop Catalog System

A modern implementation of a catalog-based shopping system with two main dialog boxes for order processing.

### Key Components
- `src/components/OrderForm.tsx` - Main order entry form with customer details
- `src/components/AdditionalItemForm.tsx` - Additional items entry form
- `src/components/CatalogItemSection.tsx` - Reusable catalog item control
- `src/components/PurchaserInfoSection.tsx` - Reusable customer information control

### Features
- Customer information entry
- Catalog item entry with real-time calculations
- Multiple item support
- Order total tracking
- Confirmation dialogs

### Documentation
- [API Documentation](./hw2_api_portfolio/API.md) - Detailed component interfaces and usage
- [Portfolio Summary](./hw2_api_portfolio/PORTFOLIO.md) - Design decisions and implementation details
- [Shopping Scenarios](./hw2_api_portfolio/PORTFOLIO.md#shopping-scenarios) - Example use cases

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then visit:
- Drawing Editor: [http://localhost:3000/drawing-editor](http://localhost:3000/drawing-editor)
- Cheap Shop: [http://localhost:3000/cheap-shop](http://localhost:3000/cheap-shop)

## Project Structure

The projects demonstrate:
1. Object-Oriented Programming principles in TypeScript/React
2. Component-based architecture
3. Reusable control implementation
4. State management
5. User interface design
6. Event handling
7. Form processing

## Technology Stack
- Next.js 13+
- TypeScript
- React
- Tailwind CSS

## Learn More

To learn more about the technologies used:
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
