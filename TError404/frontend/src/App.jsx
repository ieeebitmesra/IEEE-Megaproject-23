import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import Signup from './Components/Signup/Signup.jsx';
import Signin from './Components/Signin/Signin.jsx';
import Home from './Components/Home/Home.jsx';
import Introduction from './Components/Introduction/Introduction.jsx';
import SideContextProvider from './Context/siteContext.jsx';
import PostPage from './Components/Home/Post/PostPage.jsx';
import EditPostPage from './Components/Home/Post/EditPost';

function App() {
  

  return (
    <SideContextProvider>
    <Routes>
      <Route path='/' element={<Introduction/>}/>
      <Route path='/Home/*' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      {/* <Route path='/userposts' element={<UserPostPage/>}/> */}
      <Route path='/post/:postId' element={<PostPage/>}/> 
      <Route path="/editpost/:postId" element={<EditPostPage />} />

    </Routes>
    </SideContextProvider>
  )
}

export default App
