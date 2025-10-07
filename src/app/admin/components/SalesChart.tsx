"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesChart() {
  const [data, setData] = useState([]);
  const [days, setDays] = useState(7);

  useEffect(() => {
    fetch(`/api/admin/sales?days=${days}`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData([]));
  }, [days]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          🍽️ Top Sold Dishes (Last {days} Days)
        </h2>

        <select
          className="border rounded-lg px-3 py-2 text-gray-700"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        >
          <option value="7">7 Days</option>
          <option value="10">10 Days</option>
          <option value="15">15 Days</option>
          <option value="30">30 Days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_sold" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
