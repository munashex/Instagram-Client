import Signup from "./Pages/Signup"  
import Login from './Pages/Login' 
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Navbar from "./Pages/Navbar"  
import UploadProlife from "./components/UploadProfile"
import Home from "./Pages/Home" 
import Profile from "./Pages/Profile" 
import CreatePost from "./Pages/CreatePost"
import VideoUpload  from "./components/VideoUpload" 
import ImageUpload from "./components/ImageUpload" 
import UserImages from "./Pages/UserImages"

const App = () => {

  return (
    <div className="w-screen">
    <BrowserRouter>  
    <Routes>  
    <Route path="/login" element={<Login/>}/> 
      <Route path="/signup" element={<Signup/>}/>   
      <Route path="uploadprofile" element={<UploadProlife/>}/>  

      <Route path="/" element={<Navbar/>}>  
      <Route index element={<Home/>}/>
      <Route path="profile"  element={<Profile/>}> 
      <Route  index element={<UserImages/>}/> 
      </Route>
      
      <Route path="create" element={<CreatePost/>}>
        <Route path="imageupload" element={<ImageUpload/>}/> 
        <Route path="videoupload" element={<VideoUpload/>}/>
      </Route>
      </Route>
    </Routes>
    </BrowserRouter> 
    </div>
  )
}
 

export default App

