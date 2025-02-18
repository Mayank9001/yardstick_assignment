# 💰 Personal Finance Visualizer

A simple yet powerful **Personal Finance Visualizer** built using **Next.js**, **React**, and **MongoDB**. This app helps users **track expenses**, **set budgets**, and **analyze spending habits** through interactive charts and insights.

## 🚀 Features

✅ **Transaction Management**

- Add, edit, and delete transactions with **amount, date, category, and description**.
- Transactions are stored locally (or in MongoDB for future expansion).

✅ **Category-Based Spending Tracking**

- Predefined categories (**Food, Transport, Shopping, Bills, Entertainment, Other**).
- View category-wise spending breakdown with a **pie chart**.

✅ **Budgeting**

- Set monthly budgets for each category.
- Compare actual spending vs budget with **progress bars**.
- Get alerts when spending reaches **80%** of the budget or exceeds it.

✅ **Data Persistence**

- Transactions and budgets are saved to **localStorage** (future upgrade to MongoDB).
- Data remains even after page reloads.

✅ **Interactive Dashboard**

- **Bar chart** for monthly expenses.
- **Pie chart** for category-wise spending breakdown.
- **Recent transactions list** for quick insights.

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, shadcn/ui, Recharts
- **Backend:** MongoDB (Planned)
- **State Management:** useState, localStorage
- **UI Components:** TailwindCSS, Dialog, Input, Buttons

## 📦 Installation & Setup

1️⃣ **Clone the Repository**

```sh
git clone https://github.com/yourusername/personal-finance-visualizer.git
cd personal-finance-visualizer
```

2️⃣ **Install Dependencies**

```sh
npm install
```

3️⃣ Run the Development Server

```sh
npm run dev
```

Visit http://localhost:3000 to view the app in your browser.
