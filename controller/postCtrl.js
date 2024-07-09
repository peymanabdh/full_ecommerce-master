const Post = require("../model/Post");
const helperFunctions = require("../util/helperFunctions");
const express_async_handler = require("express-async-handler");

class PostController {
  static async getAllPosts(req, res) {
    try {
      if (req.query.page && req.query.paginatenumber) {
        const paginate = req.query.paginatenumber;
        const pageNumber = req.query.page;
        const GoalePosts = await Post.find()
          .sort({ _id: -1 })
          .skip((pageNumber - 1) * paginate)
          .limit(paginate);
        res.status(200).json(GoalePosts);
      } else {
        const allPosts = await Post.find();
        res.status(200).json(allPosts);
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error on get all posts",
      });
    }
  }
  static async newPost(req, res) {
    try {
      const query = await Post.findOne({ slug: req.body.slug });
      if (!query) {
        const data = req.body;
        data.slug = helperFunctions.TrimFnc(req.body.slug);

        const newPosts = await Post.create(data);
        res.status(200).json({
          msg: "پست جدید ذخیره شد",
        });
      } else {
        res.status(400).json({
          msg: "پستی با این نامک پیدا شد",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error on add new post",
      });
    }
  }
  static async updatePost(req, res) {
    try {
      await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({
        msg: "پست ویرایش شد",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on update post",
      });
    }
  }
  static async deletePost(req, res) {
    try {
      await Post.findByIdAndRemove(req.params.id);
      res.status(200).json({
        msg: "پست حذف شد",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on remove post",
      });
    }
  }
  static async getOnePost(req, res) {
    try {
      const getGoalPost = await Post.findOne({ slug: req.params.slug });
      const newPost = {
        postView: getGoalPost.postView + 1,
      };
      await Post.findByIdAndUpdate(getGoalPost._id, newPost, {
        new: true,
      });
      res.status(200).json(getGoalPost);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on get post",
      });
    }
  }
  static async getNewposts(req, res) {
    try {
      const newPosts = await Post.find()
        .sort({ createAt: -1 }) // Sort by creation date in descending order
        .limit(4) // Limit to the 4 newest posts
        .select({
          title: 1,
          slug: 1,
          image: 1,
        });
      res.status(200).json(newPosts);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on get new posts",
      });
    }
  }
}

module.exports = PostController;
