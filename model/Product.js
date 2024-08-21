const mongoose = require("mongoose");
const VariantSchema = new mongoose.Schema({
  attributes: {
    type: Map, // استفاده از Map برای نگهداری ترکیب ویژگی‌ها
    of: String, // نوع ویژگی‌ها می‌تواند String باشد، اما بسته به نیاز می‌توانید آن را تغییر دهید.
  },
  price: {
    type: Number,
    required: true,
  },
  offprice: {
    type: Number,
  },
  stock: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
    unique: true, // SKU منحصر به فرد برای هر واریانت
  },
});
const ProductSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  slug: {
    required: true,
    type: String,
  },
  image: {
    type: String,
    required: true,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  imageAlt: {
    required: true,
    type: String,
  },
  situation: {
    required: true,
    type: String,
    enum: ["published", "draft"],
  },
  shortDescription: {
    required: true,
    type: String,
  },
  longDescription: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  relatedProducts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    default: [],
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    default: [],
  },
  variants: {
    type: [ProductVariantSchema], // نوع آرایه‌ای از ProductVariantSchema
    default: [], // مقدار پیش‌فرض یک آرایه خالی است
  },
  basePrice: {
    type: Number,
    required: true,
  },
  baseOffprice: {
    type: Number,
  },
  stock: {
    type: Number,
    default: 0,
  },
  buyCount: {
    required: true,
    type: Number,
    default: 0,
  },
  ProductView: {
    required: true,
    type: Number,
    default: 0,
  },
  published: {
    required: true,
    type: Boolean,
    default: false,
  },
  createAt: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  updateeAt: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
});

module.exports = mongoose.model("Product", ProductSchema);
