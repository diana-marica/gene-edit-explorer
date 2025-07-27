import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Target, AlertTriangle, CheckCircle } from "lucide-react";

interface CrisprDesignProps {
  geneQuery?: string;
}

const CrisprDesign = ({ geneQuery }: CrisprDesignProps) => {
  const [targetGene, setTargetGene] = useState(geneQuery || "");
  const [organism, setOrganism] = useState("human");
  const [targetRegion, setTargetRegion] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockResults = [
    {
      id: 1,
      sequence: "GCACTGGAGGTCGAGATGCG",
      pam: "CGG",
      cutPosition: 245,
      onTargetScore: 0.87,
      offTargetCount: 3,
      maxMismatch: 2,
      efficiency: "High"
    },
    {
      id: 2,
      sequence: "TCGATCGGAGCTGAACTACG",
      pam: "TGG",
      cutPosition: 189,
      onTargetScore: 0.72,
      offTargetCount: 8,
      maxMismatch: 3,
      efficiency: "Medium"
    },
    {
      id: 3,
      sequence: "AGTCGATGCAGATCGACTGG",
      pam: "AGG",
      cutPosition: 312,
      onTargetScore: 0.94,
      offTargetCount: 1,
      maxMismatch: 1,
      efficiency: "High"
    }
  ];

  const handleAnalyze = async () => {
    if (!targetGene.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const getEfficiencyBadge = (efficiency: string) => {
    const variants = {
      High: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-red-100 text-red-800"
    };
    return variants[efficiency as keyof typeof variants] || variants.Medium;
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            CRISPR Guide RNA Design
          </CardTitle>
          <CardDescription>
            Design optimal guide RNAs for your target gene with comprehensive scoring
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gene">Target Gene</Label>
              <Input
                id="gene"
                value={targetGene}
                onChange={(e) => setTargetGene(e.target.value)}
                placeholder="e.g., BRCA1, ENSG00000012048"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organism">Organism</Label>
              <Select value={organism} onValueChange={setOrganism}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="human">Homo sapiens</SelectItem>
                  <SelectItem value="mouse">Mus musculus</SelectItem>
                  <SelectItem value="zebrafish">Danio rerio</SelectItem>
                  <SelectItem value="fly">Drosophila melanogaster</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Target Region (Optional)</Label>
              <Input
                id="region"
                value={targetRegion}
                onChange={(e) => setTargetRegion(e.target.value)}
                placeholder="e.g., exon 11, CDS"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleAnalyze} 
            disabled={!targetGene.trim() || isAnalyzing}
            className="w-full md:w-auto"
            variant="scientific"
          >
            <Search className="h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Design Guide RNAs"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Guide RNA Results</CardTitle>
            <CardDescription>
              Found {results.length} potential guide RNAs ranked by efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guide Sequence (5' → 3')</TableHead>
                    <TableHead>PAM</TableHead>
                    <TableHead>Cut Position</TableHead>
                    <TableHead>On-Target Score</TableHead>
                    <TableHead>Off-Targets</TableHead>
                    <TableHead>Max Mismatch</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-mono text-sm">
                        {result.sequence}
                      </TableCell>
                      <TableCell className="font-mono font-semibold text-primary">
                        {result.pam}
                      </TableCell>
                      <TableCell>{result.cutPosition}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {result.onTargetScore >= 0.8 ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          )}
                          {result.onTargetScore.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>{result.offTargetCount}</TableCell>
                      <TableCell>{result.maxMismatch}</TableCell>
                      <TableCell>
                        <Badge className={getEfficiencyBadge(result.efficiency)}>
                          {result.efficiency}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Predict Outcome
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CrisprDesign;