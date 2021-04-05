const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      role: { type: DataTypes.STRING },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(password) {
         
          const hash = bcrypt.hashSync(password, 10);
          this.setDataValue("password", hash);
        },
      },
    },
    {}
  );

 
  User.associate = function (models) {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts",
      onDelete: "cascade",
    });

    User.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "comments",
      onDelete: "cascade",
    });
  };
  return User;
};
