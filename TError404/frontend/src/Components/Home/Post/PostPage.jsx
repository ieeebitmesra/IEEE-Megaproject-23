import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostImage from './PostImage';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const userToken = localStorage.getItem('token');
  const [currentUsername, setCurrentUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/protected/posts/${postId}`);
        const fetchedPost = response.data;
        setPost(fetchedPost);

        const userResponse = await axios.get('http://localhost:3000/auth/current-user', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setCurrentUsername(userResponse.data.username);
      } catch (error) {
        console.error('Error fetching post details:', error.message);
      }
    };

    fetchPostDetails();
  }, [postId, userToken]);

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
      alert('Not Authorized');
      navigate('*')
    }
  };

  const handleEditPost = () => {
    navigate(`/editpost/${postId}`);
  };

  return (
    <div>
      <h1>Post Details</h1>
      {post ? (
        <div>
          <PostImage image={post.image} altText={`Post ${post._id}`} />
          <p>{post.description}</p>
          {currentUsername === post.username && (
            <div>
            <button onClick={() => handleDeletePost(post._id)}>Delete Post</button>
            <button onClick={handleEditPost}>Edit Post</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostPage;
