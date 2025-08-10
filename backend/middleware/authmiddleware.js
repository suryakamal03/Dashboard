// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../schema/Userschema.js');

const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Get the token from the header
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Get the user from the database
      req.user = await User.findById(decoded.id).select('-password');

      // Check if user still exists
      if (!req.user) {
        return res.status(401).json({ message: 'Token valid but user no longer exists' });
      }

      // 4. Move on to the next middleware/controller
      next();

    } catch (error) {
      console.error('Token verification error:', error);
      
      // Provide more specific error messages based on the error type
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else {
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }
  } else {
    // If there was no token found in the header at all
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };