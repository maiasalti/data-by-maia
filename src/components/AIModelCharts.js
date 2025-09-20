"use client";

import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from 'recharts';

const sentenceLengthData = [
  { model: 'GPT', avgLength: 15.90, sentenceCount: 258 },
  { model: 'Gemini', avgLength: 12.58, sentenceCount: 305 },
  { model: 'Claude', avgLength: 14.59, sentenceCount: 232 }
];

const sentimentData = [
  { model: 'GPT', positive: 62.5, negative: 37.5, positiveWords: 40, negativeWords: 24 },
  { model: 'Claude', positive: 72.73, negative: 27.27, positiveWords: 40, negativeWords: 15 },
  { model: 'Gemini', positive: 53.12, negative: 46.88, positiveWords: 34, negativeWords: 30 }
];

const connectorData = [
  { connector: 'And', GPT: 34.83, Gemini: 45.45, Claude: 33.65 },
  { connector: 'But', GPT: 13.45, Gemini: 10.61, Claude: 11.37 },
  { connector: 'As', GPT: 9.31, Gemini: 3.03, Claude: 13.74 },
  { connector: 'While', GPT: 3.10, Gemini: 2.02, Claude: 6.16 },
  { connector: 'Like', GPT: 5.17, Gemini: 5.05, Claude: 4.27 },
  { connector: 'So', GPT: 5.17, Gemini: 4.55, Claude: 2.37 }
];

const punctuationData = [
  { punctuation: 'Comma', GPT: 52.22, Gemini: 42.71, Claude: 39.61 },
  { punctuation: 'Period', GPT: 37.82, Gemini: 45.45, Claude: 39.8 },
  { punctuation: 'Em dash', GPT: 3.96, Gemini: 0.51, Claude: 7.06 },
  { punctuation: 'Question', GPT: 2.22, Gemini: 5.49, Claude: 5.29 },
  { punctuation: 'Ellipsis', GPT: 0.0, Gemini: 0.51, Claude: 2.35 }
];

const COLORS = {
  GPT: '#10b981',
  Gemini: '#3b82f6',  
  Claude: '#f59e0b'
};


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
   
    const sortedPayload = payload.sort((a, b) => {
      const order = { GPT: 0, Gemini: 1, Claude: 2 };
      return order[a.dataKey] - order[b.dataKey];
    });

    return (
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.9)',
        border: '1px solid #10b981',
        borderRadius: '8px',
        padding: '12px',
        color: '#fff'
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{label}</p>
        {sortedPayload.map((entry, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            margin: '4px 0',
            fontSize: '14px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: COLORS[entry.dataKey],
              borderRadius: '2px',
              marginRight: '8px'
            }}></div>
            <span style={{ color: '#fff' }}>
              {entry.dataKey}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};


const StackedTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.9)',
        border: '1px solid #10b981',
        borderRadius: '8px',
        padding: '12px',
        color: '#fff'
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{label}</p>
        {payload.map((entry, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            margin: '4px 0',
            fontSize: '14px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: entry.color,
              borderRadius: '2px',
              marginRight: '8px'
            }}></div>
            <span style={{ color: '#fff' }}>
              {entry.dataKey === 'positive' ? 'Positive' : 'Negative'}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};


function useScrollTransition(elementRef, transitions, isMobile = false) {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));
      
      // Adjust thresholds for mobile to prevent jumping to cut-off views
      let stateIndex;
      if (isMobile) {
        // More balanced thresholds for mobile
        if (scrollProgress < 0.6) stateIndex = 0;
        else stateIndex = 1;
      } else {
        // Original logic for desktop
        stateIndex = Math.floor((scrollProgress - 0.1) * transitions);
      }
      
      setCurrentState(Math.min(stateIndex, transitions - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transitions, elementRef, isMobile]);

  return currentState;
}

function useScrollTransition3State(elementRef) {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));
      
     
      let stateIndex;
      if (scrollProgress < 0.55) stateIndex = 0;      
      else if (scrollProgress < 0.65) stateIndex = 1;
      else stateIndex = 2;                           
      
      setCurrentState(stateIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  return currentState;
}

