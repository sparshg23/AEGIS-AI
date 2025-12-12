import { useState, useEffect } from 'react';
import { Threat } from '../types/threats';

interface ThreatsData {
  threats: Threat[];
  avgRiskScore: number;
  timestamp: string;
}

export function useThreats(refreshInterval = 5000) {
  const [data, setData] = useState<ThreatsData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/threats');
        if (!response.ok) throw new Error('Network response was not ok');
        const newData = await response.json();
        setData(newData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { data, error, isLoading };
}
