const jwt = require('../utils/jwt.util');

exports.authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check for presence and type of Authorization header
    if (!authHeader || typeof authHeader !== 'string') {
      return res.status(401).json({ message: 'Authentication failed: Authorization header missing' });
    }

    // Check that it starts with "Bearer ", case-insensitive
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      return res.status(401).json({ message: 'Authentication failed: Bearer token malformed' });
    }

    const token = parts[1];
    const decoded = jwt.verifyToken(token); // Ensure this throws if token is invalid

    req.userId = decoded.id; // or decoded.userId depending on how you encode it
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed: Invalid or expired token' });
  }
};
