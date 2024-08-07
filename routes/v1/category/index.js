const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../../../controller/CategoryCtrl");

// postRouter.get("/get-archive-blog", postController.getArchiveBlog);
categoryRouter.get("/cats", categoryController.getAllCategory);
categoryRouter.post("/add-new-category", categoryController.newCategory);
categoryRouter.post("/update-category/:id", categoryController.updateCategory);
categoryRouter.post("/delete-category/:id", categoryController.deleteCategory);
categoryRouter.get(
  "/get-active-category",
  categoryController.getActiveCategory
);
categoryRouter.get("/:slug", categoryController.getOneCategory);

module.exports = postRouter;
