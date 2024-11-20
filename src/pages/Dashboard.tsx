import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // TODO: Replace with actual user data
  const mockAssessments = [
    {
      date: "2024-02-15",
      riskScore: 35,
      riskLevel: "Moderate",
    },
    {
      date: "2024-01-30",
      riskScore: 45,
      riskLevel: "Moderate",
    },
    {
      date: "2024-01-15",
      riskScore: 55,
      riskLevel: "High",
    },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Your Health Dashboard</h1>
            <Link to="/predict">
              <Button>New Assessment</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Activity className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Latest Risk Score</h3>
                  <p className="text-2xl font-bold">{mockAssessments[0].riskScore}%</p>
                </div>
              </div>
              <p className="text-slate-600">
                Your latest assessment shows a {mockAssessments[0].riskLevel.toLowerCase()} risk level
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Total Assessments</h3>
                  <p className="text-2xl font-bold">{mockAssessments.length}</p>
                </div>
              </div>
              <p className="text-slate-600">
                Keep tracking your health regularly for better insights
              </p>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Assessment History</h2>
            <div className="space-y-4">
              {mockAssessments.map((assessment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                >
                  <div>
                    <p className="font-medium">{assessment.date}</p>
                    <p className="text-sm text-slate-600">
                      Risk Level: {assessment.riskLevel}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{assessment.riskScore}%</p>
                    <Link
                      to={`/results?id=${index}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;