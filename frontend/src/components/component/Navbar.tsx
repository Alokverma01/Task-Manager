import { Link, useNavigate } from "react-router-dom"
import { ModeToggle } from "../mode-toggle"
import { Button } from "../ui/button"

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <>
    <nav className="  sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border  flex justify-between px-20 items-center h-16 gap-10">
        <div className="text-xl font-semibold">
    <Link to='/'><span className='text-purple-600'>&lt;</span><span>Task</span><span className='text-purple-600'>Manager/&gt;</span></Link>

        </div>
        <div className="flex justify-center items-center gap-8">
            <Link to='/your-todos'>Your Todos</Link>
            <Link to='/about'>About</Link>
            <div className="cursor-pointer">< ModeToggle /></div>
            <Button variant={"outline"} className="cursor-pointer" onClick={() => navigate("/login") }>SignUp</Button>

        </div>
    </nav>
    </>
  )
}

export default Navbar