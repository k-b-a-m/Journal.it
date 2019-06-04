const faker = require("faker");

const makeFakeEntry = () => {
  return {
    content: faker.lorem.sentence(),
    //Faking loads of fake data around NYC
    //Unfortunately faker.address.latitude/longitude returns strings
  
    //Whole World
    // latitude: faker.finance.amount(-90,90,10),
    // longitude: faker.finance.amount(-180,180, 10),

    //Around NYC
    latitude: faker.finance.amount(40.5,41,10),
    longitude: faker.finance.amount(-74.5,-74,10),
    likes: faker.random.number()
  };
};

const entries = [];

for (let i = 0; i < 5000; i++) {
  entries.push(makeFakeEntry());
}

module.exports = entries;
