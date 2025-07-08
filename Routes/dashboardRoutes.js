const express   = require('express');
const prisma    = require('../config/Prisma');
const authCheck = require('../Middleware/authCheck');

const router = express.Router();


router.get('/dashboard', authCheck, async (_, res) => {
  try {
    const [ticketCount, userCount, spareCount, quoteCount] =
      await Promise.all([
        prisma.ticket.count(),
        prisma.user.count(),
        prisma.sparePart.count(),
        prisma.quote.count(),
      ]);

    res.json({
      quoatitionsList: quoteCount,
      repairList:      ticketCount,
      userList:        userCount,
      spareList:       spareCount,


      percentages:        0,
      repairPercentage:   0,
      userPercentage:     0,
      sparePercentage:    0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Dashboard error' });
  }
});

module.exports = router;
