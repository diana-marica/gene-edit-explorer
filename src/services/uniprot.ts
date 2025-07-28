import { ProteinInfo, UniProtResponse, ApiResponse } from '@/types/api';

const UNIPROT_BASE_URL = '/api/uniprot';

export class UniProtService {
  private static async fetchFromUniProt(endpoint: string): Promise<any> {
    const response = await fetch(`${UNIPROT_BASE_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`UniProt API error: ${response.status}`);
    }

    return response.json();
  }

  static async searchProtein(query: string): Promise<ApiResponse<ProteinInfo[]>> {
    try {
      const data = await this.fetchFromUniProt(
        `/uniprotkb/search?query=${encodeURIComponent(query)}&format=json&size=10`
      );

      const proteins: ProteinInfo[] = data.results.map((protein: any) => ({
        uniprotId: protein.primaryAccession,
        name: protein.uniProtkbId,
        fullName: protein.proteinDescription?.recommendedName?.fullName?.value || 'Unknown',
        organism: protein.organism?.scientificName || 'Unknown',
        length: protein.sequence?.length || 0,
        domains: protein.features
          ?.filter((f: any) => f.type === 'Domain' || f.type === 'Region')
          ?.map((f: any) => ({
            name: f.description || f.type,
            type: f.type,
            start: f.begin,
            end: f.end,
            description: f.description || '',
          })) || [],
        pdbIds: protein.uniProtKBCrossReferences
          ?.filter((ref: any) => ref.database === 'PDB')
          ?.map((ref: any) => ref.id) || [],
        alphafoldId: protein.primaryAccession,
      }));

      return {
        data: proteins,
        success: true,
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async getProteinDetails(uniprotId: string): Promise<ApiResponse<ProteinInfo>> {
    try {
      const data = await this.fetchFromUniProt(
        `/uniprotkb/${uniprotId}?format=json`
      );

      const protein: ProteinInfo = {
        uniprotId: data.primaryAccession,
        name: data.uniProtkbId,
        fullName: data.proteinDescription?.recommendedName?.fullName?.value || 'Unknown',
        organism: data.organism?.scientificName || 'Unknown',
        length: data.sequence?.length || 0,
        domains: data.features
          ?.filter((f: any) => f.type === 'Domain' || f.type === 'Region')
          ?.map((f: any) => ({
            name: f.description || f.type,
            type: f.type,
            start: f.begin,
            end: f.end,
            description: f.description || '',
          })) || [],
        pdbIds: data.uniProtKBCrossReferences
          ?.filter((ref: any) => ref.database === 'PDB')
          ?.map((ref: any) => ref.id) || [],
        alphafoldId: data.primaryAccession,
      };

      return {
        data: protein,
        success: true,
      };
    } catch (error) {
      return {
        data: {} as ProteinInfo,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}