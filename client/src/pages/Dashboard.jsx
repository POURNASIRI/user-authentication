import { Link } from "react-router-dom"




function Dashboard() {

  


  return (
    <div className="flex flex-col items-center justify-center h-screen
     bg-slate-200">
      <p className="text-3xl">Dashboard</p>
     <Link className="text-md font-bold mt-4" to={'/'}>
      Back to Home
     </Link>
     </div>
  )
}

export default Dashboard