import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dna, ExternalLink, Download, Zap } from "lucide-react";
import { useProteinDetails, useAlphaFoldStructure } from "@/hooks/useApi";
import { useState } from "react";

interface ProteinStructureProps {
  uniprotId?: string;
}

const ProteinStructure = ({ uniprotId = "P04637" }: ProteinStructureProps) => {
  const [showLigandAnalysis, setShowLigandAnalysis] = useState(false);
  
  const proteinQuery = useProteinDetails(uniprotId, !!uniprotId);
  const alphafoldQuery = useAlphaFoldStructure(uniprotId, !!uniprotId);

  const handleSuggestLigands = () => {
    setShowLigandAnalysis(true);
  };
  const mockProteinData = {
    uniprotId: "P38398",
    pdbId: "6OBT",
    alphafoldId: "AF-P38398-F1",
    domains: [
      { name: "RING domain", start: 24, end: 64, function: "E3 ubiquitin ligase activity" },
      { name: "BRCT domain 1", start: 1650, end: 1736, function: "DNA binding and protein interactions" },
      { name: "BRCT domain 2", start: 1760, end: 1855, function: "DNA damage response signaling" },
    ],
    cutSite: 185,
    affectedDomain: "RING domain"
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5 text-primary" />
            Protein Structure Analysis
          </CardTitle>
          <CardDescription>
            3D structure visualization and functional domain analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Structure Viewer Placeholder */}
          <div className="bg-gradient-secondary rounded-lg border-2 border-dashed border-border p-8 text-center">
            <Dna className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">3D Structure Viewer</h3>
            <p className="text-muted-foreground mb-4">
              AlphaFold model: {mockProteinData.alphafoldId}
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
                View in AlphaFold DB
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
                Download PDB
              </Button>
            </div>
          </div>

          {/* Protein Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Protein Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">UniProt ID:</span>
                  <Badge variant="outline">{mockProteinData.uniprotId}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PDB ID:</span>
                  <Badge variant="outline">{mockProteinData.pdbId}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CRISPR Cut Site:</span>
                  <Badge className="bg-red-100 text-red-800">
                    Residue {mockProteinData.cutSite}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Affected Domain:</span>
                  <Badge className="bg-orange-100 text-orange-800">
                    {mockProteinData.affectedDomain}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Functional Impact</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Critical Domain Affected
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      The CRISPR cut site is located within the RING domain, which is essential 
                      for E3 ubiquitin ligase activity. Disruption may significantly impact 
                      protein function.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Domain Architecture */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Domain Architecture</h3>
            <div className="space-y-3">
              {mockProteinData.domains.map((domain, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{domain.name}</h4>
                    <Badge variant="secondary">
                      {domain.start}-{domain.end}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{domain.function}</p>
                  {domain.name === mockProteinData.affectedDomain && (
                    <div className="mt-2">
                      <Badge className="bg-red-100 text-red-800 text-xs">
                        Contains CRISPR cut site
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button variant="scientific" className="w-full md:w-auto">
              Suggest Binding Ligands
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProteinStructure;