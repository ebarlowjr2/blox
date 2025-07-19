import { NextResponse } from 'next/server';

function detectResearchRequest(message: string): boolean {
  const researchKeywords = ['research', 'search for', 'find information', 'look up', 'investigate'];
  const slashCommands = ['/research', '/search', '/deep'];
  
  const lowerMessage = message.toLowerCase();
  
  if (slashCommands.some(cmd => lowerMessage.startsWith(cmd))) {
    return true;
  }
  
  return researchKeywords.some(keyword => lowerMessage.includes(keyword));
}

export async function POST(req: Request) {
  const { message } = await req.json();

  const isResearchRequest = detectResearchRequest(message);

  if (isResearchRequest) {
    try {
      const researchResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
      });

      if (!researchResponse.ok) {
        throw new Error(`Research API error: ${researchResponse.status}`);
      }

      const researchData = await researchResponse.json();
      
      return NextResponse.json({ 
        reply: researchData.summary,
        sources: researchData.sources || [],
        researchSummary: researchData.summary
      });
    } catch (error: unknown) {
      console.error('Research API error:', error);
      return NextResponse.json({ error: 'Failed to perform research.' }, { status: 500 });
    }
  }

  try {
    const response = await fetch(`${process.env.N8N_AGENT_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message,
        requestType: 'chat',
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`N8N API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.response || 'No reply generated.';
    
    return NextResponse.json({ 
      reply,
      sources: data.sources || [],
      researchSummary: data.researchSummary || null
    });
  } catch (error: unknown) {
    console.error('N8N API error:', error);
    return NextResponse.json({ error: 'Failed to fetch AI response.' }, { status: 500 });
  }
}
