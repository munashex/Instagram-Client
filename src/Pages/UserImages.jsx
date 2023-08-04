import {useEffect} from 'react' 
import { useDispatch, useSelector } from 'react-redux'  
import { getImages } from '../features/fetchUserImages' 
import { useNavigate, Link } from 'react-router-dom' 
import {BsCamera} from 'react-icons/bs' 



function UserImages() { 

    const navigate = useNavigate()
    const token = localStorage.getItem("token") 
    if(!token) {
        navigate('/login')
        return
    }

    const {loading, error, images} = useSelector((state) => state.userImages)
     const dispatch = useDispatch() 

     useEffect(() =>{
       dispatch(getImages())
     }, [dispatch])
     
     

    return (
    
    <div className="">
        {loading ? null : (
            <div> 
                {images && images?.images?.length === 0 ? (
            <div className="flex flex-col  items-center gap-y-3  my-9 lg:my-20"> 
            <div>
            <BsCamera size={160} className="border p-2 rounded-md"/>
            </div> 
   
            <h1 className="text-3xl lg:text-4xl font-bold">Share Photo</h1> 
            <Link to="/create" className="text-xl text-blue-600 font-bold">Share you first photo</Link>
          </div>
           ): 
            (
        
            
           <div className="ml-0 lg:ml-[20%] lg:mr-12">
            <div className="grid gap-0.5 grid-cols-3 items-center">
               {images && images?.images?.map((image) => {
                return (
                    <div key={image._id}> 
                      <img src={image.image}/>
                    </div>
                )
               })} 
           </div>
           </div>
            ) }
            </div>
        
        )}
    </div>
  )
}

export default UserImages