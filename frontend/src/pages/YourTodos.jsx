import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { AppContent } from '../context/AppContext'
import axios from 'axios';

const YourTodos = () => {
  const {backendUrl} = useContext(AppContent);
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        axios.defaults.withCredentials = true
        const { data } = await axios.get(backendUrl + "/api/user/your-todos")

        if (data.success) {
          setTodos(data.todos)
        } else {
          toast.error(data.message || "Failed to fetch todos")
        }
      } catch (error) {
        toast.error("Error fetching todos: " + error.message)
      }
    }

    fetchTodos()
  }, [backendUrl])
  
  return (
    <>
    <div className='flex justify-center'>
    <div className='border bg-background/80 backdrop-blur-md mt-5 rounded-md p-5 h-auto w-4/5'>
      {
        todos.length > 0  ?  (
          todos.map((todo , index) => (
            <h1 key={index}>{todo.title}</h1>
          ))
        ) : (
          <p>No Todos to Display </p>
        )
      }
    </div>
    </div>
    </>
  )
}

export default YourTodos