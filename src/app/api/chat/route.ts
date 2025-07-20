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
    console.log('Processing chat message with OpenAI:', message);
    
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are BLOX, a helpful AI assistant. Respond naturally and helpfully to user queries. Be conversational and engaging.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (openaiResponse.ok) {
      const openaiData = await openaiResponse.json();
      const reply = openaiData.choices[0]?.message?.content || 'I apologize, but I\'m having trouble processing your request right now.';
      
      console.log('OpenAI response successful');
      return NextResponse.json({ 
        reply,
        sources: [],
        researchSummary: null
      });
    } else {
      console.error('OpenAI API failed:', openaiResponse.status);
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    
    const fallbackReply = "I'm currently experiencing connectivity issues. Please try again in a moment, or use research queries (like 'research [topic]') which are still available.";
    
    return NextResponse.json({ 
      reply: fallbackReply,
      sources: [],
      researchSummary: null
    });
  }
}
