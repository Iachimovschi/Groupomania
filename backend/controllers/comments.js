const models = require("../models");
const faker = require("faker");


const createComment = async (req, res) => {
  try {
    const comment = await models.Comment.create(req.body);
    return res.status(201).json({
      comment,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deleted = await models.Comment.destroy({
      where: { id: commentId },
    });
    if (deleted) {
      return res.status(204).send("Comment deleted");
    }
    throw new Error("Comment not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const createFakeComment = async (_, res) => {
  try {
    let comment;
    for (let index = 15; index < 20; index++) {
      const fakeComment = {
        content: faker.lorem.paragraph(),
        postId: 8,
        userId: index,
      };
      comment = await models.Comment.create(fakeComment);
    }
    return res.status(201).json({
      comment,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createComment,
  createFakeComment,
  deleteComment,
};
