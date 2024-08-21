const product = require("../model/Product");
const helperFunctions = require("../util/helperFunctions");
const express_async_handler = require("express-async-handler");
const productSchema = require("./productValidation");

class productController {
  static async getAllproducts(req, res) {
    try {
      if (req.query.page && req.query.paginatenumber) {
        const paginate = req.query.paginatenumber;
        const pageNumber = req.query.page;
        const Goaleproducts = await product
          .find()
          .sort({ _id: -1 })
          .skip((pageNumber - 1) * paginate)
          .limit(paginate);
        const CoutnProducts = await (await product.find()).length;
        res.status(200).json(Goaleproducts, CoutnProducts);
      } else {
        const allproducts = await product.find().sort({ _id: -1 });
        res.status(200).json(allproducts);
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error on get all products",
      });
    }
  }
  static async newproduct(req, res) {
    try {
      const { error, value } = productSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          msg: "خطای اعتبارسنجی",
          details: error.details,
        });
      }
      const query = await product.findOne({ slug: req.body.slug });
      if (!query) {
        const data = req.body;
        data.slug = helperFunctions.TrimFnc(req.body.slug);

        const newproducts = await product.create(data);
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
        msg: "error on add new product",
      });
    }
  }
  static async updateproduct(req, res) {
    try {
      await product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({
        msg: "پست ویرایش شد",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on update product",
      });
    }
  }
  static async deleteproduct(req, res) {
    try {
      await product.findByIdAndRemove(req.params.id);
      res.status(200).json({
        msg: "پست حذف شد",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on remove product",
      });
    }
  }
  static async getArchiveBlog(req, res) {
    try {
      if (req.query.page && req.query.paginatenumber) {
        const paginate = req.query.paginatenumber;
        const pageNumber = req.query.page;
        const Goaleproducts = await product
          .find({ published: true })
          .sort({ _id: -1 })
          .skip((pageNumber - 1) * paginate)
          .limit(paginate)
          .select({
            title: 1,
            slug: 1,
            image: 1,
          });
        const Allproductslength = await product.find().length;
        res.status(200).json({ Goaleproducts, Allproductslength });
      } else {
        const allproducts = await product.find().sort({ _id: -1 });
        res.status(200).json(allproducts);
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({
        msg: "error on get archive products",
      });
    }
  }
  static getOneproduct = express_async_handler(async (req, res) => {
    try {
      const getGoalproduct = await product.findOne({ slug: req.params.slug });

      if (!getGoalproduct) {
        return res.status(404).json({ msg: "product not found" });
      }
      const newproduct = {
        productView: getGoalproduct.productView + 1,
      };
      await product.findByIdAndUpdate(getGoalproduct._id, newproduct, {
        new: true,
      });
      res.status(200).json(getGoalproduct);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on get product",
      });
    }
  });
  static async getNewproducts(req, res) {
    try {
      const newproducts = await product
        .find() //{published:true}
        .sort({ createAt: -1 }) // Sort by creation date in descending order ={ createAt: -1 } | {_id :-l}
        .limit(4) // Limit to the 4 newest products
        .select({
          title: 1,
          slug: 1,
          image: 1,
        });
      res.status(200).json(newproducts);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on get new products",
      });
    }
  }
  static async getMostViewedproducts(req, res) {
    try {
      const mostviewproducts = await product
        .find({ published: true })
        .sort({ productView: -1 })
        .limit(2)
        .select({
          title: 1,
          slug: 1,
          image: 1,
          productView: 1,
        });
      res.status(200).json(mostviewproducts);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on get most view products",
      });
    }
  }
  static async getRelatedproducts(req, res) {
    try {
      const relproducts = await product
        .find({ published: true, relatedproducts: req.body.relIDs })
        .select({
          title: 1,
          slug: 1,
          image: 1,
        });
      res.status(200).json(relproducts);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "error on get related products",
      });
    }
  }
}

module.exports = productController;
