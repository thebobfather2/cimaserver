const jwt = require('jsonwebtoken');
const { ROLES_LIST } = require('../config');

// Verify JWT token middleware
function verifyJWT(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = decoded.UserInfo;
    next();
  });
}

// Verify user roles middleware
function verifyRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.roles = roles;
    next();
  };
}

module.exports = { verifyJWT, verifyRoles };
