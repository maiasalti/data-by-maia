"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const seasonalData = [
  { season: 'Winter', valence: 0.489, energy: 0.677, danceability: 0.680, acousticness: 0.227, count: 865 },
  { season: 'Spring', valence: 0.558, energy: 0.698, danceability: 0.662, acousticness: 0.199, count: 1607 },
  { season: 'Summer', valence: 0.533, energy: 0.664, danceability: 0.641, acousticness: 0.246, count: 1622 },
  { season: 'Fall', valence: 0.525, energy: 0.662, danceability: 0.643, acousticness: 0.258, count: 1502 }
];

const nonSeasonalData = [
  { season: 'Winter', valence: 0.521, energy: 0.659, danceability: 0.701, acousticness: 0.262, count: 727 },
  { season: 'Spring', valence: 0.563, energy: 0.687, danceability: 0.675, acousticness: 0.228, count: 1363 },
  { season: 'Summer', valence: 0.546, energy: 0.665, danceability: 0.661, acousticness: 0.265, count: 1375 },
  { season: 'Fall', valence: 0.527, energy: 0.655, danceability: 0.652, acousticness: 0.281, count: 1134 }
];

const monthlyTrends = [
  { month: 'Jan', seasonal: 0.483, nonSeasonal: 0.525 },
  { month: 'Feb', seasonal: 0.496, nonSeasonal: 0.520 },
  { month: 'Mar', seasonal: 0.555, nonSeasonal: 0.549 },
  { month: 'Apr', seasonal: 0.570, nonSeasonal: 0.578 },
  { month: 'May', seasonal: 0.550, nonSeasonal: 0.563 },
  { month: 'Jun', seasonal: 0.542, nonSeasonal: 0.556 },
  { month: 'Jul', seasonal: 0.523, nonSeasonal: 0.542 },
  { month: 'Aug', seasonal: 0.534, nonSeasonal: 0.535 },
  { month: 'Sep', seasonal: 0.521, nonSeasonal: 0.534 },
  { month: 'Oct', seasonal: 0.522, nonSeasonal: 0.527 },
  { month: 'Nov', seasonal: 0.538, nonSeasonal: 0.509 },
  { month: 'Dec', seasonal: 0, nonSeasonal: 0.433 }
];

export function ValenceComparisonChart() {
  const combinedData = seasonalData.map((seasonal, index) => ({
    season: seasonal.season,
    seasonal: seasonal.valence,
    nonSeasonal: nonSeasonalData[index].valence
  }));

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', 
      padding: '30px', 
      borderRadius: '15px',
      margin: '30px 0',
      border: '1px solid #333'
    }}>
      <h3 style={{ 
        color: '#fff', 
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '24px',
        fontWeight: '600'
      }}>
        Musical Happiness by Season
      </h3>
      <p style={{ 
        color: '#ccc', 
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '16px'
      }}>
        Comparing valence (musical happiness) between seasonal and tropical countries
      </p>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="season" 
            stroke="#fff"
            fontSize={14}
            axisLine={{ stroke: '#fff' }}
            tickLine={{ stroke: '#fff' }}
          />
          <YAxis 
            stroke="#fff"
            fontSize={12}
            axisLine={{ stroke: '#fff' }}
            tickLine={{ stroke: '#fff' }}
            domain={[0.45, 0.6]}
            label={{ 
              value: 'Valence Score', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: '#fff', fontSize: '14px' }
            }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: '1px solid #ff1493',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value, name) => [
              (value * 100).toFixed(1) + '%', 
              name === 'seasonal' ? 'Seasonal Countries' : 'Tropical Countries'
            ]}
          />
          <Bar 
            dataKey="seasonal" 
            fill="#ff1493"
            name="seasonal"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="nonSeasonal" 
            fill="#00ff7f"
            name="nonSeasonal"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        gap: '30px',
        marginTop: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '15px', 
            height: '15px', 
            backgroundColor: '#ff1493', 
            borderRadius: '3px' 
          }}></div>
          <span style={{ color: '#fff', fontSize: '14px' }}>Seasonal Countries</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '15px', 
            height: '15px', 
            backgroundColor: '#00ff7f', 
            borderRadius: '3px' 
          }}></div>
          <span style={{ color: '#fff', fontSize: '14px' }}>Tropical Countries</span>
        </div>
      </div>
    </div>
  );
}

