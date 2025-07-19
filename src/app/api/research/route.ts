import { NextResponse } from 'next/server';

interface BraveSearchResult {
  title: string;
  url: string;
  description: string;
  published?: string;
}

interface BraveSearchResponse {
  web?: {
    results: BraveSearchResult[];
  };
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const apiKey = process.env.BRAVE_SEARCH_API_KEY || 'BSAh4rcEMDMWlFPpyVPsSyX-p9lwF1o';
    
    if (!apiKey) {
      return NextResponse.json({ error: 'Brave Search API key not configured' }, { status: 500 });
    }

    const searchResults = await performBraveSearch(query, apiKey);
    const summary = await summarizeResults(query, searchResults);
    
    return NextResponse.json({
      query,
      summary,
      sources: searchResults.slice(0, 5),
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Failed to perform research.' }, { status: 500 });
  }
}

async function performBraveSearch(query: string, apiKey: string): Promise<BraveSearchResult[]> {
  const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=3`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-Subscription-Token': apiKey,
    },
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brave Search API error: ${response.status} - ${errorText}`);
  }

  const data: BraveSearchResponse = await response.json();
  return data.web?.results || [];
}

async function summarizeResults(query: string, results: BraveSearchResult[]): Promise<string> {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === '') {
    return results.slice(0, 3).map(r => `${r.title}: ${r.description}`).join('\n\n');
  }

  const resultsText = results.slice(0, 5).map(r => 
    `Title: ${r.title}\nURL: ${r.url}\nDescription: ${r.description}`
  ).join('\n\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
          content: 'You are a research assistant. Summarize the search results into a comprehensive, well-structured response that directly answers the user\'s query. Include key findings and insights.'
        },
        {
          role: 'user',
          content: `Query: ${query}\n\nSearch Results:\n${resultsText}\n\nPlease provide a comprehensive summary that answers the query based on these search results.`
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'Unable to generate summary.';
}
