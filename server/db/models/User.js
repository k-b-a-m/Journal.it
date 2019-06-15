const Sequelize = require('sequelize');
const conn = require("../conn");

const User = conn.define('user', {
  facebookId: Sequelize.STRING,
  name: Sequelize.STRING,
});

module.exports = User;
