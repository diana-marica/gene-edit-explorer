import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Zap, Dna, Atom } from "lucide-react";
import CrisprDesign from "./CrisprDesign";
import EditPrediction from "./EditPrediction";
import ProteinStructure from "./ProteinStructure";
import LigandAnalysis from "./LigandAnalysis";

interface WorkspaceTabsProps {
  geneQuery?: string;
}

const WorkspaceTabs = ({ geneQuery }: WorkspaceTabsProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analysis Workspace</h1>
        {geneQuery && (
          <p className="text-muted-foreground">
            Analyzing gene: <span className="font-semibold text-foreground">{geneQuery}</span>
          </p>
        )}
      </div>

      <Tabs defaultValue="crispr" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-secondary">
          <TabsTrigger value="crispr" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            CRISPR Design
          </TabsTrigger>
          <TabsTrigger value="prediction" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Edit Prediction
          </TabsTrigger>
          <TabsTrigger value="structure" className="flex items-center gap-2">
            <Dna className="h-4 w-4" />
            Protein Structure
          </TabsTrigger>
          <TabsTrigger value="ligands" className="flex items-center gap-2">
            <Atom className="h-4 w-4" />
            Ligand Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crispr" className="mt-6">
          <CrisprDesign geneQuery={geneQuery} />
        </TabsContent>

        <TabsContent value="prediction" className="mt-6">
          <EditPrediction />
        </TabsContent>

        <TabsContent value="structure" className="mt-6">
          <ProteinStructure />
        </TabsContent>

        <TabsContent value="ligands" className="mt-6">
          <LigandAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceTabs;