import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('token');
  const [newPost, setNewPost] = useState({
    image: null,
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPost((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleCreatePost = async () => {
    if (!userToken) {
      alert('Please log in or sign up to create a post');
      navigate('/signin');
      return;
    }

    if (!newPost.description || !newPost.image) {
      alert('Please provide both description and an image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('description', newPost.description);
      formData.append('image', newPost.image);

      const userResponse = await axios.get('http://localhost:3000/auth/current-user', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const username = userResponse.data.username;
      formData.append('username', username);

      await axios.post('http://localhost:3000/protected/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
      });
      
      alert('Post Created Successfully');

      setNewPost({
        image: null,
        description: '',
      });
      
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post.');
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Upload image url
        </label>
        <br />
        <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Enter the description
        </label>
        <textarea
          className="form-control"
          name="description"
          id="exampleFormControlTextarea1"
          rows="5"
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div>
        <button onClick={handleCreatePost}>Submit</button>
      </div>
    </div>
  );
};

export default CreatePost;
