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
        const allPosts = await Post.find().sort({ _id: -1 });
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

  static async getArchiveBlog(req, res) {
    try {
      if (req.query.page && req.query.paginatenumber) {
        const paginate = req.query.paginatenumber;
        const pageNumber = req.query.page;
        const GoalePosts = await Post.find({ published: true })
          .sort({ _id: -1 })
          .skip((pageNumber - 1) * paginate)
          .limit(paginate)
          .select({
            title: 1,
            slug: 1,
            image: 1,
          });
        const AllPostslength = await Post.find().length;
        res.status(200).json({ GoalePosts, AllPostslength });
      } else {
        const allPosts = await Post.find().sort({ _id: -1 });
        res.status(200).json(allPosts);
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error on get archive posts",
      });
    }
  }

  static getOnePost = express_async_handler(async (req, res) => {
    try {
      const getGoalPost = await Post.findOne({ slug: req.params.slug });

      if (!getGoalPost) {
        return res.status(404).json({ msg: "Post not found" });
      }
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
  });

  // static async getOnePost(req, res) {
  //   try {
  //     const getGoalPost = await Post.findOne({ slug: req.params.slug });
  //     const newPost = {
  //       postView: getGoalPost.postView + 1,
  //     };
  //     await Post.findByIdAndUpdate(getGoalPost._id, newPost, {
  //       new: true,
  //     });
  //     res.status(200).json(getGoalPost);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({
  //       msg: "error on get post",
  //     });
  //   }
  // }

  static async getNewposts(req, res) {
    try {
      const newPosts = await Post.find() //{published:true}
        .sort({ createAt: -1 }) // Sort by creation date in descending order ={ createAt: -1 } | {_id :-l}
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
  static async getMostViewedPosts(req, res) {
    try {
      const mostviewPosts = await Post.find({published:true})
        .sort({ postView: -1 }) 
        .limit(2)
        .select({
          title: 1,
          slug: 1,
          image: 1,
          postView:1
        });
      res.status(200).json(mostviewPosts);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on get most view posts",
      });
    }
  }
  static async getRelatedPosts(req, res) {
    try {
      const relPosts = await Post.find({published:true,relatedPosts:req.body.relIDs})
        .select({
          title: 1,
          slug: 1,
          image: 1,
        });
      res.status(200).json(relPosts);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on get related posts",
      });
    }
  }
}

module.exports = PostController;
