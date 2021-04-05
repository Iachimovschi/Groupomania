const models = require("../models");
const faker = require("faker");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await models.User.findOne({
      where: { id: userId },
      include: [
        {
          model: models.Comment,
          as: "comments",
        },
        {
          model: models.Post,
          as: "posts",
        },
      ],
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send("User with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const createUser = async (req, res) => {
  try {
    const user = await models.User.create({ ...req.body, role: "user" });
    return res.status(201).json({
      id: user.id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.errors[0].message });
  }
};

const connectUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.User.findOne({
      where: { email: email },
    });
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return res.status(200).json({
          userId: user.id,
          role: user.role,
          token: jwt.sign(
            { userId: user.id, role: user.role },
           "mySecretKey",
            { expiresIn: "24h" }
          ),
        });
      }
      throw new Error("Password doesn't match");
    }
    throw new Error("User with the specified email does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = await models.User.destroy({
      where: { id: userId },
    });

    if (deleted) {
      return res.status(200).send("User deleted");
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//fake users
const createFakeUser = async (_, res) => {
  try {
    let user;
    for (let index = 0; index < 20; index++) {
      const fakeUsers = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatar: faker.image.avatar(),
      };

      user = await models.User.create(fakeUsers);
    }
    return res.status(201).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  connectUser,
  createFakeUser,
  getUserById,
  deleteUser,
};
