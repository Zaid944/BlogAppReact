import React, { useEffect, useState } from "react";
import { modifyDate } from "../utils/functions/ModifyDate";
import axios from "axios";

const BlogContext = React.createContext({
  blogList: [],
  addItem: (blog) => {},
  deleteItem: (_id) => {},
  updateItem: (blog) => {},
});

export const BlogContextProvider = (props) => {
  const [blogList, setBlogList] = useState([]);

  const getBlogs = async () => {
    const response = await axios.get(
      "https://blogappreact-2.onrender.com/blogs"
    );
    console.log(response);
    setBlogList(response.data.blogs);
  };

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, []);

  const addItem = async (blog) => {
    console.log(blog);
    const res = await axios.post("https://blogappreact-2.onrender.com/blogs", {
      Date: modifyDate(new Date()),
      Topic: blog.Topic,
      Content: blog.Content,
    });
    console.log(res);
    setBlogList((prevBlog) => {
      return [
        ...prevBlog,
        {
          Date: modifyDate(new Date()),
          Topic: blog.Topic,
          Content: blog.Content,
        },
      ];
    });
  };

  const deleteItem = async (idDel) => {
    const res = await axios.delete(
      `https://blogappreact-2.onrender.com/blogs/${idDel}`
    );
    console.log(res);
    const newBlogList = blogList.filter((blog) => {
      return blog._id !== idDel;
    });
    setBlogList(newBlogList);
  };

  const updateItem = async (blog) => {
    const { Date, Topic, Content } = blog;
    await axios.put(`https://blogappreact-2.onrender.com/blogs/${blog._id}`, {
      Date,
      Topic,
      Content,
    });
    const newBlogList = blogList.map((currBlog) => {
      if (currBlog._id !== blog._id) {
        return currBlog;
      } else {
        return blog;
      }
    });
    setBlogList(newBlogList);
  };

  return (
    <BlogContext.Provider
      value={{
        blogList: blogList,
        addItem: addItem,
        deleteItem: deleteItem,
        updateItem: updateItem,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
