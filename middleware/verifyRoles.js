const ROLES_LIST = require('../config/roles_list');
const PERMISSIONS_LIST = require('../config/permissions_list');

const verifyRoles = (...allowedRoles) => {
  const rolesArray = ['admin', 'user', ...allowedRoles];

  return (req, res, next) => {
    console.log('User roles:', req.roles);

    if (!req?.roles) {
      return res.sendStatus(401);
    }

    const result = req.roles.some(role => rolesArray.includes(role));
    
    if (!result) {
      return res.sendStatus(401);
    }

    // Check if the user has permission to perform the requested action
    const permission = PERMISSIONS_LIST[req.method]?.[req.baseUrl];
    if (permission) {
      const hasPermission = req.roles.some((role) => ROLES_LIST[role].permissions.includes(permission));
      if (!hasPermission) {
        return res.sendStatus(403);
      }
    }

    console.log(`User has a verified role: ${result}`);
    next(); // Call next() to move on to the next middleware function
  };
};

module.exports = verifyRoles;
