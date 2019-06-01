const conn = require("./conn");
const Entry = require("./models/Entry");
const entries = require("./seed");

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    return Promise.all(
      entries.map(entry =>
        Entry.create({
          content: entry.content,
          latitude: entry.latitude,
          longitude: entry.longitude,
          likes : entry.likes
        })
      )
    );
  });
};

module.exports = {
  syncAndSeed
};
