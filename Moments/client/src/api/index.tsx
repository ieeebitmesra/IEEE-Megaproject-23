//@ts-nocheck
import axios from "axios";

const API = axios.create({ baseURL: "https://moments-api.onrender.com" });

API.interceptors.request.use((req: any): any => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = (id: any) => API.get(`/posts/${id}`);

export const fetchPosts = (page: any): any => API.get(`/posts?page=${page}`); //error in the url
export const fetchPostsBySearch = (searchQuery: any): Promise<any> =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost: any): any => API.post("/posts", newPost);
export const updatePost = (id: string, updatePost: any) =>
  API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);
export const likePost = (id: string) => API.patch(`/posts/${id}/likePost`);
export const comment = (value: string, id: string) =>
  API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData: any) => API.post("/user/signin", formData);
export const signUp = (formData: any) => API.post("/user/signup", formData);

// import axios from "axios";

// const url = "http://localhost:5000/posts";

// export const fetchPosts = (): Promise<any> => axios.get(url);

// export const createPost = (newPost: any): Promise<any> =>
//   axios.post(url, newPost);

// export const updatePost = (id: string, updatePost: any) =>
//   axios.patch(`${url}/${id}`, updatePost);

// export const deletePost = (id: string) => axios.delete(`${url}/${id}`);

// export const likePost = (id: string) => axios.patch(`${url}/${id}/likePost`);
