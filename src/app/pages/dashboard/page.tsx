"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/Dashboard.module.css";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import BudgetChart from "@/app/components/BudgetChart";

const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00c49f",
  "#ffbb28",
];

export default function Dashboard() {
  interface Transaction {
    description: string;
    date: string;
    amount: number;
    category: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgetInput, setBudgetInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const [budgets, setBudgets] = useState<{ [key: string]: number }>(() => {
    const savedBudgets = JSON.parse(localStorage.getItem("budgets") || "{}");
    return {
      Food: savedBudgets.Food || 0,
      Transport: savedBudgets.Transport || 0,
      Shopping: savedBudgets.Shopping || 0,
      Entertainment: savedBudgets.Entertainment || 0,
      Bills: savedBudgets.Bills || 0,
      Other: savedBudgets.Other || 0,
    };
  });
  useEffect(() => {
    const savedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    setTransactions(savedTransactions);
    const savedBudgets = JSON.parse(localStorage.getItem("budgets") || "{}");
    setBudgets(savedBudgets);
  }, []);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);
  const setCategoryBudget = () => {
    if (!selectedCategory || !budgetInput) return;
    setBudgets({ ...budgets, [selectedCategory]: Number(budgetInput) });
    setBudgetInput("");
    setSelectedCategory("");
  };
  const totalExpenses = transactions.reduce(
    (acc, t) => acc + Number(t.amount),
    0
  );
  const spendingByCategory = transactions.reduce(
    (acc: { [key: string]: number }, { category, amount }) => {
      acc[category] = (acc[category] || 0) + Number(amount);
      return acc;
    },
    {}
  );

  // const categoryData = categories
  //   .map((category, index) => ({
  //     name: category,
  //     value: transactions
  //       .filter((t) => t.category === category)
  //       .reduce((acc, t) => acc + Number(t.amount), 0),
  //     color: COLORS[index % COLORS.length],
  //   }))
  //   .filter((data) => data.value > 0);

  const budgetData = Object.keys(budgets).map((category) => ({
    category,
    budget: budgets[category],
    spent: spendingByCategory[category] || 0,
  }));
  const mostRecentTransaction =
    transactions.length > 0 ? transactions[transactions.length - 1] : null;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.btnContainer}>
        <Button className={styles.button} onClick={() => router.push("/")}>
          Go to Home
        </Button>
      </div>

      <div className={styles.card}>
        <h2 className={styles.subtitle}>Total Expenses: Rs {totalExpenses}</h2>
      </div>

      <h2 className={styles.subtitle}>Set Category Budget</h2>
      <div className={styles.flexContainer}>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className={styles.selectTrigger}>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className={styles.selectContent}>
            {categories.map((category) => (
              <SelectItem key={category} value={category} className={styles.selectItem}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Enter Budget"
          value={budgetInput}
          onChange={(e) => setBudgetInput(e.target.value)}
          className={styles.input}
        />
        <Button className={styles.button} onClick={setCategoryBudget}>
          Set Budget
        </Button>
      </div>

      {mostRecentTransaction && (
        <div className={styles.recentTransaction}>
          <h2 className={styles.subtitle}>Most Recent Transaction</h2>
          <p className={styles.transactionText}>
            <strong>Description:</strong> {mostRecentTransaction.description}
          </p>
          <p className={styles.transactionText}>
            <strong>Amount:</strong> Rs {mostRecentTransaction.amount}
          </p>
          <p className={styles.transactionText}>
            <strong>Category:</strong> {mostRecentTransaction.category}
          </p>
          <p className={styles.transactionText}>
            <strong>Date:</strong> {mostRecentTransaction.date}
          </p>
        </div>
      )}

      <h2 className={styles.budgetOverviewTitle}>Budget Overview</h2>
      <BudgetChart budgetData={budgetData} />
    </div>
  );
}
