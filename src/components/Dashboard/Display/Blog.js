import React, { useState, useContext } from "react";
import InputModal from "../Container/InputModal";
import { Link } from "react-router-dom";
import BlogContext from "../../../context/blog-crud-context";
import { Button } from "@mui/material";

function Blog({ itemDb, forInput, id }) {
  const ctx = useContext(BlogContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { Date, Content, Topic } = itemDb;
  const deleteItemHandler = () => {
    ctx.deleteItem(id);
  };
  const display = Content.length > 30 ? Content.slice(0, 30) : Content;
  return (
    <div
      className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 flex h-full rounded-xl'
      style={{
        backgroundColor: "rgb(255, 251, 235)",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <div
        className='w-1/5 rounded-l-xl'
        style={{ backgroundColor: "rgb(143, 186, 243)" }}
      ></div>
      <div className='p-3 h-full w-full mb-4'>
        <div className='h-1/3 mb-2'>
          <div className='text-xl mb-2 font-bold'>{Topic}</div>
          <div className='text-gray-500'>{Date}</div>
        </div>
        <div className='h-2/3 w-full'>
          <div className='h-1/2' style={{ wordWrap: "break-word" }}>
            {display}
            {Content.length > 30 ? "..." : ""}
          </div>
          {!forInput && (
            <div className='w-full flex items-end justify-between'>
              <div className='text-[#00308F]'>
                <Link
                  to={`/blogs/${itemDb.id}`}
                  state={{ itemDb: itemDb, blogList: ctx.blogList }}
                >
                  Continue reading...
                </Link>
              </div>
              <div className='flex'>
                <div className='pt-2'>
                  <Button
                    className='w-1 p-2'
                    variant='contained'
                    color='error'
                    onClick={deleteItemHandler}
                  >
                    <div className='text-xs'>Delete</div>
                  </Button>
                </div>
                <div className='ml-2 pt-2'>
                  <Button
                    className='w-1 p-2'
                    variant='contained'
                    onClick={handleOpen}
                  >
                    <div className='text-xs'>Update</div>
                  </Button>
                </div>
                <InputModal
                  update={true}
                  open={open}
                  handleClose={handleClose}
                  id={id}
                />
              </div>
            </div>
          )}
          {forInput && (
            <div>
              <div className='pt-3'>
                <Button
                  className='w-1 p-2'
                  variant='contained'
                  color='success'
                  onClick={handleOpen}
                >
                  <div className='text-xs'>Add</div>
                </Button>
              </div>
              <InputModal
                update={false}
                open={open}
                handleClose={handleClose}
                itemDb={itemDb}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;
