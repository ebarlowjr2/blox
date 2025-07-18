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
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const searchResults = await performBraveSearch(query);
    
    const summary = await summarizeResults(query, searchResults);
    
    return NextResponse.json({
      query,
      summary,
      sources: searchResults.slice(0, 5),
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Research API error:', error);
    return NextResponse.json({ error: 'Failed to perform research.' }, { status: 500 });
  }
}

async function performBraveSearch(query: string): Promise<BraveSearchResult[]> {
  const url = new URL('https://api.search.brave.com/res/v1/web/search');
  url.searchParams.append('q', query);
  url.searchParams.append('count', '10');
  url.searchParams.append('offset', '0');
  url.searchParams.append('mkt', 'en-US');
  url.searchParams.append('safesearch', 'moderate');
  url.searchParams.append('textDecorations', 'false');
  url.searchParams.append('textFormat', 'Raw');

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip',
      'X-Subscription-Token': process.env.BRAVE_SEARCH_API_KEY!,
    },
  });

  if (!response.ok) {
    throw new Error(`Brave Search API error: ${response.status}`);
  }

  const data: BraveSearchResponse = await response.json();
  return data.web?.results || [];
}

async function summarizeResults(query: string, results: BraveSearchResult[]): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
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
