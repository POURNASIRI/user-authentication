import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import secureLocalStorage from 'react-secure-storage';
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";


export default function Login() {

        const[loading,setLoading] = useState(false)
        const[formData,setFormData] = useState({
            email:"",
            password:""
        })
        const navigate = useNavigate()
        const {setUserData} = useUser()

        const handleChage = (e)=>{
            setFormData({
                ...formData,[e.target.id]:e.target.value
            })
        }

        

        const handleSubmit = async (e) => {
            e.preventDefault()
            if(!formData.email || !formData.password){
              toast.error("Please enter all fields",{autoClose:1000, position:"top-center"});
            }else{
              // send data
              try {
                setLoading(true)
                const res = await fetch('/api/auth/signin', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData),
                });
                const data = await res.json();
                if(!res.ok){
                  toast.error(data.message,{autoClose:1000, position:"top-center"});
                }else{
                  setLoading(false)
                  toast.success(data.message,{autoClose:1000, position:"top-center"});
                  localStorage.setItem('user',JSON.stringify(data.user))
                  navigate('/')
                }
            
              } catch (error) {
                console.log(error);
              }
            }
          }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800 ">
        <form onSubmit={handleSubmit} className="bg-green-700 w-[300px] h-[400px] p-10 rounded-md shadow-sm gap-2 flex flex-col">
            <h1 className="text-3xl font-bold text-white mb-4">Login</h1>
            <div className="flex flex-col">
                <label className="text-md font-semibold text-white" htmlFor="email">Email</label>
                <input value={formData.email} onChange={handleChage} className="outline-none p-3 rounded-md text-xs" type="email" id="email" placeholder="example@ex.com" />
            </div>
            <div className="flex flex-col">
                <label className="text-md font-semibold text-white" htmlFor="password">Password</label>
                <input value={formData.password} onChange={handleChage} className="outline-none p-3 rounded-md text-xs" type="password" id="password" 
                 />
            </div>
            <button className="bg-white 
            hover:bg-slate-300
            mt-4
            rounded-md text-md text-black p-1 
            font-semibold">
                {loading ? "Loading..." : "Login"}
            </button>
            <div>
                <p className="text-sm text-white">Don't have an account? <Link className="text-blue-800 font-bold" 
                to="/register">Register</Link></p>
            </div>
        </form>
    </div>
  )
}
