// src/components/ImprovedTrendDashboard.jsx
import React from "react";
import { TrendingUp, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

// ✅ Direct relative imports instead of '@/...'
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleTrends = [
  {
    id: 1,
    topic: "#AIRevolution",
    sentiment: "Positive",
    engagement: 87,
    growth: [20, 35, 50, 75, 87],
  },
  {
    id: 2,
    topic: "#ClimateChange",
    sentiment: "Neutral",
    engagement: 65,
    growth: [15, 25, 40, 55, 65],
  },
  {
    id: 3,
    topic: "#TechFuture",
    sentiment: "Negative",
    engagement: 40,
    growth: [10, 20, 30, 35, 40],
  },
];

const ImprovedTrendDashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleTrends.map((trend) => (
        <Card
          key={trend.id}
          className="shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition duration-300"
        >
          <CardContent className="p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {trend.topic}
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Sentiment:{" "}
              <span
                className={`font-semibold ${
                  trend.sentiment === "Positive"
                    ? "text-green-600"
                    : trend.sentiment === "Negative"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {trend.sentiment}
              </span>
            </p>

            <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Engagement Score:{" "}
              <span className="font-semibold text-gray-900">
                {trend.engagement}%
              </span>
            </p>

            {/* Growth Chart */}
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trend.growth.map((value, index) => ({
                    step: index + 1,
                    value,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              <Button variant="outline" size="sm">
                <ThumbsUp className="w-4 h-4 mr-1" /> Like
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" /> Comment
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" /> Share
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ImprovedTrendDashboard;
