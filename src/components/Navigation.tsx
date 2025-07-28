import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dna, Activity } from "lucide-react";
import { useApiStatus } from "@/hooks/useApiStatus";

const ApiStatusIndicator = () => {
  const { apiHealth } = useApiStatus();
  
  const getStatusColor = () => {
    switch (apiHealth.overall) {
      case 'healthy': return 'bg-success-dark';
      case 'issues': return 'bg-warning-dark';
      default: return 'bg-muted';
    }
  };

  const getStatusText = () => {
    switch (apiHealth.overall) {
      case 'healthy': return 'All APIs Online';
      case 'issues': return 'Some API Issues';
      default: return 'Checking APIs...';
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="h-4 w-4" />
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{getStatusText()}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const Navigation = () => {
  return (
    <nav className="bg-gradient-secondary border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Dna className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">GenEditLab</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/workspace" className="text-muted-foreground hover:text-foreground transition-colors">
              Workspace
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <ApiStatusIndicator />
            <Button variant="scientific" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;