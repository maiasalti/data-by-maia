"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from "recharts";
import data from "@/data/model-styles/avglength.json";
import { modelColors } from "./colors";

export default function AvgSentenceChart() {
  return (
    <div style={{ width: "100%", height: 450, marginBottom: "2rem" }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        📏 Average Sentence Length by Model
      </h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="model">
            <Label value="AI Model" offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis label={{ value: "Words per sentence", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="avg_sentence_length"
            radius={[6, 6, 0, 0]}
            fillOpacity={0.9}
            fill={({ payload }) => modelColors[payload.model]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
