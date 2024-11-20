import { Brain } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Brain className="w-8 h-8 text-primary" />
      <span className="text-xl font-bold text-primary">No Stroke Zone</span>
    </div>
  );
};