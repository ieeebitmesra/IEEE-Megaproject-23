import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(null); 
  const userToken = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/protected/posts/${postId}`);
        const fetchedPost = response.data;
        setPost(fetchedPost);
        setNewDescription(fetchedPost.description);
      } catch (error) {
        console.error('Error fetching post details:', error.message);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleUpdatePost = async () => {
    try {
      const formData = new FormData();
      formData.append('description', newDescription);
      if (newImage) {
        formData.append('image', newImage);
      }

      const response = await axios.put(
        `http://localhost:3000/protected/posts/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data', 
          },
        }
      );

      if (response.status === 200) {
        navigate(`/post/${postId}`);
      } else {
        console.error('Error updating post. Unexpected response:', response);
        alert('An unexpected error occurred while updating the post.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Not Authorized');
      navigate('*')
    }
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  return (
    <div>
      <h1>Edit Post</h1>
      {post ? (
        <div>
             <p>
          <label htmlFor="newImage">New Image:</label>
          <input
            type="file"
            id="newImage"
            accept="image/*"
            onChange={handleImageChange}
          />
          </p>

          <p>Current Description: {post.description}</p>
          <label htmlFor="newDescription">New Description:</label>
          <textarea
            id="newDescription"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
         
          <button onClick={handleUpdatePost}>Update Post</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditPost;
