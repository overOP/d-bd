
const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const prisma  = require('../config/Prisma');

const router = express.Router();

const makeToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

/* ───────── SIGN‑UP ───────── */
router.post('/signUp', async (req, res) => {
  try {
    const email    = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email & password required' });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash },
      select: { id: true, email: true, role: true },
    });

    const accessToken = makeToken(user);
    res.json({ success: true, user, accessToken });
  } catch (err) {
    console.error('SIGN‑UP error ➜', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ───────── LOGIN ───────── */
router.post('/login', async (req, res) => {
  try {
    const email    = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log('LOGIN ❌ No user for', email);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      console.log('LOGIN ❌ Bad password for', email);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = makeToken(payload);

    console.log('LOGIN ✅', email);
    res.json({ success: true, user: payload, accessToken });
  } catch (err) {
    console.error('LOGIN error ➜', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
