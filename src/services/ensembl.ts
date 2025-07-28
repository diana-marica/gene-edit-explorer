import { GeneInfo, EnsemblGeneResponse, ApiResponse } from '@/types/api';

const ENSEMBL_BASE_URL = '/api/ensembl';

export class EnsemblService {
  private static async fetchFromEnsembl(endpoint: string): Promise<any> {
    const response = await fetch(`${ENSEMBL_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ensembl API error: ${response.status}`);
    }

    return response.json();
  }

  static async searchGene(symbol: string, species = 'human'): Promise<ApiResponse<GeneInfo[]>> {
    try {
      const data = await this.fetchFromEnsembl(
        `/lookup/symbol/${species}/${symbol}?expand=1`
      );

      const geneInfo: GeneInfo = {
        id: data.id,
        symbol: data.display_name,
        name: data.display_name,
        description: data.description || '',
        biotype: data.biotype,
        chromosome: data.seq_region_name,
        start: data.start,
        end: data.end,
        strand: data.strand,
        transcripts: data.Transcript?.map((t: any) => ({
          id: t.id,
          biotype: t.biotype,
          length: t.length,
          protein_id: t.protein_id,
          exons: t.Exon?.map((e: any) => ({
            id: e.id,
            start: e.start,
            end: e.end,
            rank: e.rank,
          })) || [],
        })) || [],
      };

      return {
        data: [geneInfo],
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

  static async getGeneSequence(geneId: string, species = 'human'): Promise<ApiResponse<string>> {
    try {
      const data = await this.fetchFromEnsembl(
        `/sequence/id/${geneId}?content-type=application/json`
      );

      return {
        data: data.seq,
        success: true,
      };
    } catch (error) {
      return {
        data: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}