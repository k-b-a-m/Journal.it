const conn = require('./conn');
const Entry = require('./models/Entry');

const entries = [
  "I can't be bothered with anything these days. Whatever. Maybe tomorrow. Shrug. My mind is like a bunch of nothing, but so it goes. Today was a complete loss.",
  "I've just been hanging out doing nothing. That's how it is. My mind is like a void. I just don't have much to say , but such is life. Oh well.",
  "Basically nothing going on right now. I guess it doesn't bother me. I've pretty much been doing nothing worth mentioning. Eh.",
  "You can't judge a book by it's cover or so i've been told, maybe i'm just living in a fantasy world where people act good to one another, but whats the fun in that? I feel, so, so whats the word... ah yes annoyed with people who think that i am something that i'm not when i barely even know them.",
];

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    return Promise.all(entries.map(entry => Entry.create({ content: entry })));
  });
};

module.exports = {
  syncAndSeed,
};
