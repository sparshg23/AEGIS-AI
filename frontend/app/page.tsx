'use client';
import { useState, useEffect } from "react";
import RiskScoreGauge from "./components/RiskScoreGauge";
import CisoBriefing from "./components/CisoBriefing";
import StrategicBriefingCard from "./components/StrategicBriefingCard";
import { useThreats } from "./hooks/useThreats";
import { formatDistanceToNow } from "date-fns";

export default function Home() {
  const [dots, setDots] = useState('');
  const { data, error, isLoading } = useThreats(3000);

  // Scanning animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const avgRiskScore = data?.avgRiskScore || 50;

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-xl font-bold">AEGIS</span>
        </div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 text-blue-400 hover:text-blue-300">
            <span>Live Monitor</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-gray-300">
            <span>Threat History</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-gray-300">
            <span>Settings</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-wider">
            AEGIS // ACTIVE DEFENSE SYSTEM
          </h1>
          <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            System Status: ONLINE
          </div>
        </header>

        {/* Strategic Briefing */}
        <div className="mb-6">
          <StrategicBriefingCard />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-6">
            {/* Threat Level Card */}
            <div className="bg-gray-800 p-6 rounded-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="text-gray-400 mb-2 text-sm font-medium">THREAT LEVEL</h2>
              <RiskScoreGauge score={avgRiskScore} />
            </div>

            {/* CISO Briefing */}
            <CisoBriefing />
          </div>

          {/* Live Map */}
          <div className="bg-gray-800 p-6 rounded-lg relative min-h-[200px] flex items-center justify-center">
            <div className="text-gray-500 flex items-center gap-2">
              <div className="animate-spin w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
              Scanning{dots}
            </div>
          </div>
        </div>

        {/* Recent Intercepts Table */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Intercepts</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="text-left pb-4">Timestamp</th>
                  <th className="text-left pb-4">Source IP</th>
                  <th className="text-left pb-4">Attack Type</th>
                  <th className="text-left pb-4">Action Taken</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      Loading threat data...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-red-400">
                      Error loading threat data
                    </td>
                  </tr>
                ) : (
                  data?.threats.map((threat) => (
                    <tr key={threat.id} className="border-t border-gray-700 hover:bg-gray-800/50 transition-colors">
                      <td className="py-4">{formatDistanceToNow(new Date(threat.detected_at))} ago</td>
                      <td className="py-4">{threat.ip_address}</td>
                      <td className="py-4">{threat.reason}</td>
                      <td className={`py-4 ${
                        threat.action_taken === 'Blocked' ? 'text-red-400' :
                        threat.action_taken === 'Rate Limited' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {threat.action_taken}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
