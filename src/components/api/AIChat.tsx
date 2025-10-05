// src/components/AIChat.tsx
import React, { useState, useCallback } from 'react';

export default function AIChat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = useCallback(async () => {
    // Prevent multiple simultaneous requests
    if (loading) {
      return;
    }

    // Prevent empty questions
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

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
  }, [question, loading]);

  return (
    <div style={{ maxWidth: 800, margin: '1rem auto', fontFamily: 'sans-serif', padding: '0 1rem' }}>
      {/* Medical Disclaimer */}
      <div style={{ 
        background: '#fff3cd', 
        border: '1px solid #ffeaa7', 
        borderRadius: '8px', 
        padding: '12px', 
        marginBottom: '20px',
        fontSize: '14px'
      }}>
        <strong>⚠️ Important Medical Disclaimer:</strong><br/>
        Dr. HealthBot provides general health information only and is NOT a replacement for professional medical advice, diagnosis, or treatment. 
        Always consult with qualified healthcare professionals for serious medical concerns. In emergencies, call 911 immediately.
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#2c5aa0', margin: '0 0 8px 0' }}>🩺 Dr. HealthBot</h2>
        <p style={{ color: '#666', margin: '0', fontSize: '16px' }}>Your AI Healthcare Assistant</p>
      </div>

      <div style={{ 
        background: '#f8f9fa', 
        borderRadius: '12px', 
        padding: '20px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#2c5aa0' }}>Ask Your Health Question</h3>
        
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          style={{ 
            width: '100%', 
            padding: '12px', 
            fontSize: '16px',
            border: '2px solid #dee2e6',
            borderRadius: '8px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
          placeholder="Describe your symptoms, ask about medications, or get general health guidance..."
        />
        
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <button 
            onClick={ask} 
            disabled={loading || !question.trim()}
            style={{
              background: loading ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              minWidth: '120px'
            }}
          >
            {loading ? '🔄 Analyzing...' : '💬 Ask Dr. HealthBot'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ 
          color: '#dc3545', 
          marginTop: '16px', 
          padding: '12px',
          background: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '8px'
        }}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {answer && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          border: '2px solid #d4edda', 
          background: '#d1ecf1',
          borderRadius: '12px',
          borderLeft: '5px solid #17a2b8'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '24px', marginRight: '8px' }}>🩺</span>
            <strong style={{ color: '#2c5aa0', fontSize: '18px' }}>Dr. HealthBot's Response</strong>
          </div>
          <div style={{ 
            marginTop: '12px', 
            whiteSpace: 'pre-wrap', 
            lineHeight: '1.6',
            fontSize: '15px',
            color: '#333'
          }}>
            {answer}
          </div>
        </div>
      )}

      {/* Quick Health Tips */}
      <div style={{ 
        marginTop: '24px', 
        padding: '16px', 
        background: '#e7f3ff', 
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#0066cc' }}>💡 Quick Health Tips</h4>
        <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px', color: '#333' }}>
          <li>Stay hydrated - drink 8 glasses of water daily</li>
          <li>Get 7-9 hours of quality sleep each night</li>
          <li>Exercise regularly - aim for 150 minutes per week</li>
          <li>Eat a balanced diet with fruits and vegetables</li>
          <li>Schedule regular check-ups with your doctor</li>
        </ul>
      </div>
    </div>
  );
}