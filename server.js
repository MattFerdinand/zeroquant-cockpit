// --- API: Status ---
app.get('/api/status', (req, res) => {
  res.json({
    systemStatus: 'Online',
    environment: 'Production',
    timestamp: new Date().toISOString()
  });
});

// --- API: Trades ---
let tradeHistory = [
  { timestamp: new Date().toISOString(), symbol: 'XRP', action: 'BUY', price: 0.589 },
  { timestamp: new Date().toISOString(), symbol: 'XLM', action: 'SELL', price: 0.121 },
];

app.get('/api/trades', (req, res) => {
  res.json(tradeHistory);
});
