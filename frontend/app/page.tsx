'use client';
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [dots, setDots] = useState('');

  // Scanning animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold tracking-wider">
            AEGIS // ACTIVE DEFENSE SYSTEM
          </h1>
          <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            System Status: ONLINE
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Threat Level Card */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-gray-400 mb-2 text-sm font-medium">THREAT LEVEL</h2>
            <div className="text-yellow-400 text-4xl font-bold">MODERATE</div>
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
                <tr className="border-t border-gray-700">
                  <td className="py-4">2025-08-12 15:42:31</td>
                  <td className="py-4">192.168.1.105</td>
                  <td className="py-4">SQL Injection</td>
                  <td className="py-4 text-red-400">Blocked</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="py-4">2025-08-12 15:40:15</td>
                  <td className="py-4">192.168.1.223</td>
                  <td className="py-4">XSS Attempt</td>
                  <td className="py-4 text-red-400">Blocked</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="py-4">2025-08-12 15:38:52</td>
                  <td className="py-4">192.168.1.187</td>
                  <td className="py-4">Brute Force</td>
                  <td className="py-4 text-yellow-400">Rate Limited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
