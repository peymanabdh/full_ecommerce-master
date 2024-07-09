const mongoose = require("mongoose");
const Post = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  slug: {
    required: true,
    type: String,
    unique: true,
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
  shortDescription: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  tags: {
    required: true,
    type: Array,
  },
  relatedPosts: {
    required: true,
    type: Array,
  },
  comments: {
    required: true,
    type: Array,
  },
  postType: {
    required: true,
    type: String,
    default: "post",
  },
  postView: {
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

module.exports = mongoose.model("Post", Post);