export function ScrollingSentenceChart() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentState = useScrollTransition(containerRef, 2, isMobile);

  const chartData = sentenceLengthData.map(item => ({
    model: item.model,
    value: currentState === 0 ? item.sentenceCount : item.avgLength,
    label: currentState === 0 ? `${item.sentenceCount} sentences` : `${item.avgLength.toFixed(1)} words`
  }));

  const yAxisDomain = currentState === 0 ? [200, 320] : [10, 18];
  const barColor = currentState === 0 ? '#3b82f6' : '#10b981';
  const title = currentState === 0 ? 'Total Sentences Written' : 'Average Sentence Length';
  const subtitle = currentState === 0 ? 
    'Gemini writes the most sentences overall' : 
    'GPT uses the longest sentences';

  return (
    <div 
      ref={containerRef}
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', 
        padding: '30px', 
        borderRadius: '15px',
        margin: '30px 0',
        border: '1px solid #333',
        minHeight: '120vh'
      }}
    >
      <div style={{ position: 'sticky', top: '50px' }}>
        <h3 style={{ 
          color: '#fff', 
          textAlign: 'center',
          marginBottom: '15px',
          fontSize: '24px',
          fontWeight: '600',
          transition: 'all 0.5s ease'
        }}>
          {title}
        </h3>
        <p style={{ 
          color: '#ccc', 
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '16px',
          transition: 'all 0.5s ease'
        }}>
          {subtitle}
        </p>
        
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="model" 
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
              domain={yAxisDomain}
            />
           <Tooltip 
  contentStyle={{
    backgroundColor: 'rgba(0,0,0,0.9)',
    border: `1px solid ${barColor}`,
    borderRadius: '8px',
    color: '#fff'
  }}
  labelStyle={{
    color: '#fff'
  }}
  itemStyle={{
    color: '#fff'
  }}
  formatter={(value) => [chartData.find(d => d.value === value)?.label || value, title]}
/>
            <Bar 
  dataKey="value" 
  radius={[4, 4, 0, 0]}
>
  {chartData.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[entry.model]} />
  ))}
  <LabelList 
    dataKey="value" 
    position="top" 
    fill="#fff"
    fontSize={14}
    formatter={(value) => chartData.find(d => d.value === value)?.label || value}
  />
