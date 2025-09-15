"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const seasonalData = [
  { season: 'Winter', valence: 0.485, energy: 0.623, danceability: 0.634, acousticness: 0.247, count: 1232 },
  { season: 'Spring', valence: 0.552, energy: 0.699, danceability: 0.657, acousticness: 0.164, count: 1358 },
  { season: 'Summer', valence: 0.528, energy: 0.696, danceability: 0.637, acousticness: 0.145, count: 1448 },
  { season: 'Fall', valence: 0.484, energy: 0.646, danceability: 0.660, acousticness: 0.200, count: 1267 }
];

const nonSeasonalData = [
  { season: 'Winter', valence: 0.492, energy: 0.602, danceability: 0.635, acousticness: 0.333, count: 822 },
  { season: 'Spring', valence: 0.524, energy: 0.627, danceability: 0.642, acousticness: 0.289, count: 792 },
  { season: 'Summer', valence: 0.489, energy: 0.617, danceability: 0.628, acousticness: 0.273, count: 809 },
  { season: 'Fall', valence: 0.473, energy: 0.593, danceability: 0.658, acousticness: 0.313, count: 806 }
];

const monthlyTrends = [
  { month: 'Jan', seasonal: 0.487, nonSeasonal: 0.482 },
  { month: 'Feb', seasonal: 0.476, nonSeasonal: 0.488 },
  { month: 'Mar', seasonal: 0.511, nonSeasonal: 0.500 },
  { month: 'Apr', seasonal: 0.574, nonSeasonal: 0.540 },
  { month: 'May', seasonal: 0.570, nonSeasonal: 0.535 },
  { month: 'Jun', seasonal: 0.539, nonSeasonal: 0.517 },
  { month: 'Jul', seasonal: 0.541, nonSeasonal: 0.500 },
  { month: 'Aug', seasonal: 0.503, nonSeasonal: 0.456 },
  { month: 'Sep', seasonal: 0.468, nonSeasonal: 0.444 },
  { month: 'Oct', seasonal: 0.470, nonSeasonal: 0.462 },
  { month: 'Nov', seasonal: 0.512, nonSeasonal: 0.509 },
  { month: 'Dec', seasonal: 0.499, nonSeasonal: 0.509 }
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
        Spring peaks and fall/winter valleys show clear seasonal patterns
      </p>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            domain={[0.4, 0.6]}
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
        Tropical countries favor more acoustic music, seasonal countries prefer higher energy
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

export default function SpotifySeasonalAnalysis() {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ 
        color: '#fff', 
        textAlign: 'center', 
        fontSize: '36px', 
        marginBottom: '40px',
        fontWeight: 'bold'
      }}>
        Spotify Seasonal Music Analysis
      </h1>
      <ValenceComparisonChart />
      <SeasonalTrendLine />
      <AudioFeaturesRadar />
    </div>
  );
}