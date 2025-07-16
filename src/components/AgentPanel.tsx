'use client';

import { useState } from 'react';

export default function AgentPanel() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  };

  return (
    <div className="mt-4 border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Talk to BLOX</h2>
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Ask BLOX a question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>
      {response && <p className="mt-4 text-green-700 whitespace-pre-wrap">{response}</p>}
    </div>
  );
}