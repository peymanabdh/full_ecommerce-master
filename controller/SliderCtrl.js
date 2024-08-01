const Slider = require("../model/Slider");
const express_async_handler = require("express-async-handler");

class SliderController {
  static async getAllSliders(req, res) {
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
  static async newSlide(req, res) {
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
  static async getActiveSlider(req, res) {
    try {
      const activSlider = await Slider.find({ situation: true })
        .sort({ sorter: -1 })
        .select({
          image: 1,
          imageAlt: 1,
          link: 1,
          sorter: 1,
        });
      res.status(200).json(activSlider);
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error on get active slide",
      });
    }
  }
}

module.exports = SliderController;
