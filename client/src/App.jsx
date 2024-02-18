import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard'
import DashboardProtect from './components/DashboardProtect'

export default function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />}/>
        </Route>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
          <Route element={<DashboardProtect/>}>
             <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
      </Routes>
    </div>
  )
}
