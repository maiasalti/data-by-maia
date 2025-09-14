"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from "recharts";
import data from "@/data/model-styles/connector.json";
import { modelColors } from "./colors";

export default function ConnectorsChart() {
  return (
    <div style={{ width: "100%", height: 500, marginBottom: "2rem" }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        🔗 Most Common Connectors (% of all connectors)
      </h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="connector" angle={-30} textAnchor="end" interval={0}>
            <Label value="Connector Phrase" offset={-20} position="insideBottom" />
          </XAxis>
          <YAxis label={{ value: "% of Connector Usage", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="pct_of_connectors" radius={[6, 6, 0, 0]} fillOpacity={0.9}
            fill={({ payload }) => modelColors[payload.model]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
