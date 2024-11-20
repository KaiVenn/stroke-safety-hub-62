import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormFields } from "@/components/PredictionForm/FormFields";
import { useFormLogic } from "@/components/PredictionForm/useFormLogic";

const PredictionForm = () => {
  const { formData, isLoading, handleChange, handleSubmit } = useFormLogic();

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Health Assessment Form</h1>
            <Link 
              to="/information" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Confused? Click here for help</span>
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormFields formData={formData} handleChange={handleChange} />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Submit Assessment"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PredictionForm;