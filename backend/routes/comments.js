const { Router } = require("express");
const comments = require("../controllers/comments");
const auth = require("../middleware/auth");

const router = Router();

router.post("/", auth, comments.createComment);
router.delete("/:commentId", auth, comments.deleteComment);

// TO DO: to delete
router.get("/fake", auth, comments.createFakeComment);

module.exports = router;
