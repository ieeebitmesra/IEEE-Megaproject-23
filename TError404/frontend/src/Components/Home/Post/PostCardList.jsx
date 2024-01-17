import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link,Routes,Route,useNavigate} from "react-router-dom";
import PostPage from './PostPage';
import PostImage from './PostImage';

const PostCardList = () => {

  const [allPost,setAllPost]=useState([]);

  useEffect(()=>{
    const fetchPost=async()=>{
      try{
        const response=await axios.get('http://localhost:3000/protected/posts');
        console.log(response.data);
        setAllPost(response.data);

      }catch(err){
        console.error('error fetching all post',err)
      }
    };

    fetchPost();
  },[])

  

  return (
    
    <div>
       
       <div>
        <h2>Recent Posts</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {allPost.map((post) => (
            <div>
            <Link key={post._id} to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '300px' }}>
                <PostImage image={post.image} altText={`Post ${post._id}`} />
                <p>{post.description}</p>
              </div>
            </Link>
            </div>
            
          ))}
        </div>
      </div>

      <Routes>
        <Route path="/post/:postId" element={<PostPage />} />
      </Routes>
    </div>
  )
}

export default PostCardList