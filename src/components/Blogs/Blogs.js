import React, { useState, useEffect } from "react";
import Blog from "../Blog/Blog.js";
import "../Blogs/Blogs.css";
import { db } from "../../firebase_setup/firebase";
import { Grid } from "@mui/material";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";

function Blogs() {
  const today = new Date();
  const currDate =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  const [blogList, setBlogList] = useState([]);
  const blogCollectionRef = collection(db, "blogs");
  const getBlogs = async () => {
    const data = await getDocs(blogCollectionRef);
    setBlogList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getBlogs();
  }, [blogList]);
  const addItem = async (blog) => {
    await addDoc(blogCollectionRef, {
      Date: currDate,
      Topic: blog.Topic,
      Content: blog.Content,
    });
    setBlogList([
      ...blogList,
      { Date: currDate, Topic: blog.Topic, Content: blog.Content },
    ]);
  };
  const deleteItem = async (idDel) => {
    const blogDoc = doc(db, "blogs", idDel);
    await deleteDoc(blogDoc);
    const modBlogList = blogList.filter((blog) => {
      return blog.id !== idDel;
    });
    setBlogList(modBlogList);
  };

  const updateItem = async (blog) => {
    const blogDoc = doc(db, "blogs", blog.id);
    await updateDoc(blogDoc, {
      Date: currDate,
      Topic: blog.Topic,
      Content: blog.Content,
    });
    setBlogList(
      blogList.map((b) => {
        return b.id === blog.id
          ? {
              id: blog.id,
              Date: currDate,
              Topic: blog.Topic,
              Content: blog.Content,
            }
          : b;
      })
    );
  };

  return (
    <div className='py-5 w-4/5 mx-auto'>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Blog
            itemDb={{
              Date: currDate,
              Topic: "Enter Topic...",
              Content: "Enter Content...",
            }}
            addItemHandler={addItem}
            forInput={true}
          />
        </Grid>
        {blogList.map((itemDb) => {
          return (
            <Grid item xs={12} md={6}>
              <Blog
                itemDb={itemDb}
                deleteItemHandler={deleteItem}
                updateItemHandler={updateItem}
                forInput={false}
                id={itemDb.id}
                blogList={blogList}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Blogs;
