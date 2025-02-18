"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { FC } from "react";

interface BudgetChartProps {
  budgetData: { category: string; budget: number; spent: number }[];
}

const BudgetChart: FC<BudgetChartProps> = ({ budgetData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={budgetData}>
        <XAxis dataKey="category" />
        <YAxis width={80} tickFormatter={(value) => value.toLocaleString()} />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#8884d8" name="Budget" />
        <Bar dataKey="spent" fill="#ff7f7f" name="Spent" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetChart;
