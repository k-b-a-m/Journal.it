const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('journal', {
  message: {
    type: Sequelize.TEXT
  },
  geotag: {
    type:
  }
});
