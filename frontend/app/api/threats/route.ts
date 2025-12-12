// app/api/threats/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Force dynamic prevents caching so you see new threats instantly
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1. Fetch Real Data from Postgres
    const threats = await prisma.threats.findMany({
      orderBy: {
        detected_at: 'desc',
      },
      take: 20,
    });

    // 2. Calculate Average Risk Score
    const totalRisk = threats.reduce((sum, t) => sum + t.risk_score, 0);
    const avgRiskScore = threats.length > 0 ? Math.round(totalRisk / threats.length) : 0;

    // 3. Return the data WITHOUT renaming fields
    // This ensures your frontend can find 'threat.detected_at' and 'threat.ip_address'
    return NextResponse.json({
      threats: threats, 
      avgRiskScore: avgRiskScore,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch real data' },
      { status: 500 }
    );
  }
}