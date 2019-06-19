const faker = require('faker');
const fs = require('fs');
const path = require('path');

const warAndPeace = fs
  .readFileSync(path.join(__dirname + '/war_and_peace.txt'), 'utf8')
  .split('. ');

const makeFakeEntry = () => {
  const points = [
    [40.705125, -74.00898],
    [40.714178, -74.00626],
    [40.712094, -74.011946],
    [40.720909, -74.000678],
    [40.731208, -73.99747],
    [40.757863, -73.985554],
    [40.774226, -73.971878],
    [40.745086, -73.976254],
    [40.668159, -73.982455],
  ];
  const randomIdx = Math.floor(Math.random() * points.length);
  const coords = points[randomIdx];
  const fakeDateTime = faker.date.recent(15)

  return {
    content: warAndPeace[Math.floor(Math.random() * 16035)],
    //Faking loads of fake data around NYC
    //Unfortunately faker.address.latitude/longitude returns strings

    //Whole World
    // latitude: faker.finance.amount(-90,90,10),
    // longitude: faker.finance.amount(-180,180, 10),

    //Around NYC
    dateTime: fakeDateTime.toString(),
    latitude: faker.finance.amount(
      coords[0] - Math.random() * 0.005,
      coords[0] + Math.random() * 0.005,
      10
    ),
    longitude: faker.finance.amount(
      coords[1] - Math.random() * 0.005,
      coords[1] + Math.random() * 0.005,
      10
    ),
    likes: faker.random.number({
      min: 0,
      max: 100
    }),
    expireDate: new Date(Date.parse(fakeDateTime) + 30 * 24 * 60 * 60 * 1000).toString()
  };
};

const entries = [];
const users = [
  { name: 'Mariano' },
  { name: 'Bao' },
  { name: 'Kyle' },
  { name: 'Alex' },
];


for (let i = 0; i < 7000; i++) {
  entries.push(makeFakeEntry());
}

module.exports = { entries, users };
