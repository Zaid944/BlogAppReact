import React from "react";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MoreBlogs from './MoreBlogs'
import CommentInput from '../CommentContainer/CommentInput'

function BlogPage() {
  const location = useLocation();
  const { itemDb, blogList } = location.state;
  const { Topic, Content, Date } = itemDb;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid container spacing={2} style={{ width: "80%" }}>
        <Grid item xs={12}>
          <div
            className='mt-2 text-7xl pt-20 pb-20 pl-10'
            style={{
              backgroundColor: "rgb(2, 69, 163)",
              color: "rgb(242, 252, 252)",
            }}
          >
            {Topic}
          </div>
        </Grid>
        <Grid item xs={8}>
          <div
            style={{
              backgroundColor: "rgb(255, 251, 235)",
              color: "rgb(17, 29, 94)",
            }}
            className='p-3 text-2xl font-bold'
          >
            {Topic}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            style={{
              color: "rgb(17, 29, 94)",
              backgroundColor: "rgb(255, 251, 235)",
            }}
            className='p-3 text-2xl font-bold'
          >
            More Blogs
          </div>
        </Grid>
        <Grid item xs={8}>
          <div
            className='p-3'
            style={{
              color: "rgb(17, 29, 94)",
              backgroundColor: "rgb(255, 251, 235)",
            }}
          >
            <div className='mb-2 text-sm'>{Date}</div>
            <div>{Content} </div>
          </div>
          <CommentInput blogList={blogList} />
        </Grid>
        <Grid item xs={4}>
          <MoreBlogs blogList={blogList} id={itemDb.id} />
        </Grid>
      </Grid>
    </div>
  );
}

export default BlogPage;
