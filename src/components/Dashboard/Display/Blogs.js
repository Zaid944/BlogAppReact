import React, { useContext } from "react";
import Blog from "./Blog";
import BlogContext from "../../../context/blog-crud-context.js";
import { Grid, Fade } from "@mui/material";
import { modifyDate } from "../../../utils/functions/ModifyDate";
function Blogs() {
  const ctx = useContext(BlogContext);
  return (
    <div className='py-5 w-4/5 mx-auto'>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Blog
            itemDb={{
              Date: modifyDate(new Date()),
              Topic: "Enter Topic...",
              Content: "Enter Content...",
            }}
            forInput={true}
          />
        </Grid>
        {ctx.blogList.map((itemDb) => {
          return (
            <Fade in timeout={{ enter: 500 }} key={itemDb.id}>
              <Grid item xs={12} md={6}>
                <Blog itemDb={itemDb} forInput={false} id={itemDb.id} />
              </Grid>
            </Fade>
          );
        })}
      </Grid>
    </div>
  );
}

export default Blogs;
