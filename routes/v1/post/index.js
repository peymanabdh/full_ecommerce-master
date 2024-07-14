const express = require("express");
const postRouter = express.Router();
const postController = require("../../../controller/postCtrl");


postRouter.get("/get-archive-blog", postController.getArchiveBlog);
postRouter.get("/", postController.getAllPosts);
postRouter.post("/new-post", postController.newPost);
postRouter.post("/update-post/:id", postController.updatePost);
postRouter.post("/delete-post/:id", postController.deletePost);
postRouter.get("/get-new-posts", postController.getNewposts);
postRouter.get("/:slug", postController.getOnePost);


module.exports = postRouter;
