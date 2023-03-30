import React, { useState, useEffect } from "react";
import { Modal, Button } from "@mui/material";

function InputModal({
  open,
  handleClose,
  addItemHandlerv2,
  update,
  updateItemHandlerv2,
  blogList,
  id,
}) {
  const [blogTopic, setBlogTopic] = useState("");
  const [blogContent, setBlogContent] = useState("");
  useEffect(() => {
    if (update) {
      blogList.map((i) => {
        if (i.id === id) {
          setBlogTopic(i.Topic);
          setBlogContent(i.Content);
        }
      });
    }
  }, [update, id]);

  const BlogTopicChange = (e) => {
    setBlogTopic(e.target.value);
  };
  const BlogContentChange = (e) => {
    setBlogContent(e.target.value);
  };
  const handleSubmit = () => {
    addItemHandlerv2({ Topic: blogTopic, Content: blogContent });
    setBlogTopic("");
    setBlogContent("");
    handleClose();
  };
  const handleUpdate = () => {
    updateItemHandlerv2({ id: id, Topic: blogTopic, Content: blogContent });
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
            <div class='mb-3'>
              <label for='BlogTopic' class='form-label'>
                Blog Topic
              </label>
              <input
                onChange={BlogTopicChange}
                type='text'
                class='form-control'
                id='BlogTopic'
                placeholder='Enter Blog Topic...'
                defaultValue={update ? blogTopic : ""}
                required
              />
            </div>
            <div class='mb-3'>
              <label for='BlogContent' class='form-label'>
                Blog Content
              </label>
              <textarea
                onChange={BlogContentChange}
                style={{ resize: "none", height: "200px" }}
                type='text'
                class='form-control'
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
