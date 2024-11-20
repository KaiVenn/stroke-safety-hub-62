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
      // Log the connection attempt and form data
      console.log("Attempting to connect to ML server at:", API_URL + ENDPOINTS.predict);
      console.log("Form data being submitted:", formData);

      // Test server connectivity
      const testResponse = await fetch(API_URL);
      console.log("Server connectivity test response:", testResponse.ok);

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
      
      // More specific error messages based on error type
      let errorMessage = "Failed to process your health assessment. ";
      if (!navigator.onLine) {
        errorMessage += "Please check your internet connection.";
      } else if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        errorMessage += "Unable to connect to the ML server. Please ensure the server is running at " + API_URL;
      } else {
        errorMessage += "Please ensure the ML server is running and try again.";
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