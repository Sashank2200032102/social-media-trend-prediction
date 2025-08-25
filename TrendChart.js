import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function TrendChart({ history }) {
  const labels = history.map((item, index) => `#${index + 1}`);
  const data = {
    labels,
    datasets: [
      {
        label: "Predicted Trends",
        data: history.map((item) => (item.trend === "Tech" ? 1 : item.trend === "Politics" ? 2 : 3)),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div style={{ width: "500px", margin: "20px auto" }}>
      <h3>Trend Predictions Chart</h3>
      <Bar data={data} />
    </div>
  );
}

export default TrendChart;

