const faker = require('faker');

const makeFakeEntry = () => {
  return {
    content: faker.lorem.sentence(),
    //Faking loads of fake data around NYC
    //Unfortunately faker.address.latitude/longitude returns strings

    //Whole World
    // latitude: faker.finance.amount(-90,90,10),
    // longitude: faker.finance.amount(-180,180, 10),

    //Around NYC
    dateTime: faker.date.recent(15).toString(),
    latitude: faker.finance.amount(40.7, 40.81, 10),
    longitude: faker.finance.amount(-74.02, -73.923, 10),
    likes: faker.random.number({
      min: 0,
      max: 100,
    }),
  };
};

const entries = [];

for (let i = 0; i < 30000; i++) {
  entries.push(makeFakeEntry());
}

module.exports = entries;
