const faker = require("faker");

const makeFakeEntry = () => {
  return {
    content: faker.lorem.sentence(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    likes: faker.random.number()
  };
};

const entries = [];

for (let i = 0; i < 5000; i++) {
  entries.push(makeFakeEntry());
}

module.exports = entries;
