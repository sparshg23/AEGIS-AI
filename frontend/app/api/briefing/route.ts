import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real app, this would come from a database or security service
    const briefings = [
      "Multiple brute force attempts detected from Eastern European IPs",
      "New zero-day vulnerability patched in core systems",
      "Suspicious traffic patterns identified in DMZ",
      "Security audit compliance at 94%",
      "DDoS protection systems operating normally"
    ];

    // Randomly select a briefing
    const briefing = briefings[Math.floor(Math.random() * briefings.length)];

    return NextResponse.json({
      briefing,
      timestamp: new Date().toISOString(),
      severity: 'moderate'
    });
  } catch (error) {
    console.error('Briefing API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
