import { useCisoBriefing } from '../hooks/useCisoBriefing';
import { formatDistanceToNow } from 'date-fns';

export default function CisoBriefing() {
  const { data, error, isLoading } = useCisoBriefing(10000); // Update every 10 seconds

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-red-500/20">
        <h3 className="text-red-400 font-medium mb-2">Briefing Unavailable</h3>
        <p className="text-gray-400 text-sm">Unable to fetch latest briefing</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 font-medium">CISO Briefing</h3>
        <span className="text-xs text-gray-500">
          {data?.timestamp ? 
            `Updated ${formatDistanceToNow(new Date(data.timestamp))} ago` : 
            'Updating...'}
        </span>
      </div>
      <p className="text-gray-200">{data?.briefing}</p>
      {data?.severity && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs text-gray-400">Severity:</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
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
