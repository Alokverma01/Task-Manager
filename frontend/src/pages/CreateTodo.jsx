import React, { useContext, useState } from 'react'
import Navbar from "../components/Navbar"
import axios from 'axios'
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify'

const CreateTodo = () => {

  const {backendUrl} = useContext(AppContent);
  const [todo, setTodo] = useState('')

  const submitHandler = async(e) => {
    e.preventDefault()
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + "/api/user/create-todo" , {title :  todo })
      setTodo("")
      if(data.success){
        toast.success("Todo Created !")
      } else {
        toast.error("Error while creating Todo")
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Navbar />
        <form className='w-full h-auto flex flex-col justify-center  gap-6 mt-40 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32' onSubmit={submitHandler}>

        <input
          className='border border-gray-300 rounded-lg py-4 px-4 text-sm sm:text-base focus:outline-none focus:ring focus:ring-purple-500'
          type="text"
          value={todo}
          required
          onChange={e => setTodo(e.target.value)}
          placeholder='A dream? A task? A vibe? Drop it here 🔮'
          />
        <div className='flex justify-center items-center'>
        <button type='submit' className='border hover:bg-gray-50/5 py-3 rounded-full hover:border-purple-800 cursor-pointer w-full mt-5 sm:w-1/2'>Add Todo</button>

        </div>
          </form>
      
    </>
  )
}

export default CreateTodo
