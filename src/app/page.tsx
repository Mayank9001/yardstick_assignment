"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import styles from "../app/styles/Home.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

export default function Home() {
  const [transactions, setTransactions] = useState<
    {
      id: number;
      amount: string;
      date: string;
      description: string;
      category: string;
    }[]
  >([]);
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const router = useRouter();
  const budgets =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("budgets") || "{}")
      : {};
  useEffect(() => {
    const savedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    if (savedTransactions.length > 0) {
      savedTransactions.sort(
        (a: { date: string }, b: { date: string }) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setTransactions(savedTransactions);
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);
  const saveTransaction = () => {
    if (!form.amount || !form.date || !form.description || !form.category) {
      setError("All fields are required");
      return;
    }
    setError("");

    if (editingId !== null) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingId ? { ...form, id: editingId } : t
        )
      );
      setEditingId(null);
    } else {
      setTransactions([...transactions, { ...form, id: Date.now() }]);
    }

    setForm({ amount: "", date: "", description: "", category: "" });
    setOpen(false);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (transaction: {
    id: number;
    amount: string;
    date: string;
    description: string;
    category: string;
  }) => {
    setForm(transaction);
    setEditingId(transaction.id);
    setOpen(true);
  };
  const monthlyData = transactions.reduce(
    (acc: { [key: string]: number }, t) => {
      const date = new Date(t.date);
      const month = date.toLocaleString("default", { month: "short" }); // "Jan", "Feb", etc.
      const year = date.getFullYear(); // Extract year
      const key = `${month} ${year}`; // Format as "Jan 2024"

      acc[key] = (acc[key] || 0) + Number(t.amount);
      return acc;
    },
    {}
  );
  const getSpendingInsights = () => {
    const insights: { message: string; type: string }[] = [];
    const categoryTotals = transactions.reduce(
      (acc: { [key: string]: number }, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
        return acc;
      },
      {}
    );

    categories.forEach((category) => {
      if (
        categoryTotals[category] > budgets[category] &&
        budgets[category] > 0
      ) {
        insights.push({
          message: `⚠ You’ve exceeded your budget for ${category}!`,
          type: "danger",
        });
      } else if (
        categoryTotals[category] == budgets[category] &&
        budgets[category] > 0
      ) {
        insights.push({
          message: `⚠ You have used 100% of your ${category} budget.`,
          type: "danger",
        });
      } else if (
        categoryTotals[category] > budgets[category] * 0.8 &&
        budgets[category] > 0
      ) {
        insights.push({
          message: `You have used 80% of your ${category} budget!`,
          type: "warning",
        });
      }
    });
    return insights;
  };
  const chartData = Object.keys(monthlyData)
    .sort((a, b) => {
      const [monthA, yearA] = a.split(" ");
      const [monthB, yearB] = b.split(" ");

      const dateA = new Date(`${monthA} 1, ${yearA}`).getTime();
      const dateB = new Date(`${monthB} 1, ${yearB}`).getTime();

      return dateA - dateB;
    })
    .map((month) => ({
      month,
      amount: monthlyData[month],
    }));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personal Finance Visualizer</h1>

      <div className={styles.buttonContainer}>
        <Button
          onClick={() => {
            setOpen(true);
            setEditingId(null);
            setForm({ amount: "", date: "", description: "", category: "" });
          }}
          className={`${styles.button} ${styles.buttonAdd}`}
        >
          Add Transaction
        </Button>
        <Button
          onClick={() => router.push("/pages/dashboard")}
          className={`${styles.button} ${styles.buttonDashboard}`}
        >
          Go to Dashboard
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={styles.dialogContent}
          onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing on outside click
        >
          <DialogTitle className={styles.dialogTitle}>
            {editingId !== null ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.dialogBody}>
            <Input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className={styles.input}
            />
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={styles.input}
            />
            <Input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={styles.input}
            />

            <Select
              value={form.category}
              onValueChange={(value) => setForm({ ...form, category: value })}
            >
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className={styles.selectContent}>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className={styles.selectItem}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={saveTransaction} className={styles.saveButton}>
              {editingId !== null ? "Update" : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <h2 style={{ marginBottom: "0px" }}>Transaction List</h2>
      <ul className={styles.transactionList}>
        {transactions.map((t) => (
          <li key={t.id} className={styles.transactionItem}>
            <span className={styles.transactionText}>
              {t.description} - Rs {t.amount} ({t.category})
            </span>
            <div className={styles.buttonContainerInline}>
              <Button
                onClick={() => editTransaction(t)}
                className={styles.editButton}
              >
                Edit
              </Button>
              <Button
                onClick={() => deleteTransaction(t.id)}
                className={styles.deleteButton}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.chartSection}>
        <h2 className={styles.chartTitle}>Monthly Expenses</h2>
        <ResponsiveContainer width="50%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis
              width={80}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.insightsSection}>
        <h2 className={styles.chartTitle}>Spending Insights</h2>
        {getSpendingInsights().length > 0 ? (
          <ul className="space-y-4">
            {getSpendingInsights().map((insight, index) => (
              <li
                key={index}
                className={`${styles.insightItem} ${
                  insight.type === "danger"
                    ? styles.insightDanger
                    : styles.insightWarning
                }`}
              >
                {insight.message}
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ fontSize: "15px" }}>
            No budgets set{" "}
            <span style={{ fontSize: "12px", fontStyle: "italic" }}>
              (to set budgets head to{" "}
              <a
                href="/pages/dashboard"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Dashboard
              </a>
              )
            </span>
            .
          </div>
        )}
      </div>
    </div>
  );
}
