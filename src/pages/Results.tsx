import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Activity, Heart, Brain } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface PredictionResult {
  riskScore: number;
  riskLevel: string;
  recommendations: string[];
}

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<PredictionResult | null>(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("predictionResult");
    if (!storedResult) {
      navigate("/predict");
      return;
    }

    try {
      const parsedResult = JSON.parse(storedResult);
      setResult(parsedResult);
      localStorage.removeItem("predictionResult");
      console.log("Loaded prediction result:", parsedResult);
    } catch (error) {
      console.error("Error parsing prediction result:", error);
      navigate("/predict");
    }
  }, [navigate]);

  if (!result) {
    return null;
  }

  const chartData = [
    {
      name: "Your Risk",
      value: result.riskScore,
    },
    {
      name: "Average Risk",
      value: 35, // Example average risk score
    },
  ];

  const getRiskColor = (score: number) => {
    if (score <= 33) return "text-green-500";
    if (score <= 66) return "text-yellow-500";
    return "text-red-500";
  };

  const getRiskIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case "moderate":
        return <Activity className="w-8 h-8 text-yellow-500" />;
      case "high":
        return <AlertTriangle className="w-8 h-8 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Risk Score Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Risk Assessment Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Risk Score</span>
                    <span className={`text-2xl font-bold ${getRiskColor(result.riskScore)}`}>
                      {result.riskScore}%
                    </span>
                  </div>
                  <Progress value={result.riskScore} className="h-4" />
                  <div className="flex items-center gap-2 mt-4">
                    {getRiskIcon(result.riskLevel)}
                    <span className="text-lg font-medium">
                      {result.riskLevel} Risk Level
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Health Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Heart className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cardiovascular</p>
                    <p className="text-lg font-medium">
                      {result.riskScore > 50 ? "Attention Needed" : "Good Standing"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Brain className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Neural Health</p>
                    <p className="text-lg font-medium">
                      {result.riskScore > 66 ? "High Risk" : "Moderate Risk"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Comparison Chart */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Risk Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ChartContainer config={{}}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="value" fill="#7C3AED" />
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="default">View History</Button>
            </Link>
            <Link to="/predict">
              <Button variant="outline">New Assessment</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;