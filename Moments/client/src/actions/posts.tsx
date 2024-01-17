import * as api from "../api";
import { Dispatch } from "redux";
import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
} from "../constants/actionType";

//Action Creators

export const getPost = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
    console.log(data);
  } catch (error: any) {
    console.log(error);
  }
};

export const getPosts = (page: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
    console.log(data);
  } catch (error: any) {
    console.log(error);
  }
};

// interface Post {
//   // Define the type of properties in your Post object
//   title: string;
//   body: string;
//   // ...
// }

export const getPostsBySearch = (searchQuery: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost =
  (post: any, navigate: any) => async (dispatch: any) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createPost(post);

      dispatch({ type: CREATE, payload: data });
      navigate(`/posts/${data._id}`);
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log("some error", error);
    }
  };

export const updatePost =
  (id: string, post: any) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const deletePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost =
  (value: string, id: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.comment(value, id);
      // console.log(data);
      dispatch({ type: COMMENT, payload: data });

      return data.comments; //returning newest comments
    } catch (error) {
      console.log(error);
    }
  };
