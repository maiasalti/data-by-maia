"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ANNUAL_RETURN = 0.07;
const RETIREMENT_MILESTONES = [35, 45, 55, 65, 75];

const START_AGE_COLORS = [
  "#10b981", 
  "#3b82f6", 
  "#f59e0b",
  "#ef4444",
  "#8b5cf6", 
  "#ec4899", 
  "#14b8a6", 
  "#f97316", 
];

const calculateFutureValue = (contribution, years, contributionType) => {
  if (years <= 0 || !contribution || contribution <= 0) return 0;

  if (contributionType === "fixed") {
    return Math.round(contribution * Math.pow(1 + ANNUAL_RETURN, years));
  } else if (contributionType === "yearly") {
    const futureValue =
      contribution *
      ((Math.pow(1 + ANNUAL_RETURN, years) - 1) / ANNUAL_RETURN);
    return Math.round(futureValue);
  } else {
    const monthlyRate = ANNUAL_RETURN / 12;
    const months = years * 12;
    const futureValue =
      contribution *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    return Math.round(futureValue);
  }
};

const formatCurrency = (value) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

const formatCurrencyFull = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const getStartAges = (currentAge) => {
  const nextMultipleOf5 = Math.ceil(currentAge / 5) * 5;
  const startAges = [];
  for (let age = nextMultipleOf5; age <= 65; age += 5) {
    if (age > currentAge) {
      startAges.push(age);
    }
  }
  if (currentAge < 65 && currentAge !== nextMultipleOf5) {
    startAges.unshift(currentAge);
  } else if (currentAge <= 65 && currentAge === nextMultipleOf5) {
    startAges.unshift(currentAge);
  }
  return startAges;
};

const getVisibleMilestones = (currentAge) => {
  return RETIREMENT_MILESTONES.filter((milestone) => milestone > currentAge);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.9)",
          border: "1px solid #10b981",
          borderRadius: "8px",
          padding: "12px",
          color: "#fff",
        }}
      >
        <p style={{ margin: "0 0 8px 0", fontWeight: "bold" }}>Age {label}</p>
        {payload
          .sort((a, b) => b.value - a.value)
          .map((entry, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "4px 0",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: entry.color,
                  borderRadius: "2px",
                  marginRight: "8px",
                }}
              ></div>
              <span style={{ color: "#fff" }}>
                Start at {entry.name.replace("start", "")}: {formatCurrencyFull(entry.value)}
              </span>
            </div>
          ))}
      </div>
    );
  }
  return null;
};

