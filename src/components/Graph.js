"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 55 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 70 },
];

export default function Graph() {
  return (
    <LineChart width={400} height={300} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}
