const express = require('express');
const router = express.Router();
const axios = require('axios');
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const PERMISSIONS_LIST = require('../../config/permissions_list');
const verifyRoles = require('../../middleware/verifyRoles');
const verifyJWT = require('../../middleware/verifyJWT'); // import the verifyJWT middleware

// Only allow users with the 'User' role to access this route
router.get('/me', verifyRoles(ROLES_LIST.User), verifyJWT, async (req, res, next) => {
    try {
        console.log('Fetching user data...');
        const response = await axios.get(`http://localhost:3000/api/users/${req.user.username}`, {
            headers: {
                Authorization: req.headers.authorization
            }
        });

        console.log(req.user);

        console.log('User data successfully fetched!');
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

router.get('/me/id', verifyRoles(ROLES_LIST.User), verifyJWT, async (req, res, next) => {
    try {
        console.log('Fetching user ID...');
        const response = await axios.get(`http://localhost:3000/api/users/${req.user.username}`, {
            headers: {
                Authorization: req.headers.authorization
            }
        });

        console.log(req.user);

        console.log('User ID successfully fetched!');
        res.json(response.data.id); // return the user ID
    } catch (error) {
        next(error);
    }
});

module.exports = router;