</Bar>
          </BarChart>
        </ResponsiveContainer>

        {}
        <div style={{
          marginTop: '30px',
          padding: '0 20px',
          color: '#ccc',
          fontSize: '16px',
          lineHeight: '1.6',
          textAlign: 'center',
          minHeight: '120px'
        }}>
          {currentState === 0 && (
            <p><strong>Gemini wins the sentence count race</strong> with a whopping 47-sentence lead above GPT and 73 above Claude.</p>
          )}
          {currentState === 1 && (
            <div>
              <p><strong>However, GPT emerges as the lengthiest writer</strong>, averaging 15.9 words per sentence. That&apos;s nearly 3 words longer than Gemini&apos;s more concise 12.6 words. Claude sits in the middle at 14.6 words per sentence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ScrollingSentimentChart() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentState = useScrollTransition(containerRef, 2, isMobile);
  const isStackedChart = currentState === 0;

  const stackedData = sentimentData;

  const createModelPieData = (modelName) => {
    const modelData = sentimentData.find(item => item.model === modelName);
    return [
      { name: 'Positive', value: modelData.positive, type: 'positive' },
      { name: 'Negative', value: modelData.negative, type: 'negative' }
    ];
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', 
        padding: '20px', 
        borderRadius: '15px',
        margin: '30px 0',
        border: '1px solid #333',
        minHeight: isMobile ? '200vh' : '120vh'
      }}
    >
      <div style={{ position: 'sticky', top: '70px' }}>
        <h3 style={{ 
          color: '#fff', 
          textAlign: 'center',
          marginBottom: '15px',
          marginTop: '50px',
          fontSize: '24px',
          fontWeight: '600'
        }}>
          {isStackedChart ? 'Sentiment by Model' : 'Individual Model Sentiment Breakdown'}
        </h3>
        <p style={{ 
          color: '#ccc', 
          textAlign: 'center',
          marginBottom: '40px',
          marginTop: '30px',
          fontSize: '16px'
        }}>
          {isStackedChart ? 'Claude is the most optimistic AI' : 'Positive vs negative language for each model'}
        </p>
        
        {isStackedChart ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={stackedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="model" 
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
                domain={[0, 100]}
              />
              <Tooltip content={<StackedTooltip />} />
              <Bar dataKey="positive" stackId="sentiment" fill="#10b981" radius={[0, 0, 0, 0]}>
                <LabelList 
                  dataKey="positive" 
                  position="center" 
                  fill="#fff" 
                  fontSize={14} 
                  formatter={(value) => `${value}%`} 
                />
              </Bar>
              <Bar dataKey="negative" stackId="sentiment" fill="#ef4444" radius={[4, 4, 0, 0]}>
                <LabelList 
                  dataKey="negative" 
                  position="center" 
                  fill="#fff" 
                  fontSize={14} 
                  formatter={(value) => `${value}%`} 
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: isMobile ? 'flex-start' : 'space-around', 
            alignItems: 'center', 
            height: isMobile ? '900px' : '400px', 
            marginTop: isMobile ? '0px' : '-50px',
            gap: isMobile ? '50px' : '0',
            overflow: isMobile ? 'visible' : 'hidden',
            paddingTop: isMobile ? '20px' : '0'
          }}>
            {['GPT', 'Claude', 'Gemini'].map((modelName) => (
              <div key={modelName} style={{ 
                textAlign: 'center',
                width: isMobile ? '100%' : 'auto',
                flex: isMobile ? 'none' : 'auto'
              }}>
                <h4 style={{ 
                  color: '#fff', 
                  marginBottom: '15px', 
                  fontSize: '18px' 
                }}>{modelName}</h4>
                <ResponsiveContainer 
                  width={isMobile ? '100%' : 200} 
                  height={isMobile ? 240 : 200}
                >
                  <PieChart>
                    <Pie
                        data={createModelPieData(modelName)}
                        cx="50%"
                        cy="50%"
                        outerRadius={isMobile ? 90 : 80}
                        dataKey="value"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            
                            return (
                            <text 
                                x={x} 
                                y={y} 
                                fill='#fff' 
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize="14"
                                fontWeight="bold"
                            >
                                {`${value}%`}
                            </text>
                            );
                        }}
                        labelLine={false}
                        >
                      {createModelPieData(modelName).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === 0 ? '#10b981' : '#ef4444'}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        border: '1px solid #10b981',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value) => [`${value}%`]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        )}
        
        <div style={{
          marginTop: '30px',
          padding: '0 20px',
          color: '#ccc',
          fontSize: '16px',
          lineHeight: '1.6',
          textAlign: 'center',
          minHeight: '120px'
        }}>
          {isStackedChart && (
            <div>
              <p>The emotional analysis reveals large personality differences:</p>
              <p><strong>Claude is the most optimistic</strong>, with 72.7% of its emotional language skewing positive.</p>
            </div>
          )}
          {!isStackedChart && (
            <div>
              <p><strong>GPT sits in the middle</strong> at 62.5% positive, striking a balanced tone that feels neither overly cheerful nor pessimistic.</p>
              
              <p><strong>Gemini is surprisingly the most neutral</strong>, with only 53.1% positive language, the closest to a 50/50 split. This suggests Gemini aims for objectivity, even at the cost of warmth.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ScrollingConnectorChart() {
  const containerRef = useRef(null);
  const currentState = useScrollTransition3State(containerRef);

 
  const getDataForState = (state) => {
    switch(state) {
      case 0: return connectorData.slice(0, 2);
      case 1: return connectorData.slice(0, 4);
      case 2: return connectorData;
      default: return connectorData;
    }
  };

  const titles = [
    'Most Common Connectors',
    'Adding More Connectors', 
    'Adding More Connectors'
  ];

  const subtitles = [
    'The most frequently used connecting words',
    '',
    'The Full picture'
  ];

  return (
    <div 
      ref={containerRef}
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', 
        padding: '30px', 
        borderRadius: '15px',
        margin: '30px 0',
        border: '1px solid #333',
        minHeight: '150vh'
      }}
    >
      <div style={{ position: 'sticky', top: '50px' }}>
        <h3 style={{ 
          color: '#fff', 
          textAlign: 'center',
          marginBottom: '15px',
          fontSize: '24px',
          fontWeight: '600',
          transition: 'all 0.5s ease'
        }}>
          {titles[currentState]}
        </h3>
        <p style={{ 
          color: '#ccc', 
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '16px',
          transition: 'all 0.5s ease'
        }}>
          {subtitles[currentState]}
        </p>
        
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={getDataForState(currentState)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="connector" 
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="GPT" fill={COLORS.GPT} radius={[2, 2, 0, 0]} />
            <Bar dataKey="Gemini" fill={COLORS.Gemini} radius={[2, 2, 0, 0]} />
            <Bar dataKey="Claude" fill={COLORS.Claude} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
            {}
        <div style={{
        marginTop: '30px',
        padding: '0 20px',
        color: '#ccc',
        fontSize: '16px',
        lineHeight: '1.6',
        textAlign: 'center',
        minHeight: '80px'
        }}>
        {currentState === 0 && (
            <p><strong>Gemini loves &quot;and&quot;</strong>, using it in 45.5% of connecting situations, making it the most straightforward and additive in building arguments. It also frequently uses &quot;then&quot; (4.55%) and &quot;now&quot; (3.54%).</p>
        )}
        {currentState === 1 && (
            <p><strong>Claude shows the most sophisticated transitions</strong>, using &quot;as&quot; (13.74%) and &quot;while&quot; (6.16%) much more than the others, creating more nuanced relationships between ideas. It rarely relies on simple &quot;and&quot; connections (33.65%).</p>
        )}
        {currentState === 2 && (
            <p>Finally, relatively even distribution on connectors &quot;like&quot; and &quot;so&quot;.</p>
        )}
        </div>
      </div>
    </div>
  );
}

export function ScrollingPunctuationChart() {
  const containerRef = useRef(null);
  const currentState = useScrollTransition3State(containerRef);

  const getDataForState = (state) => {
    switch(state) {
      case 0: return punctuationData.slice(0, 2);
      case 1: return punctuationData.slice(0, 4); 
      case 2: return punctuationData; 
      default: return punctuationData;
    }
  };

  const titles = [
    'Most Common Punctuation',
    'Adding More Punctuation',
    'Complete Punctuation Profile'
  ];

  const subtitles = [
    'The most frequently used punctuation marks',
    'Expanding the punctuation analysis',
    'Full punctuation personality of each model'
  ];

  return (
    <div 
      ref={containerRef}
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', 
        padding: '30px', 
        borderRadius: '15px',
        margin: '30px 0',
        border: '1px solid #333',
        minHeight: '150vh'
      }}
    >
      <div style={{ position: 'sticky', top: '50px' }}>
        <h3 style={{ 
          color: '#fff', 
          textAlign: 'center',
          marginBottom: '15px',
          fontSize: '24px',
          fontWeight: '600',
          transition: 'all 0.5s ease'
        }}>
          {titles[currentState]}
        </h3>
        <p style={{ 
          color: '#ccc', 
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '16px',
          transition: 'all 0.5s ease'
        }}>
          {subtitles[currentState]}
        </p>
        
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={getDataForState(currentState)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="punctuation" 
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="GPT" fill={COLORS.GPT} radius={[2, 2, 0, 0]} />
            <Bar dataKey="Gemini" fill={COLORS.Gemini} radius={[2, 2, 0, 0]} />
            <Bar dataKey="Claude" fill={COLORS.Claude} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        
        {}
        <div style={{
          marginTop: '30px',
          padding: '0 20px',
          color: '#ccc',
          fontSize: '16px',
          lineHeight: '1.6',
          textAlign: 'center',
          minHeight: '120px'
        }}>
          {currentState === 0 && (
            <p><strong>GPT overuses commas</strong>  at 52.22%, significantly higher than Gemini (42.71%) or Claude (39.61%). The frequent comma occurrence might be due to the longer sentences on average that the OpenAI model uses, as it tries to pack more into each sentence.</p>
          )}
          {currentState === 1 && (
            <p>Punctuation reveals the most subtle personality differences.<strong>Claude is the em-dash expert</strong>,(I honestly thought GPT would own that title), using them 7.06% of the time compared to GPT&apos;s 3.96% and Gemini&apos;s mere 0.51%.</p>
          )}
          {currentState === 2 && (
            <p><strong>Gemini asks the most questions</strong> (5.49% question marks) and uses the most periods (45.45%), emphasising its direct, clear communication style. Meanwhile, Claude uses ellipses 2.35% of the time, more than double the others, adding a more dramatic pause or cliffhanger to its writing.</p>
          )}
        </div>
      </div>
      </div>
  );
}

export const SentenceLengthComparison = ScrollingSentenceChart;
export const SentimentAnalysis = ScrollingSentimentChart;
export const ConnectorWordsAnalysis = ScrollingConnectorChart;
export const PunctuationAnalysis = ScrollingPunctuationChart;