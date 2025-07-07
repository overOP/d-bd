const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // header comes as:  "Bearer <token>"
    const raw = req.headers.authorization || '';
    const token = raw.split(' ')[1];       // <── strip “Bearer ”
    if (!token) return res.status(401).json({ message: 'No token' });

    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};
