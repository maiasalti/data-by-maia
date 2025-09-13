"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { month: 'Jan', revenue: 4000, users: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398 },
  { month: 'Mar', revenue: 2000, users: 9800 },
  { month: 'Apr', revenue: 2780, users: 3908 },
  { month: 'May', revenue: 1890, users: 4800 },
  { month: 'Jun', revenue: 2390, users: 3800 },
  { month: 'Jul', revenue: 3490, users: 4300 },
  { month: 'Aug', revenue: 4200, users: 5200 },
  { month: 'Sep', revenue: 3800, users: 4100 },
];

export default function Graph() {
  return (
    <div style={{ 
      padding: "24px", 
      background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", 
      borderRadius: "12px",
      margin: "24px 0",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
    }}>
      <h3 style={{ 
        color: "white", 
        margin: "0 0 20px 0",
        fontSize: "24px",
        fontWeight: "600"
      }}>
        📈 Revenue & User Growth
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ecdc4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4ecdc4" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis 
            dataKey="month" 
            stroke="white"
            fontSize={12}
          />
          <YAxis 
            stroke="white"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: 'none',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#4ecdc4"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorUsers)"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#ff6b6b"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div style={{ 
        display: "flex", 
        gap: "20px", 
        marginTop: "16px",
        justifyContent: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ 
            width: "12px", 
            height: "12px", 
            backgroundColor: "#ff6b6b", 
            borderRadius: "50%" 
          }}></div>
          <span style={{ color: "white", fontSize: "14px" }}>Revenue</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ 
            width: "12px", 
            height: "12px", 
            backgroundColor: "#4ecdc4", 
            borderRadius: "50%" 
          }}></div>
          <span style={{ color: "white", fontSize: "14px" }}>Users</span>
        </div>
      </div>
    </div>
  );
}
