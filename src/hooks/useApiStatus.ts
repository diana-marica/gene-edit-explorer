import { useState, useEffect } from "react";
import { EnsemblService } from "@/services/ensembl";
import { UniProtService } from "@/services/uniprot";
import { ChemblService } from "@/services/chembl";
import { AlphaFoldService } from "@/services/alphafold";

interface ApiHealth {
  overall: 'healthy' | 'issues' | 'unknown';
  details: {
    ensembl: boolean;
    uniprot: boolean;
    chembl: boolean;
    alphafold: boolean;
  };
}

export function useApiStatus() {
  const [apiHealth, setApiHealth] = useState<ApiHealth>({
    overall: 'unknown',
    details: {
      ensembl: false,
      uniprot: false,
      chembl: false,
      alphafold: false
    }
  });

  const checkApiHealth = async () => {
    const results = await Promise.allSettled([
      EnsemblService.searchGene("BRCA1"),
      UniProtService.searchProtein("BRCA1"),
      ChemblService.searchLigands("BRCA1"),
      AlphaFoldService.checkAvailability("P38398")
    ]);

    const details = {
      ensembl: results[0].status === 'fulfilled' && results[0].value.success,
      uniprot: results[1].status === 'fulfilled' && results[1].value.success,
      chembl: results[2].status === 'fulfilled' && results[2].value.success,
      alphafold: results[3].status === 'fulfilled' && results[3].value.success
    };

    const healthyCount = Object.values(details).filter(Boolean).length;
    const overall: ApiHealth['overall'] = 
      healthyCount === 4 ? 'healthy' : 
      healthyCount >= 2 ? 'issues' : 'unknown';

    setApiHealth({ overall, details });
  };

  useEffect(() => {
    checkApiHealth();
    const interval = setInterval(checkApiHealth, 300000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return { apiHealth, refreshStatus: checkApiHealth };
}