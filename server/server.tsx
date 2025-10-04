// server/index.ts
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

app.use(express.json());
app.use(
  cors({
    origin: process.env.VITE_DEV_ORIGIN || 'http://localhost:8080/questions/ask',
  })
);

// Basic rate limiter (tune for your usage)
const limiter = rateLimit({
  windowMs: 60_000, // 1 minute
  max: 30, // max requests per IP per windowMs
});
app.use(limiter);

app.post('/api/AIChat', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'question (non-empty string) is required' });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'Server misconfiguration: OPENAI_API_KEY missing' });
    }

    const payload = {
      model: 'gpt-3.5-turbo', // Force default model to avoid 404 errors
      messages: [
        { role: 'system', content: 'You are a helpful assistant. Answer concisely and clearly.' },
        { role: 'user', content: question },
      ],
      max_tokens: 800,
      temperature: 0.2,
    };

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errText = await r.text().catch(() => '');
      return res.status(r.status).json({ error: errText || 'OpenAI API error' });
    }

    const data = await r.json();
    const answer = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? null;

    if (!answer) return res.status(500).json({ error: 'No answer returned from AI' });

    return res.status(200).json({ answer });
  } catch (err: any) {
    console.error('AI fetch failed:', err);
    return res.status(500).json({ error: 'Server error making AI request' });
  }
});

app.listen(PORT, () => {
  console.log(`AI server listening on http://localhost:${PORT}`);
});