import React from "react";
import { Button, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
function Comment({ comment, deleteCommentHandler }) {
  const deleteCall = () => {
    deleteCommentHandler(comment.id)
  }
  return (
    <Grid item xs={12} className = "flex">
      <div>
        <img
          src={comment.profilePic}
          style={{ height: "33px", borderRadius: "50%" }}
          alt='Not Signed In'
        />
      </div>
      <div
        style={{
          width: "100%",
          paddingLeft: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontWeight: "bold" }}>{comment.name}</div>
          <span style={{ fontSize: "0.9rem", color: "gray" }}>
            {comment.date}
          </span>
          <div>{comment.comment}</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Button variant='outlined' color='error' startIcon={<DeleteIcon />} onClick = {deleteCall}>
            Delete
          </Button>
        </div>
      </div>
    </Grid>
  );
}

export default Comment;
