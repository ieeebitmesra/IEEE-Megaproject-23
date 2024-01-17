
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createPost = async (req, res) => {
  try {
    const { description } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const { image } = req.files;

    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const username = decodedToken.username; 

    const bufferData = Buffer.from(image.data);

    const post = new Post({
      description,
      image: {
        data: bufferData,
        contentType: image.mimetype,
      },
      username, 
    });

    const newPost = await post.save();

    res.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const username = req.params.username;
    const posts = await Post.find({ username });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts by user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUsername = decodedToken.username; 
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.username !== loggedInUsername) {
      return res.status(403).json({ error: 'You do not have permission to edit this post' });
    }

    post.description = req.body.description;
    if (req.files && req.files.image) {
      const newImage = req.files.image;
      post.image.data = Buffer.from(newImage.data);
      post.image.contentType = newImage.mimetype;
    }

    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUsername = decodedToken.username; 

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.username !== loggedInUsername) {
      return res.status(403).json({ error: 'You do not have permission to delete this post' });
    }

    await post.deleteOne();

    res.status(204).send(); 
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getPosts,
  createPost,
  getPostById,
  getPostsByUser,
  deletePost,
  editPost,
};
