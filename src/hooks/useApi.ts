import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EnsemblService } from '@/services/ensembl';
import { UniProtService } from '@/services/uniprot';
import { ChemblService } from '@/services/chembl';
import { CrisprService } from '@/services/crispr';
import { AlphaFoldService } from '@/services/alphafold';
import { toast } from '@/hooks/use-toast';
import { CrisprDesignParams, GuideRNA } from '@/types/api';

// Gene search hook
export const useGeneSearch = (symbol: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['gene', symbol],
    queryFn: async () => {
      const result = await EnsemblService.searchGene(symbol);
      return handleApiResponse(result);
    },
    enabled: enabled && symbol.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

// Protein search hook
export const useProteinSearch = (query: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['protein', query],
    queryFn: async () => {
      const result = await UniProtService.searchProtein(query);
      return handleApiResponse(result);
    },
    enabled: enabled && query.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};

// Protein details hook
export const useProteinDetails = (uniprotId: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['protein-details', uniprotId],
    queryFn: async () => {
      const result = await UniProtService.getProteinDetails(uniprotId);
      return handleApiResponse(result);
    },
    enabled: enabled && uniprotId.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

// AlphaFold structure hook
export const useAlphaFoldStructure = (uniprotId: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['alphafold', uniprotId],
    queryFn: async () => {
      const result = await AlphaFoldService.getStructure(uniprotId);
      return handleApiResponse(result);
    },
    enabled: enabled && uniprotId.length > 0,
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 1, // Only retry once for AlphaFold
  });
};

// Ligand search hook
export const useLigandSearch = (targetName: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['ligands', targetName],
    queryFn: async () => {
      const result = await ChemblService.searchLigands(targetName);
      return handleApiResponse(result);
    },
    enabled: enabled && targetName.length > 0,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
};

// CRISPR design mutation
export const useCrisprDesign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CrisprDesignParams) => CrisprService.designGuideRNAs(params),
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "CRISPR Design Complete",
          description: `Found ${data.data.length} potential guide RNAs`,
        });
      } else {
        toast({
          title: "Design Failed",
          description: data.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Analysis Error",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });
};

// Edit prediction mutation
export const useEditPrediction = () => {
  return useMutation({
    mutationFn: ({ guide, sequence }: { guide: GuideRNA; sequence: string }) => 
      CrisprService.predictEditOutcomes(guide, sequence),
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Edit Prediction Complete",
          description: "Successfully predicted editing outcomes",
        });
      } else {
        toast({
          title: "Prediction Failed",
          description: data.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    },
  });
};

// Generic error handler for API responses
export const handleApiResponse = <T>(response: { success: boolean; data: T; error?: string }, successMessage?: string) => {
  if (response.success) {
    if (successMessage) {
      toast({
        title: "Success",
        description: successMessage,
      });
    }
    return response.data;
  } else {
    toast({
      title: "API Error",
      description: response.error || "Unknown error occurred",
      variant: "destructive",
    });
    throw new Error(response.error || "API request failed");
  }
};