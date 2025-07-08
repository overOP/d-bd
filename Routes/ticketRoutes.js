const express   = require('express');
const prisma    = require('../config/Prisma');
const authCheck = require('../Middleware/authCheck');

const router = express.Router();


router.post('/', authCheck, async (req, res) => {
  try {
    const { device, issue } = req.body;
    const ticket = await prisma.ticket.create({
      data: {
        device,
        issue,
        customerId: req.user.id,
      },
    });
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create ticket' });
  }
});


router.get('/', authCheck, async (req, res) => {
  const tickets = await prisma.ticket.findMany({
    where: { customerId: req.user.id },
    orderBy: { createdAt: 'desc' },
  });
  res.json(tickets);
});

module.exports = router;
