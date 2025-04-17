import { Link, useNavigate } from "react-router-dom"
import { ModeToggle } from "./mode-toggle.js"
import { useContext } from "react";
import { AppContent } from '../context/AppContext.jsx';
import { toast } from "react-toastify";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate()
  const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContent);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')

    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <>
    <nav className="  sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border  flex justify-between px-20 items-center h-16 gap-10">
        <div className="text-xl font-semibold">
    <Link to='/'><span className='text-purple-600'>&lt;</span><span>Task</span><span className='text-purple-600'>Manager/&gt;</span></Link>

        </div>
        <div className="flex justify-center items-center gap-8">
            <Link className="hidden sm:block" to='/your-todos'>Your Todos</Link>
            <Link className="hidden sm:block" to='/about'>About</Link>

            {userData ? 
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-white/10 text-white relative group'>
          {userData.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block top-0 right-0 z-10  text-black rounded-xl pt-10'>
              <ul className='list-none m-0 p-2 bg-gray-100 rounded text-sm'>
               
                
                <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
              </ul>
          </div>
        </div> 
        :
        <button  onClick={() => navigate("/login")} className='flex items-center gap-2 hover:gap-3 hover:border-purple-800 border border-gray-500 rounded-full px-6 py-2  hover:bg-gray-100/5  transition-all cursor-pointer'>Login</button>
        }

        </div>
    </nav>
    </>
  )
}

export default Navbar