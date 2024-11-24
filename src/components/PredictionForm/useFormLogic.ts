import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { API_URL, ENDPOINTS } from "@/config/api";

export const useFormLogic = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    maritalStatus: "",
    heartDisease: "",
    hypertension: "",
    glucoseLevel: "",
    bmi: "",
    residenceType: "",
    smokingStatus: "",
    workType: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting to submit prediction request to:", API_URL + ENDPOINTS.predict);
      console.log("Form data being submitted:", formData);

      const response = await fetch(`${API_URL}${ENDPOINTS.predict}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Prediction result:", result);

      localStorage.setItem("predictionResult", JSON.stringify(result));
      navigate("/results");
    } catch (error) {
      console.error("Detailed error information:", error);
      
      let errorMessage = "Failed to process your health assessment. ";
      if (!navigator.onLine) {
        errorMessage += "Please check your internet connection.";
      } else {
        errorMessage += "Please ensure the ML server is running at " + API_URL + " and try again.";
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
};