export function PriceOfWaitingCalculator() {
  const [ageInput, setAgeInput] = useState("25");
  const [contributionInput, setContributionInput] = useState("200");
  const [contributionType, setContributionType] = useState("monthly");
  const [isMobile, setIsMobile] = useState(false);

  const parsedAge = parseInt(ageInput);
  const isValidAge = !isNaN(parsedAge) && parsedAge >= 18 && parsedAge < 65;
  const currentAge = isValidAge ? parsedAge : null;

  const contribution = parseInt(contributionInput) || 0;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const startAges = currentAge ? getStartAges(currentAge) : [];
  const visibleMilestones = currentAge ? getVisibleMilestones(currentAge) : [];

  const tableData = startAges.map((startAge) => {
    const row = { startAge };
    RETIREMENT_MILESTONES.forEach((milestone) => {
      const yearsInvesting = milestone - startAge;
      if (milestone > currentAge && yearsInvesting > 0) {
        row[`age${milestone}`] = calculateFutureValue(
          contribution,
          yearsInvesting,
          contributionType
        );
      } else {
        row[`age${milestone}`] = null;
      }
    });
    return row;
  });

  const generateChartData = () => {
    if (!currentAge) return [];
    const maxAge = 75;
    const data = [];

    for (let age = currentAge; age <= maxAge; age++) {
      const point = { age };
      startAges.forEach((startAge) => {
        const yearsInvesting = age - startAge;
        if (yearsInvesting >= 0) {
          point[`start${startAge}`] = calculateFutureValue(
            contribution,
            yearsInvesting,
            contributionType
          );
        }
      });
      data.push(point);
    }

    return data;
  };

  const chartData = generateChartData();

  const costOfWaiting =
    startAges.length >= 2 && visibleMilestones.includes(65)
      ? calculateFutureValue(contribution, 65 - startAges[0], contributionType) -
        calculateFutureValue(contribution, 65 - startAges[1], contributionType)
      : 0;

  const getContributionLabel = () => {
    switch (contributionType) {
      case "yearly":
        return "Yearly Contribution";
      case "fixed":
        return "One-Time Investment";
      default:
        return "Monthly Contribution";
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        padding: isMobile ? "20px" : "30px",
        borderRadius: "15px",
        margin: "30px 0",
        border: "1px solid #333",
      }}
    >
      {/* Header */}
      <h3
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "10px",
          fontSize: "24px",
          fontWeight: "600",
        }}
      >
        The Price of Waiting Calculator
      </h3>
      <p
        style={{
          color: "#ccc",
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "16px",
        }}
      >
        See how much delaying could cost you (assuming 7% annual return)
      </p>

      {/* Input Controls */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
          marginBottom: "40px",
        }}
      >
        {/* Age and Contribution Inputs Row */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* Current Age Input */}
          <div style={{ textAlign: "center" }}>
            <label
              style={{
                color: "#ccc",
                display: "block",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              Your Current Age
            </label>
            <input
              type="number"
              min="18"
              max="64"
              value={ageInput}
              onChange={(e) => setAgeInput(e.target.value)}
              style={{
                backgroundColor: "#2a2a2a",
                border: "1px solid #444",
                borderRadius: "8px",
                padding: "12px 20px",
                color: "#fff",
                fontSize: "18px",
                width: "120px",
                textAlign: "center",
              }}
            />
            {ageInput && !isValidAge && (
              <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "5px" }}>
                Please enter an age between 18 and 64
              </p>
            )}
          </div>

          {/* Contribution Input */}
          <div style={{ textAlign: "center" }}>
            <label
              style={{
                color: "#ccc",
                display: "block",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              {getContributionLabel()}
            </label>
            <div style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#888",
                  fontSize: "18px",
                }}
              >
                $
              </span>
              <input
                type="number"
                min="0"
                value={contributionInput}
                onChange={(e) => setContributionInput(e.target.value)}
                style={{
                  backgroundColor: "#2a2a2a",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  padding: "12px 20px 12px 30px",
                  color: "#fff",
                  fontSize: "18px",
                  width: "140px",
                  textAlign: "center",
                }}
              />
            </div>
          </div>
        </div>

        {/* Contribution Type Toggle */}
        <div style={{ textAlign: "center" }}>
          <label
            style={{
              color: "#ccc",
              display: "block",
              marginBottom: "10px",
              fontSize: "14px",
            }}
          >
            Contribution Frequency
          </label>
          <div
            style={{
              display: "flex",
              gap: "0",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #444",
            }}
          >
            {[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
              { value: "fixed", label: "One-Time" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setContributionType(option.value)}
                style={{
                  backgroundColor:
                    contributionType === option.value ? "#10b981" : "#2a2a2a",
                  color: contributionType === option.value ? "#000" : "#ccc",
                  border: "none",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: contributionType === option.value ? "600" : "400",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cost of Waiting Callout */}
      {costOfWaiting > 0 && startAges.length >= 2 && (
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid #ef4444",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#ccc", margin: "0 0 5px 0", fontSize: "14px" }}>
            Waiting until {startAges[1]} instead of starting at {startAges[0]}{" "}
            costs you:
          </p>
          <p
            style={{
              color: "#ef4444",
              margin: "0",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            {formatCurrencyFull(costOfWaiting)}
          </p>
          <p style={{ color: "#888", margin: "5px 0 0 0", fontSize: "12px" }}>
            by age 65
          </p>
        </div>
      )}

      {/* Data Table */}
      <div
        style={{
          overflowX: "auto",
          marginBottom: "40px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "400px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  color: "#fff",
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "2px solid #333",
                  fontSize: "14px",
                }}
              >
                Start Age
              </th>
              {visibleMilestones.map((milestone) => (
                <th
                  key={milestone}
                  style={{
                    color: "#fff",
                    padding: "12px",
                    textAlign: "right",
                    borderBottom: "2px solid #333",
                    fontSize: "14px",
                  }}
                >
                  At Age {milestone}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={row.startAge}
                style={{
                  backgroundColor:
                    index === 0 ? "rgba(16, 185, 129, 0.1)" : "transparent",
                }}
              >
                <td
                  style={{
                    color: index === 0 ? "#10b981" : "#fff",
                    padding: "12px",
                    borderBottom: "1px solid #333",
                    fontWeight: index === 0 ? "bold" : "normal",
                  }}
                >
                  {row.startAge === currentAge
                    ? `${row.startAge} (Now)`
                    : row.startAge}
                </td>
                {visibleMilestones.map((milestone) => (
                  <td
                    key={milestone}
                    style={{
                      color: row[`age${milestone}`] ? "#fff" : "#555",
                      padding: "12px",
                      textAlign: "right",
                      borderBottom: "1px solid #333",
                      fontFamily: "monospace",
                    }}
                  >
                    {row[`age${milestone}`]
                      ? formatCurrencyFull(row[`age${milestone}`])
                      : "--"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Line Chart */}
      <h4
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        Growth Over Time
      </h4>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="age"
            stroke="#fff"
            fontSize={12}
            axisLine={{ stroke: "#fff" }}
            tickLine={{ stroke: "#fff" }}
            label={{
              value: "Age",
              position: "insideBottom",
              offset: -10,
              fill: "#ccc",
            }}
          />
          <YAxis
            stroke="#fff"
            fontSize={12}
            axisLine={{ stroke: "#fff" }}
            tickLine={{ stroke: "#fff" }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ color: "#fff", paddingTop: "20px" }}
            formatter={(value) => (
              <span style={{ color: "#ccc" }}>
                Start at{" "}
                {value.replace("start", "") === String(currentAge)
                  ? `${value.replace("start", "")} (Now)`
                  : value.replace("start", "")}
              </span>
            )}
          />
          {startAges.map((startAge, index) => (
            <Line
              key={startAge}
              type="monotone"
              dataKey={`start${startAge}`}
              name={`start${startAge}`}
              stroke={START_AGE_COLORS[index % START_AGE_COLORS.length]}
              strokeWidth={startAge === currentAge ? 3 : 2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Footnote */}
      <p
        style={{
          color: "#666",
          textAlign: "center",
          marginTop: "20px",
          fontSize: "12px",
        }}
      >
        Assumes 7% annual return (historical inflation-adjusted S&P 500
        average). Actual returns will vary.
      </p>
    </div>
  );
}

export function DoublingTable() {
  const data = [
    { day: 1, amount: 1 },
    { day: 5, amount: 16 },
    { day: 10, amount: 512 },
    { day: 15, amount: 16384 },
    { day: 20, amount: 524288 },
    { day: 21, amount: 1048576 },
    { day: 25, amount: 16777216 },
    { day: 30, amount: 536870912 },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        padding: "20px",
        borderRadius: "15px",
        margin: "30px 0",
        border: "1px solid #333",
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "250px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                color: "#fff",
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #333",
                fontSize: "14px",
              }}
            >
              Day
            </th>
            <th
              style={{
                color: "#fff",
                padding: "12px",
                textAlign: "right",
                borderBottom: "2px solid #333",
                fontSize: "14px",
              }}
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.day}
              style={{
                backgroundColor:
                  row.day === 21 ? "rgba(16, 185, 129, 0.1)" : "transparent",
              }}
            >
              <td
                style={{
                  color: row.day === 21 ? "#10b981" : "#fff",
                  padding: "12px",
                  borderBottom: "1px solid #333",
                  fontWeight: row.day === 21 ? "bold" : "normal",
                }}
              >
                {row.day}
              </td>
              <td
                style={{
                  color: row.day === 21 ? "#10b981" : "#fff",
                  padding: "12px",
                  textAlign: "right",
                  borderBottom: "1px solid #333",
                  fontFamily: "monospace",
                  fontWeight: row.day === 21 ? "bold" : "normal",
                }}
              >
                {formatCurrency(row.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PriceOfWaitingCalculator;