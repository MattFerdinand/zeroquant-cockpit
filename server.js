const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Market data store (in-memory)
let marketData = {
  TSLA: { price: 245.67, change: +2.34, volume: 45000000, status: 'ACTIVE' },
  SPY: { price: 523.45, change: -1.23, volume: 89000000, status: 'ACTIVE' },
  QQQ: { price: 432.10, change: +0.88, volume: 67000000, status: 'ACTIVE' },
  XRP: { price: 0.52, change: +0.03, volume: 1200000000, status: 'ACTIVE' }
};

// Trade log store
let tradeLog = [
  {
    timestamp: new Date().toISOString(),
    symbol: 'TSLA',
    action: 'BUY',
    price: 245.67,
    ai: 'Claude',
    status: 'EXECUTED'
  }
];

// API: Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '2.0.0'
  });
});

// API: System status
app.get('/api/status', (req, res) => {
  res.json({
    services: {
      sendgrid: !!process.env.SENDGRID_API_KEY,
      googleSheets: !!process.env.GOOGLE_SHEETS_ID,
      polygon: !!process.env.POLYGON_API_KEY
    },
    marketData: Object.keys(marketData).length,
    lastUpdate: new Date().toISOString()
  });
});

// API: Trade log
app.get('/api/trades', (req, res) => {
  res.json(tradeLog.slice(-50));
});

// Cockpit dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Root redirect
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// 404 fallback
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API endpoint not found' });
  } else {
    res.redirect('/dashboard');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ZeroQuant v2.0 running on port ${PORT}`);
});
