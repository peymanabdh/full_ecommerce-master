const mongoose = require("mongoose");
const MiddleBaner = mongoose.Schema({
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
    type: Boolean,
  },
  link: {
    required: true,
    type: String,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
});

module.exports = mongoose.model("MiddleBaner", MiddleBaner);
