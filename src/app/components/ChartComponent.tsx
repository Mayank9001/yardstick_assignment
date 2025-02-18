"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface ChartComponentProps {
  data: { name: string; value: number; color: string }[];
}

export default function ChartComponent({ data }: ChartComponentProps) {
  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
