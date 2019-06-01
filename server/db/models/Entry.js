const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('entry', {
  content: {
    type: Sequelize.TEXT,
  },
  latitude: {
    type: Sequelize.DECIMAL(11, 8),
  },
  longitude: {
    type: Sequelize.DECIMAL(11, 8),
  },
  dateTime: {
    type: Sequelize.STRING,
  },
  likes: {
    type: Sequelize.INTEGER,
  },
  bitcoinAddress: {
    type: Sequelize.STRING,
  },
});
