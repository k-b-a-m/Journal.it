const Sequelize = require('sequelize');
const conn = require("../conn");

const User = conn.define('user', {
  facebookId: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  profilePic: Sequelize.STRING
});

module.exports = User;
