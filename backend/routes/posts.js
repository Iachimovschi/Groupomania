const { Router } = require("express");
const posts = require("../controllers/posts");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", auth, posts.getAllPosts);
router.post("/", auth, posts.createPost);
router.get("/:postId", auth, posts.getPostById);
router.put("/:postId", auth, posts.updatePost); // only admin and author
router.delete("/:postId", auth, posts.deletePost); // only admin and author

// TO DO: to delete
router.get("/fake", auth, posts.createFakePost);

module.exports = router;
