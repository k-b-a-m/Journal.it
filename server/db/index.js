const conn = require('./conn');

const syncAndSeed = () => {
  return conn.sync({ force: true });
  //TODO - can add seed data here
};

module.exports = {
  syncAndSeed,
};
