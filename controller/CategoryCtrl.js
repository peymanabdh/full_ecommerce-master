const Category = require("../model/Category");
const express_async_handler = require("express-async-handler");

class CategoryController {
  static async getAllCategory(req, res) {
    try {
      if (req.query.page && req.query.paginatenumber) {
        const paginate = req.query.paginatenumber;
        const pageNumber = req.query.page;
        const GoaleCategory = await Category.find()
          .sort({ _id: -1 })
          .skip((pageNumber - 1) * paginate)
          .limit(paginate);
        res.status(200).json(GoaleCategory);
      } else {
        const allCategory = await Category.find();
        res.status(200).json(allCategory);
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error",
      });
    }
  }
  static async newCategory(req, res) {
    try {
      const newCategory = await Category({
        image: req.body.image,
        imageAlt: req.body.imageAlt,
        situation: req.body.situation,
        slug: req.body.slug,
        date: new Date().toLocaleDateString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      newCategory.save();
      res.status(200).json({
        msg: "دسته بندی ذخیره شد",
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error",
      });
    }
  }
  static async updateCategory(req, res) {
    try {
      const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        msg: "دسته بندی اپدیت شد",
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error on update category",
      });
    }
  }
  static async deleteCategory(req, res) {
    try {
      const deleteCategory = await Category.findByIdAndRemove(req.params.id);

      res.status(200).json({
        msg: "دسته بندی حذف شد",
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error on remove category",
      });
    }
  }
  static async getOneCategory(req, res) {
    try {
      const getOneCategory = await Category.findById(req.params.id);

      res.status(200).json(getOneCategory);
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error on get one category",
      });
    }
  }
  static async getActiveCategory(req, res) {
    try {
      const activMidCategory = await Category.find({ situation: true }).select({
        image: 1,
        imageAlt: 1,
        slug: 1,
        title: 1,
      });
      res.status(200).json(activMidCategory);
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error on active category",
      });
    }
  }
  static getOneCategory = express_async_handler(async (req, res) => {
    try {
      const getGoalCategory = await Category.findOne({ slug: req.params.slug });

      if (!getGoalCategory.situation) {
        return res.status(404).json({ msg: "کتگوری هنوز منتشر نشده" });
      }
      res.status(200).json(getGoalCategory);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on get getOneCategory",
      });
    }
  });
}

module.exports = CategoryController;
