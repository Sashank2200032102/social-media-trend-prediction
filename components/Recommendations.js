import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Recommendations = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  // Example rules
  const positiveTweets = data.filter((d) => d.sentiment === "Positive");
  const negativeTweets = data.filter((d) => d.sentiment === "Negative");

  const recs = [];
  if (positiveTweets.length > negativeTweets.length) {
    recs.push("✅ Majority sentiment is positive. Keep reinforcing your current strategy.");
  } else {
    recs.push("⚠️ Negative sentiment is high. Consider addressing customer concerns quickly.");
  }

  recs.push("📅 Best time to post: Afternoons (based on engagement patterns).");
  recs.push("💡 Suggested Content: Highlight product benefits and respond to user feedback.");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
      <div className="space-y-4">
        {recs.map((r, i) => (
          <Card key={i}>
            <CardContent className="text-base">{r}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
