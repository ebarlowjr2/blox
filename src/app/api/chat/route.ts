import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const response = await fetch(`${process.env.N8N_AGENT_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`N8N API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.response || 'No reply generated.';
    
    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error('N8N API error:', error);
    return NextResponse.json({ error: 'Failed to fetch AI response.' }, { status: 500 });
  }
}
