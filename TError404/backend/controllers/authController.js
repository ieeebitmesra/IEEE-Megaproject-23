const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};



const login = async (req, res) => {
  try {
    const { username, password } = req.body; 
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET); 
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};


const protectedRoute = (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
};

const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decodedToken.username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current user', error: error.message });
  }
};

module.exports = { register, login, protectedRoute, getCurrentUser };