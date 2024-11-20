import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Brain, Activity, HeartPulse, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-bold text-slate-900">
            Early Stroke Prevention Through AI Prediction
          </h1>
          <p className="text-xl text-slate-600">
            Take control of your health with our advanced stroke prediction tool. Get personalized risk assessments and actionable insights.
          </p>
          <Link to="/predict">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Brain className="w-64 h-64 text-primary opacity-90" />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose No Stroke Zone?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-12 h-12 text-primary" />}
            title="AI-Powered Predictions"
            description="Advanced machine learning algorithms analyze your health data for accurate risk assessment"
          />
          <FeatureCard
            icon={<Activity className="w-12 h-12 text-primary" />}
            title="Real-time Analysis"
            description="Get instant results and recommendations based on your health profile"
          />
          <FeatureCard
            icon={<HeartPulse className="w-12 h-12 text-primary" />}
            title="Track Your Progress"
            description="Monitor your health metrics and see how lifestyle changes affect your risk"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-primary rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already benefited from our stroke prediction tool. Start your journey to better health today.
          </p>
          <Link to="/predict">
            <Button size="lg" variant="secondary" className="gap-2">
              Start Free Assessment <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default Index;