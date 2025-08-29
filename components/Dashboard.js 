import React, { useState } from "react";
import Papa from "papaparse";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);

  // Handle CSV upload and parsing
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("Parsed CSV:", result.data);
        setChartData(result.data);
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Social Media Trend Dashboard</h1>

      {/* CSV Upload */}
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <p>
        Upload a CSV file with columns like <b>time, value</b> to visualize.
      </p>

      {/* Show Charts only when data is available */}
      {chartData.length > 0 ? (
        <div style={{ marginTop: "30px" }}>
          <h2>📈 Line Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>

          <h2>📊 Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <h2>⚪ Scatter Plot</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="time" name="Time" />
              <YAxis dataKey="value" name="Value" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Trends" data={chartData} fill="#ff7300" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <h3 style={{ marginTop: "20px", color: "gray" }}>
          No data yet. Upload a CSV to see charts.
        </h3>
      )}
    </div>
  );
};

export default Dashboard;
