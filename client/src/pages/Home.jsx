
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'




export default function Home() {

    
    
   
        const user = JSON.parse(localStorage.getItem('user'))
        const navigate = useNavigate()
        const[loading,setLoading] = useState(false)
        
        const handleLogout = async ()=>{
            try {
                const res = await fetch('/api/user/signout', {
                    method: 'POST',
                })
                const data = await res.json()
                if(res.ok){
                    localStorage.removeItem('user')
                    toast.success(data.message,{autoClose:1000, position:"top-center"})
                    navigate('/login')
                }else{
                    toast.error(data.message,{autoClose:1000, position:"top-center"})
                }

            } catch (error) {
                console.log(error)
            }
        }

  return (
    <div className='flex items-center justify-center h-screen bg-slate-800' >
        <ul className="bg-green-700 w-[300px] h-[200px] py-10 text-center rounded-md shadow-sm gap-2 flex flex-col">
            <li className='text-xl font-bold text-white '>{user?.username}</li>
            <li className='text-xl font-bold text-white '>{user?.email}</li>
            <button onClick={handleLogout} className='p-2 rounded-md text-md text-white bg-red-800 font-bold w-[50%] mx-auto'>Logout</button>
        <Link onClick={()=>setLoading(true)} className='text-xl font-bold text-white' to={'/dashboard'}>
        Dashboard
        </Link>
        </ul>
    </div>
  )
}
