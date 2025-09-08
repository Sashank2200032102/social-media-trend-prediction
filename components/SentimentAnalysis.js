import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const SentimentAnalysis = ({ data }) => {
  const [sentimentStats, setSentimentStats] = useState([]);
  const [timeSeries, setTimeSeries] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Sentiment count
      const counts = { Positive: 0, Negative: 0, Neutral: 0 };
      data.forEach((row) => {
        counts[row.sentiment] = (counts[row.sentiment] || 0) + 1;
      });

      setSentimentStats([
        { name: "Positive", value: counts.Positive },
        { name: "Negative", value: counts.Negative },
        { name: "Neutral", value: counts.Neutral },
      ]);

      // Sentiment over time (if timestamp available)
      if (data[0].timestamp) {
        const grouped = {};
        data.forEach((row) => {
          const date = new Date(row.timestamp).toLocaleDateString();
          if (!grouped[date]) grouped[date] = { date, Positive: 0, Negative: 0, Neutral: 0 };
          grouped[date][row.sentiment] += 1;
        });
        setTimeSeries(Object.values(grouped));
      }
    }
  }, [data]);

  const COLORS = ["#4CAF50", "#F44336", "#FFC107"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Pie Chart for Sentiment */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-bold mb-4">Overall Sentiment Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie data={sentimentStats} dataKey="value" nameKey="name" outerRadius={100}>
              {sentimentStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </CardContent>
      </Card>

      {/* Line Chart over Time */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-bold mb-4">Sentiment Trend Over Time</h2>
          <LineChart width={500} height={300} data={timeSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Positive" stroke="#4CAF50" />
            <Line type="monotone" dataKey="Negative" stroke="#F44336" />
            <Line type="monotone" dataKey="Neutral" stroke="#FFC107" />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentAnalysis;
