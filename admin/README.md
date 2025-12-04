# Apparel Store Admin Panel

A modern, visually appealing admin panel built with Next.js 14 for managing an ecommerce apparel store.

## Features

- **Dashboard**: Overview of key metrics including total orders, revenue, customers, and products
- **Orders Management**: View all orders with expandable rows showing order lines, customer details, and return status
- **Returns Analytics**: Track returns with repurchase performance metrics and retained revenue analysis

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the admin panel.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This project is configured for deployment on Vercel. Simply connect your repository and deploy.

## Project Structure

```
src/
├── app/
│   ├── (admin)/           # Admin routes with sidebar layout
│   │   ├── dashboard/     # Dashboard page
│   │   ├── orders/        # Orders management
│   │   └── returns/       # Returns analytics
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/
│   ├── charts/            # Chart components
│   ├── MetricCard.tsx     # Metric display cards
│   ├── OrdersTable.tsx    # Orders table with expandable rows
│   ├── ReturnsTable.tsx   # Returns table
│   ├── Sidebar.tsx        # Navigation sidebar
│   └── StatusBadge.tsx    # Status badges
├── data/                  # JSON data files
└── lib/
    ├── data.ts            # Data utilities and helpers
    └── types.ts           # TypeScript type definitions
```

## Key Metrics

### Returns Analytics
- **Retained Revenue Ratio**: Ratio of repurchase revenue to total returned amount
- **Repurchase Conversion Rate**: Percentage of returns that result in a repurchase
- **Return Reasons Breakdown**: Distribution of return reasons
- **Status Distribution**: Pending, approved, and refunded returns