export function SeasonalTrendLine() {
  const trendData = monthlyTrends.filter(item => item.seasonal > 0);

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', 
      padding: '30px', 
      borderRadius: '15px',
      margin: '30px 0',
      border: '1px solid #333'
    }}>
      <h3 style={{ 
        color: '#fff', 
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '24px',
        fontWeight: '600'
      }}>
        Monthly Happiness Patterns
      </h3>
      <p style={{ 
        color: '#ccc', 
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '16px'
      }}>
        The January-February dip vs. spring peak in April
      </p>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="#fff"
            fontSize={14}
            axisLine={{ stroke: '#fff' }}
            tickLine={{ stroke: '#fff' }}
          />
          <YAxis 
            stroke="#fff"
            fontSize={12}
            axisLine={{ stroke: '#fff' }}
            tickLine={{ stroke: '#fff' }}
            domain={[0.45, 0.6]}
            label={{ 
              value: 'Valence Score', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: '#fff', fontSize: '14px' }
            }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: '1px solid #ff6600',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value, name) => [
              (value * 100).toFixed(1) + '%', 
              name === 'seasonal' ? 'Seasonal Countries' : 'Tropical Countries'
            ]}
          />
          <Line
            type="monotone"
            dataKey="seasonal"
            stroke="#ff1493"
            strokeWidth={4}
            dot={{ fill: '#ff1493', r: 6 }}
            activeDot={{ r: 8, fill: '#ff1493' }}
          />
          <Line
            type="monotone"
            dataKey="nonSeasonal"
            stroke="#00ff7f"
            strokeWidth={4}
            dot={{ fill: '#00ff7f', r: 6 }}
            activeDot={{ r: 8, fill: '#00ff7f' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AudioFeaturesRadar() {

  const seasonalAvg = {
    valence: seasonalData.reduce((sum, s) => sum + s.valence, 0) / 4,
    energy: seasonalData.reduce((sum, s) => sum + s.energy, 0) / 4,
    danceability: seasonalData.reduce((sum, s) => sum + s.danceability, 0) / 4,
    acousticness: seasonalData.reduce((sum, s) => sum + s.acousticness, 0) / 4
  };
  
  const nonSeasonalAvg = {
    valence: nonSeasonalData.reduce((sum, s) => sum + s.valence, 0) / 4,
    energy: nonSeasonalData.reduce((sum, s) => sum + s.energy, 0) / 4,
    danceability: nonSeasonalData.reduce((sum, s) => sum + s.danceability, 0) / 4,
    acousticness: nonSeasonalData.reduce((sum, s) => sum + s.acousticness, 0) / 4
  };

  const radarData = [
    { feature: 'Happiness', seasonal: seasonalAvg.valence, nonSeasonal: nonSeasonalAvg.valence, fullMark: 1 },
    { feature: 'Energy', seasonal: seasonalAvg.energy, nonSeasonal: nonSeasonalAvg.energy, fullMark: 1 },
    { feature: 'Danceability', seasonal: seasonalAvg.danceability, nonSeasonal: nonSeasonalAvg.danceability, fullMark: 1 },
    { feature: 'Acousticness', seasonal: seasonalAvg.acousticness, nonSeasonal: nonSeasonalAvg.acousticness, fullMark: 1 }
  ];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', 
      padding: '30px', 
      borderRadius: '15px',
      margin: '30px 0',
      border: '1px solid #333'
    }}>
      <h3 style={{ 
        color: '#fff', 
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '24px',
        fontWeight: '600'
      }}>
        Audio Feature Comparison
      </h3>
      <p style={{ 
        color: '#ccc', 
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '16px'
      }}>
        Seasonal countries show higher acousticness, tropical countries have more danceability
      </p>
      
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          <PolarGrid stroke="rgba(255,255,255,0.2)" />
          <PolarAngleAxis 
            dataKey="feature" 
            tick={{ fill: '#fff', fontSize: 14 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 1]} 
            tick={{ fill: '#fff', fontSize: 12 }}
            tickCount={6}
            label={{ 
              value: 'Score (0-1)', 
              position: 'insideTopLeft',
              style: { textAnchor: 'middle', fill: '#fff', fontSize: '12px' }
            }}
          />
          <Radar
            name="Seasonal"
            dataKey="seasonal"
            stroke="#ff1493"
            fill="#ff1493"
            fillOpacity={0.2}
            strokeWidth={3}
          />
          <Radar
            name="Tropical"
            dataKey="nonSeasonal"
            stroke="#00ff7f"
            fill="#00ff7f"
            fillOpacity={0.2}
            strokeWidth={3}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        gap: '30px',
        marginTop: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '15px', 
            height: '15px', 
            backgroundColor: '#ff1493', 
            borderRadius: '50%' 
          }}></div>
          <span style={{ color: '#fff', fontSize: '14px' }}>Seasonal Countries</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '15px', 
            height: '15px', 
            backgroundColor: '#00ff7f', 
            borderRadius: '50%' 
          }}></div>
          <span style={{ color: '#fff', fontSize: '14px' }}>Tropical Countries</span>
        </div>
      </div>
    </div>
  );
}