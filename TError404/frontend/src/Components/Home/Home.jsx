import React,{useState,useEffect, useContext} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import CreatePost from './Post/CreatePost'
import "./Home.scss";
import MobNav from '../Mobile-Display/MobNav';
import { SiteContext } from '../../Context/siteContext';
import PostCardList from './Post/PostCardList';
import UserPost from './Post/UserPost';
// import RouterProvider,{createBrowserRouter} from "react-router-dom";

const Home = () => {

  const {Post,nav}=useContext(SiteContext);

  const [windowDimension,detectW]=useState({
    winWidth:window.innerWidth,
    winHeight:window.innerHeight
  })

  const detectSize=()=>{
    detectW({
      winWidth:window.innerWidth,
      winHeight:window.innerHeight
    })

    useEffect(()=>{
      window.addEventListener('resize',detectSize)

      return()=>{
        window.removeEventListener('resize',detectSize)
      }
    },[windowDimension])
  }
  const sideSelect=()=>{
    if(Post==="Post"){
      return <PostCardList/>
    }
    else if(Post==="PostCreate"){
      return <CreatePost/>
    }
    else if(Post==="UserPost"){
      return <UserPost/>
    }
  }
  if(windowDimension.winWidth>998){
  return (
    
    <div>
        <Navbar/>
        <div className='home'>
        <div className='sidebar'>
        <Sidebar/>
        </div>
        
        <div className='postCreator'>
        {sideSelect()}
        {/* <Routes>
          <Route path='/seePost' element={<PostCardList/>}/>
          <Route path='/createPost' element={<CreatePost/>}/>
          <Route path='/userpost' element={<UserPost/>}/>
        </Routes> */}
        
        </div>
        </div>
    </div>
    
    
  )
  }
  const setMobComp=()=>{
    if(nav==="Post"){
      return <PostCardList/>
    }
    else if(nav==="PostCreate"){
      return <CreatePost/>
    }
    else if(nav==="UserPost"){
      return <UserPost/>
    }

  }
  return (
    
    <div>
    <div>{setMobComp()}</div>
    <MobNav/>
    </div>
  )
  
  
}

export default Home;