const models = require("../models/index");
const faker = require("faker");

const createPost = async (req, res) => {
  try {
    const post = await models.Post.create(req.body);
    return res.status(201).json({
      post,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  const offset = req.query.page === 1 ? 0 : req.query.page * 5 - 5;

  try {
    const posts = await models.Post.findAndCountAll({
      include: [
        {
          model: models.Comment,
          as: "comments",
        },
        {
          model: models.User,
          as: "author",
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 5,
      offset: offset,
    });
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await models.Post.findOne({
      where: { id: postId },
      include: [
        {
          model: models.Comment,
          as: "comments",
          include: [
            {
              model: models.User,
              as: "author",
            },
          ],
        },
        {
          model: models.User,
          as: "author",
        },
      ],
    });
    if (post) {
      return res.status(200).json({ post });
    }
    return res.status(404).send("Post with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const response = await models.Post.update(req.body, {
      where: { id: postId },
    });

    const updated = response[0];

    if (updated) {
      const updatedPost = await models.Post.findOne({ where: { id: postId } });
      return res.status(200).json({ post: updatedPost });
    }
    throw new Error("Post not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    // const postId = req.params.postId;
    const { postId } = req.params;
    const deleted = await models.Post.destroy({
      where: { id: postId },
    });
    if (deleted) {
      return res.status(204).json({ message: "Post deleted" });
    }
    throw new Error("Post not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//fake posts
const createFakePost = async (_, res) => {
  try {
    let post;
    for (let index = 0; index < 2; index++) {
      const fakePosts = {
        title: faker.lorem.words(),
        content: faker.lorem.paragraphs(),
        userId: 20,
        image: faker.image.image(),
      };
      post = await models.Post.create(fakePosts);
    }
    return res.status(201).json({
      post,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  createFakePost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
