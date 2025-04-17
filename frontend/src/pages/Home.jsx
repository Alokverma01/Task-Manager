import { Button } from "@/components/ui/button"
import YourTodos from "./YourTodos"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-start flex-col px-24 pt-6">
      <Button variant={"outline"}  className="bg-background/80 backdrop-blur-md rounded-full px-6 py-5 cursor-pointer " onClick={() => navigate("/create-todo")}>New Todo  ✨</Button>
      <YourTodos />
    </div>
  )
}

export default Home