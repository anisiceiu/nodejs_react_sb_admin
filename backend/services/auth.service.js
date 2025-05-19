const bcrypt = require('bcryptjs');
const db = require('../models');
const jwt = require('../utils/jwt.util');

const register = async (userData) => {
  const { FirstName, LastName, Username, Email, Password } = userData;
  
  // Check if user exists
  const existingUser = await db.User.findOne({ where: { Email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(Password, salt);

  // Create user
  const user = await db.User.create({
    FirstName,
    LastName,
    Username,
    Email,
    PasswordHash: hashedPassword
  });

  // Generate token
  const token = jwt.generateToken(user.Id);

  return { user, token };
};

const login = async (email, password) => {
  // Find user
  const user = await db.User.findOne({ where: { Email: email } });
  if (!user) {
    throw new Error('User not found');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.PasswordHash);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate token
  const token = jwt.generateToken(user.Id);

  return { user, token };
};

const logout = async (token) => {
  // In a real app, you might want to implement token blacklisting here
  return true;
};

module.exports = {
  register,
  login,
  logout
};