import { AlphaFoldStructure, ApiResponse } from '@/types/api';

const ALPHAFOLD_BASE_URL = '/api/alphafold';

export class AlphaFoldService {
  static async getStructure(uniprotId: string): Promise<ApiResponse<AlphaFoldStructure>> {
    try {
      const response = await fetch(`${ALPHAFOLD_BASE_URL}/prediction/${uniprotId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No AlphaFold structure available for this protein');
        }
        throw new Error(`AlphaFold API error: ${response.status}`);
      }

      const data = await response.json();
      
      const structure: AlphaFoldStructure = {
        uniprotId: data[0].uniprotAccession,
        pdbUrl: data[0].pdbUrl,
        confidenceScore: data[0].globalMetricValue || 0,
        modelDate: data[0].modelCreatedDate,
      };

      return {
        data: structure,
        success: true,
      };
    } catch (error) {
      return {
        data: {} as AlphaFoldStructure,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async checkAvailability(uniprotId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await fetch(`${ALPHAFOLD_BASE_URL}/prediction/${uniprotId}`, {
        method: 'HEAD'
      });
      
      return {
        data: response.ok,
        success: true,
      };
    } catch (error) {
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static getStructureViewerUrl(uniprotId: string): string {
    return `https://alphafold.ebi.ac.uk/entry/${uniprotId}`;
  }

  static getPdbDownloadUrl(uniprotId: string): string {
    return `https://alphafold.ebi.ac.uk/files/AF-${uniprotId}-F1-model_v4.pdb`;
  }
}