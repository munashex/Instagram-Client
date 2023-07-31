import Signup from "./Pages/Signup"  
import Login from './Pages/Login' 
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Home from "./Pages/Home"

const App = () => {

  return (
    <BrowserRouter>  
    <Routes>  
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/> 
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  )
}
 

export default App

