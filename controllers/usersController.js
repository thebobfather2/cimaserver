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
  if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
  }
  res.json(user);
}

const updateUser = async (req, res) => {
  const { name, profilePicture, bio } = req.body;
  if (!name || !profilePicture || !bio) return res.status(400).json({ 'message': 'Name, profile picture, and bio are required fields.' });
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { name, profilePicture, bio },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'message': 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser
}
