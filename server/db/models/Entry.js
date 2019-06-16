const conn = require('../conn');
const {Sequelize} = conn;

module.exports = conn.define(
  'entry',
  {
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
      type: Sequelize.DATE,
    },
    likes: {
      type: Sequelize.INTEGER,
    },
    spotifyUrl: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
    expireDate: {
      type: Sequelize.DATE
    } 
  },
  {
    indexes: [
      {
        unique: false,
        fields: ['latitude', 'longitude'],
      },
    ],
  }
);
