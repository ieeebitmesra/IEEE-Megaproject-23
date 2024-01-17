import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostImage from './PostImage';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

const UserPost = () => {
  
  const [yourPosts, setYourPosts] = useState([]);
  const userToken = localStorage.getItem('token');

  const fetchYourPosts = async () => {
    try {
      const userResponse = await axios.get('http://localhost:3000/auth/current-user', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const username = userResponse.data.username;
  
      const response = await axios.get(`http://localhost:3000/protected/posts/user/${username}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      setYourPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  
  useEffect(() => {
    fetchYourPosts();
  }, []); 


  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/protected/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 204) {
        await fetchYourPosts();
      } else {
        console.error('Error deleting post. Unexpected response:', response);
        alert('An unexpected error occurred while deleting the post.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post.');
    }
  };


  return (
    <div>
      <h2>Your Posts</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {yourPosts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
            <Link key={post._id} to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <PostImage image={post.image} altText={`Post ${post._id}`} />
            <p>{post.description}</p>
            </Link>
            <button onClick={() => handleDeletePost(post._id)}>Delete Post</button>
          </div>
            ))}
      </div>
    </div>
  );
};

export default UserPost;
