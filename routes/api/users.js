const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

// get all users and delete user routes
router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

// get single user route
router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

// get user profile data route
router.get('/profile', (req, res) => {
    // retrieve user profile data and send as response
    res.send({ name: 'John Smith', profilePicture: 'https://example.com/profile-picture.jpg', bio: 'I like hiking and reading.' });
});

// update user profile data route
router.put('/profile', (req, res) => {
    // get the user ID from the request object
    const userId = req.user.id;

    // get the updated profile data from the request body
    const updatedProfileData = req.body;

    // update the user's profile data in the database
    usersController.updateUserProfile(userId, updatedProfileData)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
});

module.exports = router;
