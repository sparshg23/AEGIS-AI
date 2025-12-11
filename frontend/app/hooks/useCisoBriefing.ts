import { useState, useEffect } from 'react';

interface BriefingData {
  briefing: string;
  timestamp: string;
  severity: string;
}

export function useCisoBriefing(refreshInterval = 30000) { // Default 30 seconds
  const [data, setData] = useState<BriefingData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBriefing = async () => {
      try {
        const response = await fetch('/api/briefing');
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

    fetchBriefing();
    const interval = setInterval(fetchBriefing, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { data, error, isLoading };
}
