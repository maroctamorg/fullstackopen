const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readingList");
const Session = require("./session");

Blog.belongsTo(User);
User.hasMany(Blog);

Session.belongsTo(User);
User.hasMany(Session);

User.belongsToMany(Blog, {
  through: ReadingList,
  as: "readings",
  foreignKey: "userId",
  otherKey: "blogId",
});

Blog.belongsToMany(User, {
  through: ReadingList,
  as: "readers",
  foreignKey: "blogId",
  otherKey: "userId",
});

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};
