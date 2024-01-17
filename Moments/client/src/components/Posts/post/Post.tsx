//@ts-nocheck
import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { ButtonBase } from "@mui/material";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyles from "./styles";
import moment from "moment";
import { deletePost, likePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Post({ post, setCurrentId }): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [likes, setLikes] = useState(post?.likes);

  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);
  console.log(post);

  const userId = user?.result?._id || user?.result?.sub;

  console.log(likes);
  console.log(userId);
  const hasLikedPost = post.likes.find((like: any) => like === userId);

  const handleLike = () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id: any) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };
  const Likes = () => {
    if (likes?.length > 0) {
      return post.likes.find((like: any) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <>
      <Card className={classes.card} raised elevation={6}>
        <div className={classes.cardActions}>
          {userId === post.creatorId && (
            <>
              {"             "}
              <div className={classes.overlay2}>
                <Button
                  style={{ color: "white" }}
                  size="small"
                  onClick={() => {
                    setCurrentId(post._id);
                  }}
                >
                  <MoreHorizIcon fontSize="medium" />
                </Button>
              </div>
            </>
          )}

          <CardMedia
            className={classes.media}
            image={post.selectedFile}
            title={post.title}
          />

          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>

          <div
            className={classes.cardContainer}
            onClick={openPost}
            style={{ cursor: "pointer" }}
          >
            <div className={classes.details}>
              <Typography variant="body2" color="textSecondary">
                {post.tags.map((tag: string) => `#${tag} `)}
              </Typography>
            </div>
            <Typography className={classes.title} gutterBottom>
              {post.title}
            </Typography>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {post.message}
              </Typography>
            </CardContent>
          </div>
        </div>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLike}
          >
            <Likes />
          </Button>

          {userId === post.creatorId && (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}

export default Post;
