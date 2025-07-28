import { GuideRNA, CrisprDesignParams, EditPrediction, EditOutcome, ApiResponse } from '@/types/api';

export class CrisprService {
  // PAM sequences for different Cas proteins
  private static readonly PAM_PATTERNS = {
    'Cas9': 'NGG',
    'Cas12a': 'TTTV', // V = A, C, or G
  };

  static async designGuideRNAs(params: CrisprDesignParams): Promise<ApiResponse<GuideRNA[]>> {
    try {
      // This would typically call a CRISPR design API
      // For now, implementing basic gRNA finding algorithm
      
      // First, get gene sequence (this would come from Ensembl)
      const sequence = await this.getGeneSequence(params.gene);
      
      if (!sequence) {
        throw new Error('Could not retrieve gene sequence');
      }

      const guides = this.findPotentialGuides(sequence, 'Cas9');
      const scoredGuides = guides.map(guide => ({
        ...guide,
        onTargetScore: this.calculateOnTargetScore(guide.sequence),
        offTargetCount: Math.floor(Math.random() * 50), // Mock off-target count
        offTargetMaxScore: Math.random() * 0.5, // Mock max off-target score
        efficiency: this.getEfficiencyFromScore(this.calculateOnTargetScore(guide.sequence)),
      }));

      // Sort by on-target score (descending)
      scoredGuides.sort((a, b) => b.onTargetScore - a.onTargetScore);

      return {
        data: scoredGuides.slice(0, 10), // Return top 10 guides
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

  private static async getGeneSequence(gene: string): Promise<string> {
    // Mock sequence - in real implementation, this would fetch from Ensembl
    return 'ATGGCCTACTGGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTGAAGAACCAGAGGCCTACCTG';
  }

  private static findPotentialGuides(sequence: string, casType: 'Cas9' | 'Cas12a' = 'Cas9'): Omit<GuideRNA, 'onTargetScore' | 'offTargetCount' | 'offTargetMaxScore' | 'efficiency'>[] {
    const guides: Omit<GuideRNA, 'onTargetScore' | 'offTargetCount' | 'offTargetMaxScore' | 'efficiency'>[] = [];
    const pamPattern = casType === 'Cas9' ? /[ATCG]GG/g : /TTT[ACG]/g;
    
    let match;
    while ((match = pamPattern.exec(sequence)) !== null) {
      const pamStart = match.index;
      const pamSequence = match[0];
      
      if (casType === 'Cas9') {
        // For Cas9, guide is 20bp upstream of PAM
        if (pamStart >= 20) {
          const guideSequence = sequence.slice(pamStart - 20, pamStart);
          guides.push({
            id: `guide_${guides.length + 1}`,
            sequence: guideSequence,
            pam: pamSequence,
            position: pamStart - 17, // Cut site is ~3bp upstream of PAM
            strand: '+',
          });
        }
      } else if (casType === 'Cas12a') {
        // For Cas12a, guide is 20bp downstream of PAM
        if (pamStart + 23 <= sequence.length) {
          const guideSequence = sequence.slice(pamStart + 4, pamStart + 24);
          guides.push({
            id: `guide_${guides.length + 1}`,
            sequence: guideSequence,
            pam: pamSequence,
            position: pamStart + 22, // Cut site is ~18bp downstream of PAM
            strand: '+',
          });
        }
      }
    }

    // Also search reverse complement
    const reverseComplement = this.getReverseComplement(sequence);
    let reverseMatch;
    pamPattern.lastIndex = 0; // Reset regex
    
    while ((reverseMatch = pamPattern.exec(reverseComplement)) !== null) {
      const pamStart = reverseMatch.index;
      const pamSequence = reverseMatch[0];
      
      if (casType === 'Cas9' && pamStart >= 20) {
        const guideSequence = reverseComplement.slice(pamStart - 20, pamStart);
        const originalPosition = sequence.length - (pamStart - 17);
        guides.push({
          id: `guide_${guides.length + 1}`,
          sequence: guideSequence,
          pam: pamSequence,
          position: originalPosition,
          strand: '-',
        });
      }
    }

    return guides;
  }

  private static getReverseComplement(sequence: string): string {
    const complement: { [key: string]: string } = {
      'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'
    };
    
    return sequence
      .split('')
      .reverse()
      .map(base => complement[base] || base)
      .join('');
  }

  private static calculateOnTargetScore(sequence: string): number {
    // Simplified Doench 2016 scoring algorithm
    // Real implementation would use the full model
    let score = 0.5; // Base score
    
    // Penalize for high GC content at 3' end
    const last6 = sequence.slice(-6);
    const gcContent = (last6.match(/[GC]/g) || []).length / 6;
    if (gcContent > 0.7) score -= 0.2;
    
    // Favor certain nucleotides at specific positions
    if (sequence[19] === 'G') score += 0.1; // G at position 20
    if (sequence[18] === 'C') score += 0.05; // C at position 19
    
    // Penalize for poly-T runs
    if (sequence.includes('TTTT')) score -= 0.3;
    
    // Add some randomness to simulate more complex scoring
    score += (Math.random() - 0.5) * 0.2;
    
    return Math.max(0, Math.min(1, score));
  }

  private static getEfficiencyFromScore(score: number): 'high' | 'medium' | 'low' {
    if (score >= 0.7) return 'high';
    if (score >= 0.4) return 'medium';
    return 'low';
  }

  static async predictEditOutcomes(guideRNA: GuideRNA, sequence: string): Promise<ApiResponse<EditPrediction>> {
    try {
      // Mock edit prediction based on known NHEJ patterns
      const outcomes: EditOutcome[] = [
        { type: 'deletion', sequence: '', size: 1, frequency: 0.25 },
        { type: 'deletion', sequence: '', size: 3, frequency: 0.20 },
        { type: 'deletion', sequence: '', size: 7, frequency: 0.15 },
        { type: 'insertion', sequence: 'A', size: 1, frequency: 0.18 },
        { type: 'insertion', sequence: 'AT', size: 2, frequency: 0.12 },
        { type: 'insertion', sequence: 'ATCG', size: 4, frequency: 0.10 },
      ];

      // Calculate frameshift risk
      const frameshiftOutcomes = outcomes.filter(o => o.size % 3 !== 0);
      const frameshiftRisk = frameshiftOutcomes.reduce((sum, o) => sum + o.frequency, 0);

      const prediction: EditPrediction = {
        frameshiftRisk,
        splicingRisk: Math.random() * 0.3, // Mock splicing risk
        conservationScore: Math.random() * 0.8 + 0.2, // Mock conservation score
        outcomes,
      };

      return {
        data: prediction,
        success: true,
      };
    } catch (error) {
      return {
        data: {} as EditPrediction,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}