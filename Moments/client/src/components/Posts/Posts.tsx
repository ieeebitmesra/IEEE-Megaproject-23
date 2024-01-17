//@ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";
// import { Id } from "@reduxjs/toolkit/dist/tsHelpers";
// import { useDispatch } from "react-redux";
// import { fetchPosts } from "../../api";

function Posts({ setCurrentId }): JSX.Element {
  // const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state: any) => state.posts);
  const classes = useStyles();
  // console.log(posts.length);

  if (!posts.length && !isLoading) return "No Posts";
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post: any) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
