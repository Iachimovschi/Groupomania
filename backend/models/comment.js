module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      content: { type: DataTypes.TEXT, allowNull: false },
      postId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );

  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
    });
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });
  };
  return Comment;
};
