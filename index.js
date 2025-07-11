require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./Routes/userRoutes');
const ticketRoutes = require('./Routes/ticketRoutes'); 
const dashboardRoutes = require('./Routes/dashboardRoutes');

const app = express();

const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/users', userRoutes); 
app.use('/tickets', ticketRoutes);
app.use('/api', dashboardRoutes);

// Test route
app.get('/', (_, res) => res.json({ ok: true, message: 'API is alive 👋' }));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running → http://localhost:${PORT}`)
);
