const BlogModel = require("../models/blogs");

const fetchBlogs = async (req, res) => {
  const blogs = await BlogModel.find();
  res.json({
    blogs,
  });
};

const fetchBlog = async (req, res) => {
  const blogId = req.params.id;
  const blog = await BlogModel.findById(blogId);
  res.json({
    blog,
  });
};

const createBlog = async (req, res) => {
  const { Date, Topic, Content } = req.body;
  const blog = await BlogModel.create({
    Date,
    Topic,
    Content,
  });
  res.json({
    blog,
  });
};

const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const { Date, Topic, Content } = req.body;
  await BlogModel.findByIdAndUpdate(blogId, {
    Date,
    Topic,
    Content,
  });
  const blog = await BlogModel.findById(blogId);
  res.json({
    blog,
  });
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  await BlogModel.findByIdAndDelete(blogId);
  res.json({
    success: "record deleted",
  });
};

module.exports = {
  fetchBlogs,
  fetchBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
