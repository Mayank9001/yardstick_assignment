"use client";
import { Progress } from "@/components/ui/progress";

interface BudgetProgressProps {
  category: string;
  spent: number;
  budget: number;
}

const BudgetProgress = ({ category, spent, budget }: BudgetProgressProps) => {
  const percentage = Math.min((spent / budget) * 100, 100);
  const isOverBudget = spent > budget;

  return (
    <div className="mb-4">
      <p className="font-medium">{category}</p>
      <Progress
        value={percentage}
        className={isOverBudget ? "bg-red-500" : "bg-blue-500"}
      />
      <p className={isOverBudget ? "text-red-500" : "text-gray-700"}>
        ${spent} spent / ${budget} budgeted
      </p>
    </div>
  );
};

export default BudgetProgress;
