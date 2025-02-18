"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BudgetFormProps {
  onSave: (budgets: Record<string, number>) => void;
}

const BudgetForm = ({ onSave }: BudgetFormProps) => {
  const [budgets, setBudgets] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedBudgets = JSON.parse(localStorage.getItem("budgets") || "{}");
    setBudgets(savedBudgets);
  }, []);

  const handleChange = (category: string, value: string) => {
    setBudgets({ ...budgets, [category]: Number(value) });
  };

  const handleSave = () => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
    onSave(budgets); // Notify parent component
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Set Monthly Budgets</h2>
      {["Food", "Transport", "Entertainment", "Shopping", "Bills", "Other"].map(
        (category) => (
          <div key={category} className="flex items-center gap-4 mb-2">
            <p className="w-24">{category}:</p>
            <Input
              type="number"
              value={budgets[category] || ""}
              onChange={(e) => handleChange(category, e.target.value)}
              placeholder="Enter budget"
            />
          </div>
        )
      )}
      <Button onClick={handleSave} className="mt-2">
        Save Budgets
      </Button>
    </div>
  );
};

export default BudgetForm;
