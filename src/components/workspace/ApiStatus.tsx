import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react";
import { EnsemblService } from "@/services/ensembl";
import { UniProtService } from "@/services/uniprot";
import { ChemblService } from "@/services/chembl";
import { AlphaFoldService } from "@/services/alphafold";

interface ApiStatus {
  name: string;
  status: 'checking' | 'success' | 'error';
  message: string;
  testFunction: () => Promise<void>;
}

export function ApiStatus() {
  const [apis, setApis] = useState<ApiStatus[]>([
    {
      name: "Ensembl",
      status: 'checking',
      message: "Not tested",
      testFunction: async () => {
        const result = await EnsemblService.searchGene("BRCA1");
        if (!result.success) throw new Error(result.error || "Failed");
      }
    },
    {
      name: "UniProt",
      status: 'checking', 
      message: "Not tested",
      testFunction: async () => {
        const result = await UniProtService.searchProtein("BRCA1");
        if (!result.success) throw new Error(result.error || "Failed");
      }
    },
    {
      name: "ChEMBL",
      status: 'checking',
      message: "Not tested", 
      testFunction: async () => {
        const result = await ChemblService.searchLigands("BRCA1");
        if (!result.success) throw new Error(result.error || "Failed");
      }
    },
    {
      name: "AlphaFold",
      status: 'checking',
      message: "Not tested",
      testFunction: async () => {
        const result = await AlphaFoldService.checkAvailability("P38398");
        if (!result.success) throw new Error(result.error || "Failed");
      }
    }
  ]);

  const testApi = async (index: number) => {
    setApis(prev => prev.map((api, i) => 
      i === index ? { ...api, status: 'checking', message: "Testing..." } : api
    ));

    try {
      await apis[index].testFunction();
      setApis(prev => prev.map((api, i) => 
        i === index ? { ...api, status: 'success', message: "Connected" } : api
      ));
    } catch (error) {
      setApis(prev => prev.map((api, i) => 
        i === index ? { 
          ...api, 
          status: 'error', 
          message: error instanceof Error ? error.message : "Connection failed"
        } : api
      ));
    }
  };

  const testAllApis = async () => {
    for (let i = 0; i < apis.length; i++) {
      await testApi(i);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const getStatusIcon = (status: ApiStatus['status']) => {
    switch (status) {
      case 'checking':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success-dark" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-error-dark" />;
    }
  };

  const getStatusBadge = (status: ApiStatus['status']) => {
    switch (status) {
      case 'checking':
        return <Badge variant="secondary">Testing</Badge>;
      case 'success':
        return <Badge className="bg-success-light text-success-dark">Connected</Badge>;
      case 'error':
        return <Badge className="bg-error-light text-error-dark">Failed</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          API Status Monitor
          <Button 
            variant="outline" 
            size="sm" 
            onClick={testAllApis}
            disabled={apis.some(api => api.status === 'checking')}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Test All
          </Button>
        </CardTitle>
        <CardDescription>
          Check the connectivity status of all external APIs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {apis.map((api, index) => (
          <div key={api.name} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(api.status)}
              <div>
                <div className="font-medium">{api.name}</div>
                <div className="text-sm text-muted-foreground">{api.message}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(api.status)}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => testApi(index)}
                disabled={api.status === 'checking'}
              >
                Test
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}