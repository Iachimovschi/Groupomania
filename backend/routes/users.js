const { Router } = require("express");
const users = require("../controllers/users");
const auth = require("../middleware/auth");

const router = Router();

router.post("/signup", users.createUser);
router.post("/login", users.connectUser);

router.get("/:userId", auth, users.getUserById);
router.delete("/:userId", auth, users.deleteUser);

// TO DO: to delete
router.get("/fake", users.createFakeUser);

module.exports = router;
