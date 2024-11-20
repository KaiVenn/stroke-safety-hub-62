import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Results = () => {
  // TODO: Replace with actual prediction results
  const mockResult = {
    riskScore: 35,
    riskLevel: "Moderate",
    recommendations: [
      "Schedule regular check-ups with your healthcare provider",
      "Monitor your blood pressure regularly",
      "Maintain a healthy diet and exercise routine",
      "Consider reducing sodium intake",
    ],
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-6">Your Stroke Risk Assessment Results</h1>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Risk Score</span>
              <span className="text-sm font-medium">{mockResult.riskScore}%</span>
            </div>
            <Progress value={mockResult.riskScore} className="h-4" />
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {mockResult.riskScore > 50 ? (
                <AlertTriangle className="w-6 h-6 text-destructive" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
              <h2 className="text-xl font-semibold">
                {mockResult.riskLevel} Risk Level
              </h2>
            </div>
            <p className="text-slate-600">
              Based on your provided information, our AI model has determined that you have a {mockResult.riskLevel.toLowerCase()} risk of stroke.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
            <ul className="space-y-2">
              {mockResult.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <Link to="/dashboard">
              <Button variant="default">View History</Button>
            </Link>
            <Link to="/predict">
              <Button variant="outline">New Assessment</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Results;