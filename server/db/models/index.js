const Entry = require('./Entry');
const User = require('./User');

Entry.belongsTo(User)
User.hasMany(Entry)

module.exports = { Entry, User };
