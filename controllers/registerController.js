const User = require('../model/User');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    console.log(req.body); // Log the request body
    const { user, pwd, email } = req.body;
    if (!user || !pwd || !email) return res.status(400).json({ 'message': 'Username, password, and email are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const userId = uuidv4();
        const result = await User.create({
            "userId": userId,
            "username": user,
            "password": hashedPwd,
            "email": email
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
