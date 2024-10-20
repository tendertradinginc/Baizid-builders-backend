const express = require("express");
const router = express.Router();
const blogController = require("../../controllers/blogs.controller");

router.route("/").get(blogController.getAllBlogs);
router.route("/create-blog").post(blogController.createBlog);

router
  .route("/:blogId")
  .get(blogController.getSingleBlog)
  .delete(blogController.DeleteSingleBlog)
  .put(blogController.updateSingleBlog);

module.exports = router;
