import React, { useEffect, useState } from "react";
import { db } from "../firebase_setup/firebase";
import { modifyDate } from "../utils/functions/ModifyDate";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";

const BlogContext = React.createContext({
  blogList: [],
  addItem: (blog) => {},
  deleteItem: (id) => {},
  updateItem: (blog) => {},
});

export const BlogContextProvider = (props) => {
  const [blogList, setBlogList] = useState([]);
  const blogCollectionRef = collection(db, "blogs");
  const getBlogs = async () => {
    const blogRef = await getDocs(blogCollectionRef);
    const fetchBlogs = [];
    blogRef.docs.forEach((doc) => {
      fetchBlogs.push({ ...doc.data(), id: doc.id });
    });
    setBlogList(fetchBlogs);
  };

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, []);

  const addItem = async (blog) => {
    await addDoc(blogCollectionRef, {
      Date: modifyDate(new Date()),
      Topic: blog.Topic,
      Content: blog.Content,
    });
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
    const blogDoc = doc(db, "blogs", idDel);
    await deleteDoc(blogDoc);
    const newBlogList = blogList.filter((blog) => {
      return blog.id !== idDel;
    });
    setBlogList(newBlogList);
  };

  const updateItem = async (blog) => {
    const blogDoc = doc(db, "blogs", blog.id);
    await updateDoc(blogDoc, {
      Date: blog.Date,
      Topic: blog.Topic,
      Content: blog.Content,
    });
    const newBlogList = blogList.map((currBlog) => {
      if (currBlog.id !== blog.id) {
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
