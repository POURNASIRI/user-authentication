
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'


function ProtectedRoute() {


  const user = JSON.parse(localStorage.getItem('user'))
  return (
        <div>
            { user?._id ? <Outlet /> : <Navigate to={'/login'}/>}
        </div>
  )
}

export default ProtectedRoute








