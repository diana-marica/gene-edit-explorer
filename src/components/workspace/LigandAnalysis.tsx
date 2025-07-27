import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Atom, ExternalLink, Search, Beaker, Target } from "lucide-react";

const LigandAnalysis = () => {
  const mockBindingPockets = [
    {
      id: 1,
      name: "Pocket A",
      residues: "HIS87, GLU92, ARG97",
      volume: 245,
      druggability: 0.82,
      type: "Active site"
    },
    {
      id: 2,
      name: "Pocket B",
      residues: "TRP45, PHE123, LEU156",
      volume: 189,
      druggability: 0.67,
      type: "Allosteric"
    },
    {
      id: 3,
      name: "Pocket C",
      residues: "ASP34, LYS78, SER145",
      volume: 156,
      druggability: 0.45,
      type: "Interface"
    }
  ];

  const mockLigands = [
    {
      name: "Olaparib",
      chemblId: "CHEMBL521686",
      pubchemId: "23725625",
      activity: "PARP inhibitor",
      similarity: 0.89,
      clinicalStatus: "Approved"
    },
    {
      name: "Talazoparib",
      chemblId: "CHEMBL2103843",
      pubchemId: "23721411",
      activity: "PARP inhibitor",
      similarity: 0.76,
      clinicalStatus: "Approved"
    },
    {
      name: "Compound X",
      chemblId: "CHEMBL1234567",
      pubchemId: "12345678",
      activity: "Experimental",
      similarity: 0.62,
      clinicalStatus: "Research"
    }
  ];

  const getDruggabilityBadge = (score: number) => {
    if (score >= 0.7) return "bg-green-100 text-green-800";
    if (score >= 0.5) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusBadge = (status: string) => {
    if (status === "Approved") return "bg-green-100 text-green-800";
    if (status === "Clinical") return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Atom className="h-5 w-5 text-primary" />
            Ligand Binding Analysis
          </CardTitle>
          <CardDescription>
            Identify binding pockets and discover potential therapeutic compounds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Binding Pockets */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Predicted Binding Pockets
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pocket</TableHead>
                    <TableHead>Key Residues</TableHead>
                    <TableHead>Volume (Ų)</TableHead>
                    <TableHead>Druggability</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBindingPockets.map((pocket) => (
                    <TableRow key={pocket.id}>
                      <TableCell className="font-medium">{pocket.name}</TableCell>
                      <TableCell className="font-mono text-sm">{pocket.residues}</TableCell>
                      <TableCell>{pocket.volume}</TableCell>
                      <TableCell>
                        <Badge className={getDruggabilityBadge(pocket.druggability)}>
                          {pocket.druggability.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell>{pocket.type}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Search className="h-3 w-3" />
                          Explore
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Known Ligands */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Beaker className="h-4 w-4" />
              Known Ligands & Similar Compounds
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Compound Name</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Similarity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Database Links</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLigands.map((ligand, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{ligand.name}</TableCell>
                      <TableCell>{ligand.activity}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${ligand.similarity * 100}%` }}
                            />
                          </div>
                          <span className="text-sm">{(ligand.similarity * 100).toFixed(0)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(ligand.clinicalStatus)}>
                          {ligand.clinicalStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Molecular Sketcher Placeholder */}
          <div className="bg-gradient-secondary rounded-lg border-2 border-dashed border-border p-8 text-center">
            <Beaker className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Molecular Sketcher</h3>
            <p className="text-muted-foreground mb-4">
              Draw or import a molecule to predict binding affinity
            </p>
            <Button variant="outline">
              Launch Molecule Editor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LigandAnalysis;