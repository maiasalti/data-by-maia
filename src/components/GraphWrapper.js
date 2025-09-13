"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { month: 'Jan', coolness: 1000, posts: 2400 },
  { month: 'Feb', coolness: 1300, posts: 1398 },
  { month: 'Mar', coolness: 1800, posts: 9800 },
  { month: 'Apr', coolness: 2300, posts: 3908 },
  { month: 'May', coolness: 2500, posts: 4800 },
  { month: 'Jun', coolness: 2900, posts: 3800 },
  { month: 'Jul', coolness: 3100, posts: 4300 },
  { month: 'Aug', coolness: 3500, posts: 5200 },
  { month: 'Sep', coolness: 5000, posts: 4100 },
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
        📈 Posts and Coolness of the Website
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
            dataKey="posts"
            stroke="#4ecdc4"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorUsers)"
          />
          <Area
            type="monotone"
            dataKey="coolness"
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
