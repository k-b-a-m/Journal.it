const conn = require('./conn');
const {entries, users} = require('./seed');
const {User, Entry} = require("./models/index");
const Sequelize = require('sequelize');

User.hasMany(Entry);

const syncAndSeed = () => {
  return conn
    .sync({force: true})
    .then(() => {
      return Promise.all(
        users.map(user =>
          User.create({
            name: user.name,
          })
        )
      )
    })
    .then(() => {
      return Promise.all(
        entries.map(entry =>
          Entry.create({
            content: entry.content,
            latitude: entry.latitude,
            longitude: entry.longitude,
            likes: entry.likes,
            dateTime: entry.dateTime,
            userId: 1,
          })
        )
      );
    })
    .then(() => console.log('db seeded'))
    .catch(e => console.log(`Error seeding data:\n${e}`));
};

module.exports = {
  syncAndSeed,
};
