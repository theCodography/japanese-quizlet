import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma';

dotenv.config();
const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:4200'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Render health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Japan Quizlet API is running!' });
});

// Import Routers
import learnRoutes from './routes/learn.routes';
import deckRoutes from './routes/deck.routes';
import grammarRoutes from './routes/grammar.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import cardProgressRoutes from './routes/card-progress.routes';

// -- Gắn Router --
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/learn', learnRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/grammar', grammarRoutes);
app.use('/api/cards', cardProgressRoutes);

// -- API Dashboard Stats (Mock / Partial implement) --
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    // In real app, filter by req.user.id
    res.json({
      wordsLearned: 1248,
      streakDays: 14,
      xp: 4850
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[Server] API is running at http://localhost:${PORT}`);
});
