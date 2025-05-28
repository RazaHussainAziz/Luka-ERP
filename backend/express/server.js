import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
