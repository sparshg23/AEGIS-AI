import { useCisoBriefing } from '../hooks/useCisoBriefing';
import { formatDistanceToNow } from 'date-fns';

export default function StrategicBriefingCard() {
  const { data, error, isLoading } = useCisoBriefing(10000);

  if (isLoading) {
    return (
      <div className="w-full bg-gray-800 border-2 border-red-500/50 rounded-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-gray-800 border-2 border-red-500/50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-2">Strategic Brief Unavailable</h2>
        <p className="text-gray-400">Unable to fetch latest strategic briefing</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-800 border-2 border-red-500/50 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-400">Strategic Brief</h2>
        </div>
        <span className="text-sm text-gray-500">
          {data?.timestamp ? 
            `Updated ${formatDistanceToNow(new Date(data.timestamp))} ago` : 
            'Updating...'}
        </span>
      </div>
      <p className="text-xl font-medium text-gray-100 leading-relaxed">
        {data?.briefing || 'Loading briefing...'}
      </p>
      {data?.severity && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-400">Threat Level:</span>
          <span className={`text-sm px-3 py-1 rounded-full font-medium ${
            data.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
            data.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
            data.severity === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {data.severity.charAt(0).toUpperCase() + data.severity.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
}
