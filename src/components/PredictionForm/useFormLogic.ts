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
      console.log("Attempting to connect to ML server at:", API_URL + ENDPOINTS.predict);
      console.log("Submitting form data:", formData);
      
      const response = await fetch(`${API_URL}${ENDPOINTS.predict}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Received prediction result:", result);

      localStorage.setItem("predictionResult", JSON.stringify(result));
      navigate("/results");
    } catch (error) {
      console.error("Error details:", error);
      toast({
        title: "Error",
        description: "Failed to process your health assessment. Please ensure the ML server is running and try again.",
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