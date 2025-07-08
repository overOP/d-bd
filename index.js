
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const userRoutes      = require('./Routes/userRoutes');
const ticketRoutes    = require('./Routes/ticketRoutes'); 
const dashboardRoutes = require('./Routes/dashboardRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', require('./Routes/userRoutes')); 
app.use('/tickets', ticketRoutes);
app.use('/api',    dashboardRoutes);

app.get('/', (_, res) => res.json({ ok: true, message: 'API is alive 👋' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅  Server running →  http://localhost:${PORT}`),
);

