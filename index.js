// backend/index.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const userRoutes      = require('./Routes/userRoutes');
const ticketRoutes    = require('./Routes/ticketRoutes');      // (make in 1.4)
const dashboardRoutes = require('./Routes/dashboardRoutes');   // (make in 1.5)

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route mounts (⤵ stays in sync with your front‑end axios calls)
// backend/index.js
app.use('/users', require('./Routes/userRoutes')); // ✅
app.use('/tickets', ticketRoutes);    // POST /tickets       |  GET /tickets
app.use('/api',    dashboardRoutes);  // GET  /api/dashboard

app.get('/', (_, res) => res.json({ ok: true, message: 'API is alive 👋' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅  Server running →  http://localhost:${PORT}`),
);

