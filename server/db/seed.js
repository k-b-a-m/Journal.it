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

  const spotifyList = [
    'https://open.spotify.com/track/5ry2OE6R2zPQFDO85XkgRb?si=G9hTsWtZR5Gr8GG2JHB_Zg',
    'https://open.spotify.com/track/29fRTIKsJhLUJoldM89GZS?si=sV9SaP3zSVqKvaoJI6JKDA',
    'https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m?si=dPZkz30fQ3q6Lts7D9QZ_Q',
    'https://open.spotify.com/track/5qmq61DAAOUaW8AUo8xKhh?si=fdXBjClaSiiN60c0Gx7I2A',
    'https://open.spotify.com/track/2gwkD6igEhQbDQegRCcdoB?si=hSAUjoFtQYiiY-73DMJJ7A',
    'https://open.spotify.com/track/6u7jPi22kF8CTQ3rb9DHE7?si=IZNInc72RqOr-69Ok-QHjA',
    'https://open.spotify.com/track/3HVWdVOQ0ZA45FuZGSfvns?si=BgorO5RcRmW38uv1tR-HfA',
    'https://open.spotify.com/track/7FEwp8BavoEVE3AnxJDchc?si=xyvpNbs8TyyBdCecZQYFcw',
    'https://open.spotify.com/track/5hVghJ4KaYES3BFUATCYn0?si=Eo0Nss4kTs6yr0GMp0wR_A',
    'https://open.spotify.com/track/6uFn47ACjqYkc0jADwEdj1?si=55llttrRTbmVidF3inYDeg',
    'https://open.spotify.com/track/3KkXRkHbMCARz0aVfEt68P?si=DCUEbxivRqKn5dU_T2AAow',
    'https://open.spotify.com/track/1xbtojAZsQjOgiGdGX6ChU?si=9OsAv58pQEe6ns-CT2psJQ',
    'https://open.spotify.com/track/6TqXcAFInzjp0bODyvrWEq?si=pc1cz1lsRpuhhwOWeo4x9A',
    'https://open.spotify.com/track/5PYQUBXc7NYeI1obMKSJK0?si=AfQIhBcXRSKhTBn2Dlcg-Q',
    'https://open.spotify.com/track/6LsAAHotRLMOHfCsSfYCsz?si=ZhrbVxttRgGmoqaW5mXyUQ',
    'https://open.spotify.com/track/2JvzF1RMd7lE3KmFlsyZD8?si=rVR229CxSkCZ8lsTA_HFzA',
    'https://open.spotify.com/track/22vgEDb5hykfaTwLuskFGD?si=nk7bGow5SNye7AZU9eYxIA',
    'https://open.spotify.com/track/1kK6DwzyXJSp58u5HYWwuD?si=WddUUEQHTTKduhNQQ2kx4A',
    'https://open.spotify.com/track/6MWtB6iiXyIwun0YzU6DFP?si=8kH5qoFiQt6b_INdzZ2f0w',
    'https://open.spotify.com/track/3XiNC94b4Tq1xwv70sQJGN?si=4JZISJLjSo2VIEInFQ6hEA'
  ]
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
    expireDate: new Date(Date.parse(fakeDateTime) + 30 * 24 * 60 * 60 * 1000).toString(),
    spotifyUrl: spotifyList[Math.floor(Math.random()*20)]
  };
};

const entries = [];
const users = [
  { name: 'Mariano' },
  { name: 'Bao' },
  { name: 'Kyle' },
  { name: 'Alex' },
];

for (let i = 0; i < 20000; i++) {
  entries.push(makeFakeEntry());
}


module.exports = { entries, users };
