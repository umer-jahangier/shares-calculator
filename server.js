const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: '*', // Set to your Electron app origin in production
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// POST /api/split { totalAmount }
app.post('/api/split', (req, res) => {
  const { totalAmount } = req.body;
  if (typeof totalAmount !== 'number' || totalAmount <= 0) {
    return res.status(400).json({ error: 'Invalid totalAmount' });
  }
  const charity = totalAmount * 0.1;
  const remaining = totalAmount - charity;
  const mine = remaining * 0.4;
  const parents = remaining * 0.3;
  const savings = remaining * 0.3;
  res.json({ charity, mine, parents, savings });
});

// POST /api/reverse { desiredShare }
app.post('/api/reverse', (req, res) => {
  const { desiredShare } = req.body;
  if (typeof desiredShare !== 'number' || desiredShare <= 0) {
    return res.status(400).json({ error: 'Invalid desiredShare' });
  }
  const totalAfterCharity = desiredShare / 0.4;
  const total = totalAfterCharity / 0.9;
  res.json({ totalRequired: total });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
}); 