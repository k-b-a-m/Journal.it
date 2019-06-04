const faker = require("faker");

const makeFakeEntry = () => {
  return {
    content: faker.lorem.sentence(),
    //Faking loads of fake data around NYC
    latitude: faker.address.latitude({
      min:40.6,
      max:40.8
    }),
    longitude: faker.address.longitude({
      min:73.9,
      max:74.1
    }),
    likes: faker.random.number()
  };
};

const entries = [];

for (let i = 0; i < 5000; i++) {
  entries.push(makeFakeEntry());
}

module.exports = entries;
