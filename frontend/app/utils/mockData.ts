import { Threat } from '../types/threats';

export const mockThreats: Threat[] = [
  {
    id: 1,
    ip_address: '192.168.1.105',
    risk_score: 85,
    reason: 'SQL Injection Attempt',
    action_taken: 'Blocked',
    detected_at: new Date(Date.now() - 5 * 60000).toISOString() // 5 minutes ago
  },
  {
    id: 2,
    ip_address: '192.168.1.223',
    risk_score: 75,
    reason: 'XSS Attack',
    action_taken: 'Blocked',
    detected_at: new Date(Date.now() - 10 * 60000).toISOString() // 10 minutes ago
  },
  {
    id: 3,
    ip_address: '192.168.1.187',
    risk_score: 45,
    reason: 'Brute Force Attempt',
    action_taken: 'Rate Limited',
    detected_at: new Date(Date.now() - 15 * 60000).toISOString() // 15 minutes ago
  }
];

export const getAverageMockRiskScore = () => {
  const sum = mockThreats.reduce((acc, threat) => acc + threat.risk_score, 0);
  return Math.round(sum / mockThreats.length);
};
