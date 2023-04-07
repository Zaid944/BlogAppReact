if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const connectToDb = require("./config/connectToDb");
const blogController = require("./controllers/blogController");

const app = express();

app.use(express.json());
app.use(cors());

connectToDb();

app.get("/", (req, res) => {
  res.json({
    hello: "world",
  });
});

app.get("/blogs", blogController.fetchBlogs);

app.get("/blogs/:id", blogController.fetchBlog);

app.post("/blogs", blogController.createBlog);

app.put("/blogs/:id", blogController.updateBlog);

app.delete("/blogs/:id", blogController.deleteBlog);

app.listen(process.env.PORT);
