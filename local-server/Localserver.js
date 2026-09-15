// Локал сервер 

const express = require('express');
const app = express();
const PORT = 3000;

// Хурдан endpoint 
app.get('/fast', (req, res) => {
  res.json({ ok: true, endpoint: 'fast' });
});

// Удаан endpoint 100ms зориуд саатуулсан
app.get('/slow', async (req, res) => {
  await new Promise((r) => setTimeout(r, 100));
  res.json({ ok: true, endpoint: 'slow' });
});

// CPU-гоор ачаалдаг endpoint event loop блоклоно
app.get('/heavy', (req, res) => {
  let sum = 0;
  for (let i = 0; i < 5_000_000; i++) sum += i;
  res.json({ ok: true, sum });
});

app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT} дээр ажиллаж байна`);
});
