const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  Date: {
    type: String,
    required: true,
  },
  Topic: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
});

const BlogModel = mongoose.model("BlogModel", blogSchema);

module.exports = BlogModel;
