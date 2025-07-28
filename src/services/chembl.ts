import { Ligand, ChemblResponse, ApiResponse } from '@/types/api';

const CHEMBL_BASE_URL = '/api/chembl/data';

export class ChemblService {
  private static async fetchFromChembl(endpoint: string): Promise<any> {
    const response = await fetch(`${CHEMBL_BASE_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`ChEMBL API error: ${response.status}`);
    }

    return response.json();
  }

  static async searchLigands(targetName: string): Promise<ApiResponse<Ligand[]>> {
    try {
      // Search for target first
      const targetData = await this.fetchFromChembl(
        `/target/search.json?q=${encodeURIComponent(targetName)}&limit=5`
      );

      if (!targetData.targets || targetData.targets.length === 0) {
        return {
          data: [],
          success: true,
        };
      }

      const targetId = targetData.targets[0].target_chembl_id;

      // Get activities for the target
      const activityData = await this.fetchFromChembl(
        `/activity.json?target_chembl_id=${targetId}&limit=50`
      );

      const moleculeIds = activityData.activities
        ?.map((activity: any) => activity.molecule_chembl_id)
        ?.filter((id: string, index: number, self: string[]) => self.indexOf(id) === index)
        ?.slice(0, 20) || [];

      if (moleculeIds.length === 0) {
        return {
          data: [],
          success: true,
        };
      }

      // Get molecule details
      const moleculePromises = moleculeIds.map((id: string) =>
        this.fetchFromChembl(`/molecule/${id}.json`)
      );

      const molecules = await Promise.all(moleculePromises);

      const ligands: Ligand[] = molecules
        .filter(mol => mol && mol.molecule_structures?.canonical_smiles)
        .map((mol: any) => ({
          id: mol.molecule_chembl_id,
          name: mol.pref_name || mol.molecule_chembl_id,
          chemblId: mol.molecule_chembl_id,
          smiles: mol.molecule_structures?.canonical_smiles || '',
          molecularWeight: mol.molecule_properties?.mw_freebase || 0,
          clinicalStatus: this.getPhaseDescription(mol.max_phase),
        }));

      return {
        data: ligands,
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

  private static getPhaseDescription(phase: number | null): string {
    if (phase === null || phase === undefined) return 'Unknown';
    
    const phases: { [key: number]: string } = {
      0: 'Preclinical',
      1: 'Phase I',
      2: 'Phase II',
      3: 'Phase III',
      4: 'Approved',
    };

    return phases[phase] || 'Unknown';
  }

  static async getMoleculeDetails(chemblId: string): Promise<ApiResponse<Ligand>> {
    try {
      const data = await this.fetchFromChembl(`/molecule/${chemblId}.json`);

      const ligand: Ligand = {
        id: data.molecule_chembl_id,
        name: data.pref_name || data.molecule_chembl_id,
        chemblId: data.molecule_chembl_id,
        smiles: data.molecule_structures?.canonical_smiles || '',
        molecularWeight: data.molecule_properties?.mw_freebase || 0,
        clinicalStatus: this.getPhaseDescription(data.max_phase),
      };

      return {
        data: ligand,
        success: true,
      };
    } catch (error) {
      return {
        data: {} as Ligand,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}