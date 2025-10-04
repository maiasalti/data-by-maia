"use client";

import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

// Colors
const patriotsRed = '#C60C30';
const patriotsBlue = '#002244';

// Data
const playTypeData = [
  { type: 'Pass', td_rate: 49.47, int_rate: 1.43, fumble_rate: 0.54, avg_epa: -0.055 },
  { type: 'Run', td_rate: 55.69, int_rate: 0.00, fumble_rate: 1.36, avg_epa: 0.035 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'rgba(26,26,26,0.98)', padding: '12px', border: '2px solid #4A90E2', borderRadius: '8px' }}>
        <p style={{ margin: 0, fontWeight: 'bold', color: 'white' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: '4px 0', color: entry.color }}>
            {entry.value.toFixed(2)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Touchdown Rate Chart
export const TouchdownRateChart = () => {
  const tdData = playTypeData.map(item => ({
    type: item.type,
    rate: item.td_rate
  }));

  return (
    <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '12px', margin: '30px 0', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
      <h3 style={{ color: 'white', textAlign: 'center', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>
        Touchdown Success Rate: Run vs Pass
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={tdData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="type" stroke="#999" />
          <YAxis stroke="#999" domain={[0, 60]} label={{ value: 'TD Rate (%)', angle: -90, position: 'insideLeft', fill: '#999' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
            {tdData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={entry.type === 'Run' ? patriotsBlue : patriotsRed}
              />
            ))}
            <LabelList 
              dataKey="rate" 
              position="top" 
              fill="#fff"
              fontSize={16}
              fontWeight="bold"
              formatter={(value) => `${value.toFixed(1)}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: '#ccc', marginTop: '20px', marginBottom: 0 }}>
        Run plays score touchdowns 6.2 percentage points more often (55.7% vs 49.5%)
      </p>
    </div>
  );
};

// Interception Rate Chart - Comparison Display
export const InterceptionRateChart = () => {
  return (
    <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '12px', margin: '30px 0', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
      <h3 style={{ color: 'white', textAlign: 'center', marginTop: 0, marginBottom: '30px', fontSize: '20px' }}>
        Interception Risk
      </h3>
      
      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
        {/* Pass Play */}
        <div style={{ textAlign: 'center', flex: 1, maxWidth: '300px' }}>
          <div style={{ 
            background: `linear-gradient(135deg, ${patriotsRed} 0%, #8B0000 100%)`,
            borderRadius: '12px',
            padding: '40px',
            border: `3px solid ${patriotsRed}`,
            boxShadow: '0 8px 16px rgba(198, 12, 48, 0.3)'
          }}>
            <div style={{ fontSize: '4em', fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>
              1.43%
            </div>
            <div style={{ fontSize: '1.2em', color: 'white', fontWeight: '600' }}>Pass Plays</div>
            <div style={{ fontSize: '0.9em', color: '#ffcccc', marginTop: '10px' }}>16 interceptions<br/>out of 1,122 attempts</div>
          </div>
        </div>

        {/* Run Play */}
        <div style={{ textAlign: 'center', flex: 1, maxWidth: '300px' }}>
          <div style={{ 
            background: `linear-gradient(135deg, ${patriotsBlue} 0%, #001133 100%)`,
            borderRadius: '12px',
            padding: '40px',
            border: `3px solid ${patriotsBlue}`,
            boxShadow: '0 8px 16px rgba(0, 34, 68, 0.3)'
          }}>
            <div style={{ fontSize: '4em', fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>
              0%
            </div>
            <div style={{ fontSize: '1.2em', color: 'white', fontWeight: '600' }}>Run Plays</div>
            <div style={{ fontSize: '0.9em', color: '#b3d9ff', marginTop: '10px' }}>0 interceptions<br/>out of 2,801 attempts</div>
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#0d0d0d', 
        padding: '20px', 
        borderRadius: '8px',
        borderLeft: `4px solid ${patriotsRed}`
      }}>
        <p style={{ color: 'white', margin: 0, fontSize: '16px', textAlign: 'center' }}>
          <strong>The Malcolm Butler interception was part of a 1.43% risk that only exists when passing.</strong><br/>
          <span style={{ color: '#ccc', fontSize: '14px' }}>Running the ball eliminates this risk entirely.</span>
        </p>
      </div>
    </div>
  );
};

// Fumble Rate Chart
export const FumbleRateChart = () => {
  const fumbleData = playTypeData.map(item => ({
    type: item.type,
    rate: item.fumble_rate
  }));

  return (
    <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '12px', margin: '30px 0', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
      <h3 style={{ color: 'white', textAlign: 'center', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>
        Fumble Risk
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={fumbleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="type" stroke="#999" />
          <YAxis stroke="#999" domain={[0, 2]} label={{ value: 'Fumble Rate (%)', angle: -90, position: 'insideLeft', fill: '#999' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
            {fumbleData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={entry.type === 'Run' ? patriotsBlue : patriotsRed}
              />
            ))}
            <LabelList 
              dataKey="rate" 
              position="top" 
              fill="#fff"
              fontSize={16}
              fontWeight="bold"
              formatter={(value) => `${value.toFixed(2)}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: '#ccc', marginTop: '20px', marginBottom: 0 }}>
        Run plays have a slightly higher fumble rate (1.36% vs 0.54%), but this is still lower than passing's total turnover risk
      </p>
    </div>
  );
};

// EPA Chart
export const EPAChart = () => {
  const epaData = playTypeData.map(item => ({
    type: item.type,
    epa: item.avg_epa
  }));

  return (
    <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '12px', margin: '30px 0', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
      <h3 style={{ color: 'white', textAlign: 'center', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>
        Expected Points Added (EPA): Run vs Pass
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={epaData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="type" stroke="#999" />
          <YAxis stroke="#999" domain={[-0.1, 0.05]} label={{ value: 'Average EPA', angle: -90, position: 'insideLeft', fill: '#999' }} />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div style={{ background: 'rgba(26,26,26,0.98)', padding: '12px', border: '2px solid #4A90E2', borderRadius: '8px' }}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: 'white' }}>{label}</p>
                    <p style={{ margin: '4px 0', color: payload[0].color }}>
                      {payload[0].value.toFixed(3)}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="epa" radius={[8, 8, 0, 0]}>
            {epaData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={entry.type === 'Run' ? patriotsBlue : patriotsRed}
              />
            ))}
            <LabelList 
              dataKey="epa" 
              position="top" 
              fill="#fff"
              fontSize={16}
              fontWeight="bold"
              formatter={(value) => value.toFixed(3)}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: '#ccc', marginTop: '20px', marginBottom: 0 }}>
        Run plays generate positive EPA (+0.035) while pass plays generate negative EPA (-0.055)
      </p>
    </div>
  );
};

// Turnover Rate Chart
export const TurnoverRateChart = () => {
  const turnoverData = playTypeData.map(item => ({
    type: item.type,
    rate: item.int_rate + item.fumble_rate
  }));

  return (
    <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '12px', margin: '30px 0', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
      <h3 style={{ color: 'white', textAlign: 'center', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>
        Total Turnover Risk
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={turnoverData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="type" stroke="#999" />
          <YAxis stroke="#999" domain={[0, 2]} label={{ value: 'Turnover Rate (%)', angle: -90, position: 'insideLeft', fill: '#999' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
            {turnoverData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={entry.type === 'Run' ? patriotsBlue : patriotsRed}
              />
            ))}
            <LabelList 
              dataKey="rate" 
              position="top" 
              fill="#fff"
              fontSize={16}
              fontWeight="bold"
              formatter={(value) => `${value.toFixed(2)}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: '#ccc', marginTop: '20px', marginBottom: 0 }}>
        Pass plays have a 1.78% total turnover rate vs 1.36% for runs (interceptions + fumbles combined)
      </p>
    </div>
  );
};