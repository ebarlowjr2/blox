import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0]?.message?.content || 'No reply generated.';
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Failed to fetch AI response.' }, { status: 500 });
  }
}