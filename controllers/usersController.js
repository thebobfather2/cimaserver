const User = require('../model/User');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ 'message': 'No users found' });
  res.json(users);
}

const deleteUser = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
}

const getUser = async (req, res) => {
  if (!req?.params?.username) return res.status(400).json({ "message": 'Username required' });
  try {
    const user = await User.findOne({ username: req.params.username }).select('username').exec();
    if (!user) {
      return res.status(204).json({ 'message': `User ${req.params.username} not found` });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'message': 'Server error' });
  }
}

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
}
