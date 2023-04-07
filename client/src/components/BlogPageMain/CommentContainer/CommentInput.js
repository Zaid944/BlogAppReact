import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Input from "@mui/material/Input";
import { Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Comment from "./Comment";
import { db } from "../../../firebase_setup/firebase";
import { modifyDate } from "../../../utils/functions/ModifyDate";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
const ariaLabel = { "aria-label": "description" };

function CommentInput() {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const disable = localStorage.getItem("name");
  const blogCollectionRef = collection(db, "comments");
  const getComments = async () => {
    const data = await getDocs(blogCollectionRef);
    setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, []);
  const InputCommentHandler = (e) => {
    setContent(e.target.value);
  };
  const createComment = async () => {
    await setDoc(doc(db, "comments", "new-city-id"), {
      name: localStorage.getItem("name"),
      date: modifyDate(new Date()),
      comment: content,
      profilePic: localStorage.getItem("profilePic"),
    });
    setComments((prevComments) => {
      return [
        ...prevComments,
        {
          name: localStorage.getItem("name"),
          date: modifyDate(new Date()),
          comment: content,
          profilePic: localStorage.getItem("profilePic"),
        },
      ];
    });
    setContent("");
  };
  const deleteComment = async (idDel) => {
    const Comment = doc(db, "comments", idDel);
    await deleteDoc(Comment);
    const modCommentList = comments.filter((comment) => {
      return comment.id !== idDel;
    });
    setComments(modCommentList);
  };
  return (
    <>
      <div className='w-full mt-8'>
        <div className='text-2xl'>{comments.length} Comments</div>
        <div className='flex w-full mt-4'>
          <div className='flex justify-start pt-1'>
            <div>
              <AccountCircleIcon fontSize='large' />
            </div>
          </div>
          <div className='w-full ml-4 pt-1'>
            <Input
              placeholder='Enter A Comment'
              inputProps={ariaLabel}
              className='w-full'
              onChange={InputCommentHandler}
              value={content}
              disabled={disable ? false : true}
            />
          </div>
        </div>
        <div className='flex justify-end mt-3'>
          <Button
            variant='contained'
            endIcon={<SendIcon />}
            onClick={createComment}
            disabled={disable ? false : true}
          >
            Comment
          </Button>
        </div>
      </div>
      <Grid container spacing={2} className='mb-10'>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              deleteCommentHandler={deleteComment}
            />
          );
        })}
      </Grid>
    </>
  );
}

export default CommentInput;
