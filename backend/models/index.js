require("dotenv").config();
const Sequelize = require("sequelize");

const db = {};

// dbname  , username ,  password 
sequelize = new Sequelize("postgres","postgres","sofi1991", {
 
  dialect: "postgres",
  host: 'localhost',
  port : 5432
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Post = require("./post.js")(sequelize, Sequelize.DataTypes);
db.Comment = require("./comment.js")(sequelize, Sequelize.DataTypes);
db.User = require("./user.js")(sequelize, Sequelize.DataTypes);


db.Post.associate(db);
db.Comment.associate(db);
db.User.associate(db);

module.exports = db;
