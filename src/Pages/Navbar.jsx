
import Login from './Login' 
import { HiOutlineUser} from 'react-icons/hi' 
import {LiaHomeSolid} from 'react-icons/lia'
import {FiSearch} from 'react-icons/fi'  
import { Link, Outlet, useLocation} from 'react-router-dom' 
import {BsPlusSquare} from 'react-icons/bs'


let instagramImage = 'https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png' 

function Navbar() {  


  const currentUser = localStorage.getItem("token") 
  const location = useLocation()

  const Logout = () => {
     localStorage.clear() 
     window.location.reload()
  }
  
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

          <Link to="/" className="inline-flex items-center text-lg gap-x-3">
            <LiaHomeSolid size={34} className={`${location.pathname === '/' && `text-[blue]`}`}/>Home
          </Link>

          <Link to="/search" className="inline-flex items-center text-lg gap-x-3"> 
          <FiSearch size={34} className={`${location.pathname === '/search' && `text-[blue]`}`}/>
          Search
          </Link> 

          <Link to="/create" className="inline-flex items-center text-lg gap-x-3">
            <BsPlusSquare size={34} className={`${location.pathname === '/create' && `text-[blue]`}`}/>  
          Create</Link>  
          
          <Link to="/profile" className="inline-flex items-center  text-lg gap-x-3"> 
         <HiOutlineUser  size={37} className={`${location.pathname === '/profile' && `text-[blue]`}`}/>  
         Profile</Link>


          <button className="bg-blue-600 px-2 rounded-md text-white text-lg" onClick={Logout}>logout</button>
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
        <Link to="/" className={`${location.pathname === '/' && `text-blue-600`}`}><LiaHomeSolid size={40}/></Link> 
        <Link to="/create"><BsPlusSquare size={40} className={`${location.pathname === '/create' && `text-blue-600`}`}/></Link> 
        <Link to="/profile"><HiOutlineUser size={40} className={`${location.pathname === '/profile' && `text-blue-600`}`}/></Link> 
        <Link to="/search"><FiSearch size={40} className={`${location.pathname === '/search' && `text-blue-600`}`}/></Link>
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