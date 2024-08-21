const express = require("express");
const categoryRouter = express.Router();
const productCtrl = require("../../../controller/productCtrl");

// postRouter.get("/get-archive-blog", postController.getArchiveBlog);
categoryRouter.get("/products", productCtrl.getAllCategory);
categoryRouter.post("/add-new-product", productCtrl.newCategory);
categoryRouter.post("/update-product/:id", productCtrl.updateCategory);
categoryRouter.post("/delete-product/:id", productCtrl.deleteCategory);
categoryRouter.get("/:slug", productCtrl.getOneCategory);

module.exports = postRouter;
