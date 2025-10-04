// src/components/AIChat.tsx
import React, { useState } from 'react';

export default function AIChat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const resp = await fetch('/api/AIChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData?.error || `Request failed: ${resp.status}`);
      }

      const data = await resp.json();
      setAnswer(data.answer);
    } catch (err: any) {
      setError(err?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '1rem auto', fontFamily: 'sans-serif' }}>
      <h3>Ask the AI assistant</h3>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: 8, fontSize: 14 }}
        placeholder="Type your question..."
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={ask} disabled={loading || !question.trim()}>
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </div>

      {error && <div style={{ color: 'red', marginTop: 12 }}>Error: {error}</div>}

      {answer && (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #eee', background: '#fafafa' }}>
          <strong>Answer</strong>
          <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>{answer}</div>
        </div>
      )}
    </div>
  );
}