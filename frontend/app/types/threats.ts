export interface Threat {
  id: number;
  ip_address: string;
  risk_score: number;
  reason: string;
  action_taken: string;
  detected_at: string;
}

export type ThreatLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export const getRiskLevel = (score: number): ThreatLevel => {
  if (score < 30) return 'LOW';
  if (score < 60) return 'MODERATE';
  if (score < 80) return 'HIGH';
  return 'CRITICAL';
};

export const getRiskColor = (level: ThreatLevel): string => {
  const colors = {
    LOW: 'text-green-400',
    MODERATE: 'text-yellow-400',
    HIGH: 'text-orange-400',
    CRITICAL: 'text-red-400'
  };
  return colors[level];
};
