import {useState} from 'react'  
import {Link, useNavigate} from 'react-router-dom' 
import axios from 'axios'

let instagramImage = 'https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png'

const Login = () => { 
  const navigate = useNavigate()
   const [email, setEmail] = useState('') 
   const [password, setPassword] = useState('')  
   const [loading, setLoading] = useState(false)


   const onSubmit = async(e) => {
      e.preventDefault() 
      try{
         setLoading(true)
      const response = await axios.post('http://localhost:3001/api/user/login', {
       email, password
      }, {
         headers: {
            "Content-Type": "application/json"
         }
      })  
      const {token} = response.data 
      localStorage.setItem("token", token)  
      setLoading(false)   
      if(response.status === 200) {
         navigate('/uploadprofile')
      }
      }catch(err) {
         alert(err.response.data.message) 
         setLoading(false)
      }
   }

    return (
       <div>
         <div className="my-5 max-w-md border mx-auto">  

<div className="flex flex-col items-center">
<img src={instagramImage} alt="instagramLogo"  
 className='max-w-xs'
 /> 
</div>  

<form className="flex flex-col  w-[80%] mx-auto gap-y-3 mb-8" onSubmit={onSubmit}>
  <input
   className="border p-2 outline-none rounded-md" 
   placeholder="Email" 
   required 
   onChange={(e) => setEmail(e.target.value)} 
   type="email"
   />  

  
  <input placeholder="Password"
   className="border p-2 outline-none rounded-md"  
   required 
   onChange={(e) => setPassword(e.target.value)} 
   type="password"
   />  

   <button  
   type="submit"
   className="border p-2
    bg-blue-500 rounded-md text-white">
    {loading ? ' Loading...' : 'Log in'}
    </button> 

 </form> 
 
</div> 

<div className="my-5 max-w-md border mx-auto py-4"> 

<h1 className="text-center">Dont have an account?  
<Link to="/signup" className="text-[blue]"> Sign up</Link> 
</h1> 

</div>
       </div>
    )
} 

export default Login