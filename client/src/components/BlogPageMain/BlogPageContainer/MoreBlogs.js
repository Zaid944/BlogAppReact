import React, { useState, useEffect , useRef} from "react";
import { Grid } from "@mui/material";
import MoreBlog from "./MoreBlog";
function MoreBlogs({ blogList, id }) {
  const [top3Blogs, setTop3Blogs] = useState([]);
  const defaultBlogs = useRef(blogList)
  useEffect(() => {
    let excludeBlogs = blogList.filter((b) => {
      return b._id !== id;
    });
    excludeBlogs =
      excludeBlogs.length <= 3 ? excludeBlogs : excludeBlogs.slice(0, 3);
      setTop3Blogs(excludeBlogs);
  }, [id,blogList]);

  return (
    <Grid container spacing={2} style ={{marginBottom:'10px'}}>
      {top3Blogs.map((blog) => {
        return <MoreBlog blog={blog} blogList = {defaultBlogs.current} key = {blog._id}/>;
      })}
    </Grid>
  );
}

export default MoreBlogs;
