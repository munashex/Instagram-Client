import Signup from "./Pages/Signup"  
import Login from './Pages/Login' 
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Navbar from "./Pages/Navbar"  
import UploadProlife from "./components/UploadProfile"
import Home from "./Pages/Home" 
import Profile from "./Pages/Profile" 
import CreatePost from "./Pages/CreatePost"
import ImageUpload from "./components/ImageUpload" 
import UserImages from "./Pages/UserImages"
import SingleImage from "./Pages/SingleImage" 
import EditProfile from "./Pages/EditProfile"
import CurrentUserFollowing from "./Pages/CurrentUserFollowing" 
import Comments from "./Pages/Comments"
import CurrentUserFollowers from "./Pages/CurrentUserFollowers"
import AllUserProfile from "./Pages/AllUserProfile"
import AllUserImage from "./Pages/AllUserImage"
import Followers from "./Pages/Followers" 
import Following from "./Pages/Following"
import Search from "./Pages/Search"
import SearchedUser from "./Pages/SearchedUser"
import {HelmetProvider} from 'react-helmet-async'

const App = () => {

  return (
    <div className="w-screen">
      <HelmetProvider>
    <BrowserRouter>  
    <Routes>  
    <Route path="/login" element={<Login/>}/> 
      <Route path="/signup" element={<Signup/>}/>   
      <Route path="uploadprofile" element={<UploadProlife/>}/>  
      

      <Route path="/" element={<Navbar/>}>  
      <Route index element={<Home/>}/>

      <Route path="search" element={<Search/>}>
        <Route path="user/:username" element={<SearchedUser/>}/>
      </Route>

      <Route path="profile"  element={<Profile/>}> 
      <Route  index element={<UserImages/>}/>  
      <Route path="editprofile" element={<EditProfile/>}/>
      <Route path="singleimage/:imageId" element={<SingleImage/>}/> 
      <Route path="userfollowing" element={<CurrentUserFollowing/>}/>
      <Route path="userfollowers" element={<CurrentUserFollowers/>}/> 
      </Route>
      <Route path="comments/:imageId" element={<Comments/>}/>

      <Route path="user/:id" element={<AllUserProfile/>}> 
      <Route index  element={<AllUserImage/>}/> 
      <Route path="following" element={<Following/>}/> 
      <Route path="followers" element={<Followers/>}/>
      </Route> 

      <Route path="create" element={<CreatePost/>}>
      <Route index element={<ImageUpload/>}/>  
      </Route>
      </Route>
    </Routes>
    </BrowserRouter> 
    </HelmetProvider>
    </div>
  )
}
 

export default App

