const conn = require("../conn");
const { Sequelize } = conn;

module.exports = conn.define(
  "entry",
  {
    content: {
      type: Sequelize.TEXT
    },
    latitude: {
      type: Sequelize.DECIMAL(11, 8)
    },
    longitude: {
      type: Sequelize.DECIMAL(11, 8)
    },
    dateTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    likes: {
      type: Sequelize.INTEGER
    },
    spotifyUrl: {
      type: Sequelize.STRING,
      defaultValue: ""
    },
    expireDate: {
      type: Sequelize.STRING
      // defaultValue: new Date(new Date(this.getDataValue("dateTime").getTime() + 30 * 24 * 60 * 60 * 1000))
    }
  },
  {
    indexes: [
      {
        unique: false,
        fields: ["latitude", "longitude"]
      }
    ]
  }
);
