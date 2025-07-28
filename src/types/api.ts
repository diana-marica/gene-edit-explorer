// CRISPR Design Types
export interface GuideRNA {
  id: string;
  sequence: string;
  pam: string;
  position: number;
  strand: '+' | '-';
  onTargetScore: number;
  offTargetCount: number;
  offTargetMaxScore: number;
  efficiency: 'high' | 'medium' | 'low';
}

export interface CrisprDesignParams {
  gene: string;
  organism: string;
  region?: string;
}

// Gene/Protein Information Types
export interface GeneInfo {
  id: string;
  symbol: string;
  name: string;
  description: string;
  biotype: string;
  chromosome: string;
  start: number;
  end: number;
  strand: number;
  transcripts: Transcript[];
}

export interface Transcript {
  id: string;
  biotype: string;
  length: number;
  protein_id?: string;
  exons: Exon[];
}

export interface Exon {
  id: string;
  start: number;
  end: number;
  rank: number;
}

// Protein Structure Types
export interface ProteinInfo {
  uniprotId: string;
  name: string;
  fullName: string;
  organism: string;
  length: number;
  domains: ProteinDomain[];
  pdbIds: string[];
  alphafoldId?: string;
}

export interface ProteinDomain {
  name: string;
  type: string;
  start: number;
  end: number;
  description: string;
}

export interface AlphaFoldStructure {
  uniprotId: string;
  pdbUrl: string;
  confidenceScore: number;
  modelDate: string;
}

// Edit Prediction Types
export interface EditOutcome {
  type: 'deletion' | 'insertion';
  sequence: string;
  size: number;
  frequency: number;
}

export interface EditPrediction {
  frameshiftRisk: number;
  splicingRisk: number;
  conservationScore: number;
  outcomes: EditOutcome[];
}

// Ligand Analysis Types
export interface BindingPocket {
  id: string;
  center: [number, number, number];
  volume: number;
  druggabilityScore: number;
  residues: string[];
}

export interface Ligand {
  id: string;
  name: string;
  chemblId?: string;
  pubchemId?: string;
  smiles: string;
  molecularWeight: number;
  clinicalStatus: string;
  bioactivity?: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface EnsemblGeneResponse {
  id: string;
  display_name: string;
  description: string;
  biotype: string;
  seq_region_name: string;
  start: number;
  end: number;
  strand: number;
}

export interface UniProtResponse {
  primaryAccession: string;
  uniProtkbId: string;
  proteinDescription: {
    recommendedName: {
      fullName: {
        value: string;
      };
    };
  };
  organism: {
    scientificName: string;
  };
  sequence: {
    length: number;
  };
  features: Array<{
    type: string;
    category: string;
    description: string;
    begin: number;
    end: number;
  }>;
}

export interface ChemblResponse {
  molecules: Array<{
    molecule_chembl_id: string;
    pref_name: string;
    molecule_structures?: {
      canonical_smiles: string;
    };
    molecule_properties?: {
      mw_freebase: number;
    };
    max_phase?: number;
  }>;
}