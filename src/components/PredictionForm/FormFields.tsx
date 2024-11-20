import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormFieldsProps {
  formData: any;
  handleChange: (field: string, value: string) => void;
}

export const FormFields = ({ formData, handleChange }: FormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Full Name</label>
        <Input
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Age</label>
        <Input
          type="number"
          value={formData.age}
          onChange={(e) => handleChange("age", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Gender</label>
        <Select onValueChange={(value) => handleChange("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Heart Disease</label>
        <Select onValueChange={(value) => handleChange("heartDisease", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Hypertension</label>
        <Select onValueChange={(value) => handleChange("hypertension", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Average Glucose Level</label>
        <Input
          type="number"
          value={formData.glucoseLevel}
          onChange={(e) => handleChange("glucoseLevel", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">BMI</label>
        <Input
          type="number"
          value={formData.bmi}
          onChange={(e) => handleChange("bmi", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Residence Type</label>
        <Select onValueChange={(value) => handleChange("residenceType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urban">Urban</SelectItem>
            <SelectItem value="rural">Rural</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Smoking Status</label>
        <Select onValueChange={(value) => handleChange("smokingStatus", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never Smoked</SelectItem>
            <SelectItem value="former">Former Smoker</SelectItem>
            <SelectItem value="current">Current Smoker</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Work Type</label>
        <Select onValueChange={(value) => handleChange("workType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="self-employed">Self-employed</SelectItem>
            <SelectItem value="government">Government</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="retired">Retired</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};