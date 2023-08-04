
import Login from './Login' 
import { HiOutlineUser} from 'react-icons/hi' 
import {LiaHomeSolid} from 'react-icons/lia'
import {FiSearch} from 'react-icons/fi'  
import { Link, Outlet} from 'react-router-dom' 
import {BsPlusSquare} from 'react-icons/bs'


let instagramImage = 'https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png' 

function Navbar() {  


  const currentUser = localStorage.getItem("token")
  
  return (
  <div>
    {currentUser ?  

    (
      // fixed sidebar
    <div>  

      <div className="hidden lg:flex"> 

        <div className="relative">  

        <div className="fixed top-0 bottom-0 left-0 w-[15%] border border-r-2">

         <div className="flex flex-col items-center"> 
         <img src={instagramImage} alt="instagram" className="w-[70%]"/> 

         <div className="space-y-7 mx-4 flex flex-col"> 
          <h1 className="inline-flex items-center text-lg gap-x-3"><LiaHomeSolid size={34}/> Home</h1>
          <h1 className="inline-flex items-center text-lg gap-x-3"><FiSearch size={34}/> Search</h1>  
          <Link to="/create" className="inline-flex items-center text-lg gap-x-3"><BsPlusSquare size={34}/> Create</Link>  
         </div> 

         <div className="fixed bottom-9 mx-4">
         <Link to="/profile" className="inline-flex items-center  text-lg gap-x-3"> 
         <HiOutlineUser  size={46} className="bg-gray-300 p-2 rounded-full"/>  
         Profile</Link>
         </div> 

         </div>

        </div>

        </div>

      </div>  
    
    {/* navbar on small screen and md screen */}
    <div className="flex lg:hidden">  

     <div className="relative"> 
      <div className="fixed bottom-0 right-0 left-0 border-t"> 
        <div className="flex flex-row items-center justify-evenly gap-x-9 p-3 bg-white"> 
        <span><LiaHomeSolid size={40}/></span> 
        <Link to="/create"><BsPlusSquare size={40}/></Link> 
        <Link to="/profile"><HiOutlineUser size={40}/></Link> 
        <span><FiSearch size={40} /></span>
        </div> 
      </div>
     </div> 
    </div> 
    <Outlet/>
    </div>
    )  
    :  
    <Login/>  

    }
  </div>
  )
}

export default Navbar