import { Button } from "@/components/ui/button";
import YourTodos from "./YourTodos";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";

const Home = () => {

  const {userData} = useContext(AppContent);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start justify-start px-4 sm:px-10 md:px-24 pt-6 w-full max-w-screen-xl mx-auto">
         <h1 className='mb-8 flex items-center gap-2 text-xl sm:text-3xl font-medium'>Hey {userData ? userData.name :  "Developer"} ! <span>🖐️</span></h1>
      <Button
        variant={"outline"}
        className="bg-background/80 backdrop-blur-md rounded-full w-full sm:w-48 py-[26px] sm:py-6 text-sm sm:text-base"
        onClick={() => navigate("/create-todo")}
      >
        New Todo ✨
      </Button>

      <div className="mt-2 w-full">
        <YourTodos />
      </div>
    </div>
  );
};

export default Home;
