import React from "react";
import Grid from "@mui/material/Grid";
import {Link} from 'react-router-dom'
function MoreBlogs({ blog ,blogList}) {
  const { Topic, Date, Content } = blog;
  return (
    <Grid item xs={12}>
      <div
        className='p-2.5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'
        style={{
          color: "rgb(17, 29, 94)",
          backgroundColor: "rgb(255, 251, 235)",
        }}
      >
        <div className='text-2xl font-bold'>{Topic}</div>
        <div className='mb-2 text-sm'>{Date}</div>
        <div className='mb-4'>{Content}</div>
        <div style={{ color: "#00308F" }}>
          <Link
            to={`/blogs/${blog.id}`}
            state={{ itemDb: blog, blogList: blogList }}
          >
            Continue reading...
          </Link>
        </div>
      </div>
    </Grid>
  );
}

export default MoreBlogs;
