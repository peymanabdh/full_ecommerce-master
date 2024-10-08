const MiddleBaner = require("../model/MiddleBaner");
const express_async_handler = require("express-async-handler");

class MiddleBanerController {
  static async getAllMiddleBaners(req, res) {
    try {
      if (req.query.page && req.query.paginatenumber) {
        const paginate = req.query.paginatenumber;
        const pageNumber = req.query.page;
        const GoaleMiddleBaners = await MiddleBaner.find()
          .sort({ _id: -1 })
          .skip((pageNumber - 1) * paginate)
          .limit(paginate);
        res.status(200).json(GoaleMiddleBaners);
      } else {
        const allMiddleBaners = await MiddleBaner.find();
        res.status(200).json(allMiddleBaners);
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error",
      });
    }
  }

  static async newMiddleBaners(req, res) {
    try {
      const newMiddleBaners = await MiddleBaner({
        image: req.body.image,
        imageAlt: req.body.imageAlt,
        situation: req.body.situation,
        link: req.body.link,
        date: new Date().toLocaleDateString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      newMiddleBaners.save();
      res.status(200).json({
        msg: "بنر ذخیره شد",
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error",
      });
    }
  }
  static async getActiveBaners(req, res) {
    try {
      const activMidBaners = await MiddleBaner.find({ situation: true }).select(
        { image: 1, imageAlt: 1, link: 1 }
      );
      res.status(200).json(activMidBaners);
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error",
      });
    }
  }
}

module.exports = MiddleBanerController;
