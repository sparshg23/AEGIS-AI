import { useEffect, useRef } from 'react';
import { ThreatLevel, getRiskLevel, getRiskColor } from '../types/threats';

interface RiskScoreGaugeProps {
  score: number;
}

export default function RiskScoreGauge({ score }: RiskScoreGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const level = getRiskLevel(score);
  const colorClass = getRiskColor(level);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw score indicator
    const scoreAngle = Math.PI + (score / 100) * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, scoreAngle);
    ctx.strokeStyle = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${colorClass.replace('text-', '')}`);
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }, [score, colorClass]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={200}
        height={100}
        className="w-full"
      />
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className={`text-4xl font-bold ${colorClass}`}>{level}</div>
        <div className="text-gray-400 text-sm">Risk Score: {score}</div>
      </div>
    </div>
  );
}
