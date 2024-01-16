//@ts-nocheck
import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

function CommentSection({ post }: any) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef: any = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComment = await dispatch(commentPost(finalComment, post._id));

    commentsRef.current.scrollIntoView({ behaviour: "smooth" });

    setComments(newComment);
    setComment("");
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        <div
          className={
            comments.length > 5
              ? classes.commentsInnerContainer
              : classes.commentsInnerContainer2
          }
        >
          {comments.map((c: string, i: string) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}: </strong>
              {c.split(": ")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography variant="h6"> Write a comment</Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              color="primary"
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
