const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4 // generate a new UUID for each new user
      },
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    profilePicture: String,
    bio: String,
    refreshToken: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
