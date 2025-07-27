import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Dna, Target, Zap, Atom } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [geneInput, setGeneInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (geneInput.trim()) {
      navigate(`/workspace?gene=${encodeURIComponent(geneInput)}`);
    }
  };

  return (
    <div className="bg-gradient-primary text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Advanced CRISPR Design & Protein Analysis
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Complete bioinformatics workflow: Design guide RNAs, predict edit outcomes, 
            visualize protein structures, and discover ligand binding sites
          </p>
          
          <div className="max-w-md mx-auto mb-12">
            <div className="flex gap-2">
              <Input
                placeholder="Enter gene symbol (e.g., BRCA1)"
                value={geneInput}
                onChange={(e) => setGeneInput(e.target.value)}
                className="bg-white/90 border-white/20 text-foreground placeholder:text-muted-foreground"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                variant="secondary" 
                size="icon"
                onClick={handleSearch}
                className="bg-white/20 hover:bg-white/30 border-white/20"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Target className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">CRISPR Design</h3>
              <p className="text-sm text-blue-200">
                Generate optimal guide RNAs with on/off-target scoring
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Zap className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Edit Prediction</h3>
              <p className="text-sm text-blue-200">
                Predict NHEJ outcomes and frameshift risks
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Dna className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">3D Structure</h3>
              <p className="text-sm text-blue-200">
                Visualize AlphaFold models and functional domains
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Atom className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Ligand Analysis</h3>
              <p className="text-sm text-blue-200">
                Discover binding pockets and potential compounds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;