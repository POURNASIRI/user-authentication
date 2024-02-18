
import { Outlet, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom'


function DashboardProtect() {

 

const[userValid,setUserValid] = useState(false)
const navigate = useNavigate()

const user = JSON.parse(localStorage.getItem('user'))
const {_id,email} = user

  
  useEffect(() => {
      const validateUser = async ()=>{
          try {
            
               await fetch(`/api/user/single`,{
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({_id,email})
                })
                // await res.json();
                setUserValid(true)
             
                
                // console.log(res.status)
                
            } catch (error) {
                console.log(error)
                setUserValid(false)
                navigate('/login')
            }
        }
        validateUser()
    },[_id,email])

 

    return(
        <div>
            {
                userValid && <Outlet/>
            }
        </div>
    )
}

export default DashboardProtect