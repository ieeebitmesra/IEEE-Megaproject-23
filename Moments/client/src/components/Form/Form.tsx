//@ts-nocheck
import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

//get the current id of the post

function Form({ currentId, setCurrentId }): JSX.Element {
  interface PostDataType {
    title: string;
    message: string;
    tags: String[];
    selectedFile: string;
  }

  const [postData, setPostData] = useState<PostDataType>({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state: any) =>
    currentId ? state.posts.posts.find((p: any) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  const clear = () => {
    setCurrentId(null),
      setPostData({
        title: "",
        message: "",
        tags: [],
        selectedFile: "",
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, {
          ...postData,
          name: user?.result?.name,
        })
      );
      clear();
    } else {
      dispatch(
        createPost(
          {
            ...postData,
            name: user?.result?.name,
            creatorId: user?.result?._id || user?.result?.sub,
          },
          navigate
        )
      );
      clear();
    }
  };
  // console.log(user?.result?.name);
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to capture your own moments and like other's
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper className={classes.paper} elevation={6}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root},${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? "Edit" : "Capture"} Your Moment
          </Typography>

          <TextField
            name="title"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          ></TextField>
          <TextField
            name="message"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          ></TextField>
          <TextField
            name="tags"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          ></TextField>
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Add
          </Button>
          <Button
            // className={classes.buttonSubmit}
            variant="contained"
            color="secondary"
            size="small"
            // type="submit"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default Form;
