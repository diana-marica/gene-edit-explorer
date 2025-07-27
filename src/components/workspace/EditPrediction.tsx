import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap, AlertTriangle, Info, TrendingUp } from "lucide-react";

const EditPrediction = () => {
  const mockPredictions = {
    deletions: [
      { size: 1, frequency: 45, sequence: "-" },
      { size: 3, frequency: 25, sequence: "---" },
      { size: 6, frequency: 15, sequence: "------" },
    ],
    insertions: [
      { size: 1, frequency: 10, sequence: "+A" },
      { size: 2, frequency: 5, sequence: "+AT" },
    ],
    frameshiftRisk: 85,
    splicingRisk: 12,
    conservationScore: 0.92
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Edit Outcome Prediction
          </CardTitle>
          <CardDescription>
            Predicted DNA repair outcomes and functional impact analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-secondary p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Frameshift Risk</span>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {mockPredictions.frameshiftRisk}%
              </div>
              <Progress value={mockPredictions.frameshiftRisk} className="h-2" />
            </div>
            
            <div className="bg-gradient-secondary p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Splicing Risk</span>
                <Info className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {mockPredictions.splicingRisk}%
              </div>
              <Progress value={mockPredictions.splicingRisk} className="h-2" />
            </div>
            
            <div className="bg-gradient-secondary p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Conservation</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {mockPredictions.conservationScore.toFixed(2)}
              </div>
              <Progress value={mockPredictions.conservationScore * 100} className="h-2" />
            </div>
          </div>

          {/* Predicted Outcomes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Predicted Deletions</h3>
              <div className="space-y-3">
                {mockPredictions.deletions.map((del, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        {del.size} bp
                      </Badge>
                      <span className="font-mono text-sm">{del.sequence}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{del.frequency}%</div>
                      <Progress value={del.frequency} className="h-1 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Predicted Insertions</h3>
              <div className="space-y-3">
                {mockPredictions.insertions.map((ins, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        {ins.size} bp
                      </Badge>
                      <span className="font-mono text-sm">{ins.sequence}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{ins.frequency}%</div>
                      <Progress value={ins.frequency} className="h-1 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button variant="scientific" className="w-full md:w-auto">
              Analyze Protein Structure Impact
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPrediction;