import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <div className="flex gap-4">
          <Link to="/auth?mode=login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button variant="default">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};