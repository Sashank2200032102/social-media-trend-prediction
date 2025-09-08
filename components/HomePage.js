import React, { useState } from "react";
import Papa from "papaparse";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

import "./HomePage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function HomePage() {
  const [file, setFile] = useState(null);
  const [fileInfoVisible, setFileInfoVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileInfoVisible(false);
    setPreviewVisible(false);
    setStatsVisible(false);

    if (uploadedFile && uploadedFile.type === "text/csv") {
      Papa.parse(uploadedFile, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setData(results.data);
          setColumns(results.meta.fields);
        },
      });
    }
  };

  const handleUpload = () => {
    if (file) {
      setFileInfoVisible(true);
      alert(`File "${file.name}" uploaded successfully!`);
    } else {
      alert("Please choose a file before uploading.");
    }
  };

  const handleCancel = () => {
    setFile(null);
    setFileInfoVisible(false);
    setPreviewVisible(false);
    setStatsVisible(false);
    setData([]);
    setColumns([]);
    document.getElementById("fileInput").value = "";
  };

  const previewData = () => {
    setPreviewVisible(true);
    setStatsVisible(false);
  };

  const showStats = () => {
    setPreviewVisible(false);
    setStatsVisible(true);
  };

  // Dataset stats
  const totalRows = data.length;
  const uniqueUsers = new Set(data.map((row) => row.User)).size;

  const wordCounts = {};
  data.forEach((row) => {
    if (row.Tweet) {
      row.Tweet.split(/\s+/).forEach((word) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (cleanWord) {
          wordCounts[cleanWord] = (wordCounts[cleanWord] || 0) + 1;
        }
      });
    }
  });

  const topWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const barData = {
    labels: topWords.map((w) => w[0]),
    datasets: [
      {
        label: "Word Frequency",
        data: topWords.map((w) => w[1]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Unique Users", "Total Tweets"],
    datasets: [
      {
        label: "Dataset Stats",
        data: [uniqueUsers, totalRows],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const lineData = {
    labels: data.map((row) => row.Date),
    datasets: [
      {
        label: "Tweets Over Time",
        data: data.map((_, idx) => idx + 1),
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
      },
    ],
  };

  const smallOptions = {
    plugins: { legend: { labels: { font: { size: 10 } } } },
    scales: { x: { ticks: { font: { size: 10 } } }, y: { ticks: { font: { size: 10 } } } },
    maintainAspectRatio: false,
  };

  return (
    <div className="homepage">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>📊 Dashboard</h2>
        <a onClick={() => { setPreviewVisible(false); setStatsVisible(false); }}>🏠 Home</a>
        <a onClick={handleUpload}>⬆️ Upload File</a>
        <a onClick={previewData}>👀 Preview Data</a>
        <a onClick={showStats}>📈 Statistics</a>
        <a>😊 Sentiment Analysis</a>
        <a>💡 Recommendations</a>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>📊 Social Media Trend Analysis And Recommendations</h1>

        <div className="upload-box">
          <input id="fileInput" type="file" onChange={handleFileChange} className="file-input" />
          <div className="button-group">
            <button className="upload-btn" onClick={handleUpload}>Upload</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>

        {fileInfoVisible && file && (
          <div className="file-info card">
            <h3>📂 File Information</h3>
            <p><strong>Name:</strong> {file.name}</p>
            <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        {previewVisible && (
          <div className="data-preview">
            <h3>📊 Dataset Preview</h3>
            <table border="1" cellSpacing="0" cellPadding="8">
              <thead>
                <tr>{columns.map((col, index) => <th key={index}>{col}</th>)}</tr>
              </thead>
              <tbody>
                {data.slice(0, 5).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col, colIndex) => <td key={colIndex}>{row[col]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {statsVisible && (
          <div className="stats-dashboard">
            <h3>📈 Dataset Statistics</h3>
            <p><strong>Total Rows:</strong> {totalRows}</p>
            <p><strong>Unique Users:</strong> {uniqueUsers}</p>

            <div className="charts">
              <div className="chart"><Bar data={barData} options={smallOptions} /></div>
              <div className="chart"><Pie data={pieData} options={smallOptions} /></div>
              <div className="chart"><Line data={lineData} options={smallOptions} /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
