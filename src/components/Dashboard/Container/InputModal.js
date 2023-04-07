import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "@mui/material";
import BlogContext from "../../../context/blog-crud-context";

function InputModal({ open, handleClose, update, id }) {
  const [blogTopic, setBlogTopic] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const ctx = useContext(BlogContext);
  useEffect(() => {
    if (update) {
      ctx.blogList.forEach((i) => {
        if (i.id === id) {
          setBlogTopic(i.Topic);
          setBlogContent(i.Content);
          setBlogDate(i.Date);
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  const BlogTopicChange = (e) => {
    setBlogTopic(e.target.value);
  };
  const BlogContentChange = (e) => {
    setBlogContent(e.target.value);
  };
  const handleSubmit = () => {
    ctx.addItem({ Topic: blogTopic, Content: blogContent });
    setBlogTopic("");
    setBlogContent("");
    handleClose();
  };
  const handleUpdate = () => {
    ctx.updateItem({
      id: id,
      Date: blogDate,
      Topic: blogTopic,
      Content: blogContent,
    });
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div
        className='bg-white p-4 top-1/2 left-1/2 absolute w-1/2 rounded-xl shadow-lg'
        style={{
          transform: "translate(-50%, -50%)",
          height: "500px",
        }}
      >
        <div className='text-xl font-bold'>
          {update ? "Update Blog" : "Create Blog"}
        </div>
        <div className='mt-4'>
          <form onSubmit={update ? handleUpdate : handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='BlogTopic' className='form-label'>
                Blog Topic
              </label>
              <input
                onChange={BlogTopicChange}
                type='text'
                className='form-control'
                id='BlogTopic'
                placeholder='Enter Blog Topic...'
                defaultValue={update ? blogTopic : ""}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='BlogContent' className='form-label'>
                Blog Content
              </label>
              <textarea
                onChange={BlogContentChange}
                style={{ resize: "none", height: "200px" }}
                type='text'
                className='form-control'
                id='BlogContent'
                placeholder='Enter Blog Content...'
                defaultValue={update ? blogContent : ""}
                required
              />
            </div>
            <Button
              type='submit'
              className='mt-2'
              variant='contained'
              color='success'
            >
              {update ? "Update Blog" : "Create Blog"}
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default InputModal;
