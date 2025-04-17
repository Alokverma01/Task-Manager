import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const navigate = useNavigate()

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)

  const [state, setState] = useState("Sign Up")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log(state)
  console.log(name)
  console.log(email)
  console.log(password)

  const onSubmitHandler = async (e) => {
    console.log("chal gya")
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          toast.success("Registered Successfully")
          navigate("/")
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post("http://localhost:3000/api/auth/login", {
          email,
          password
        }, {
          withCredentials: true
        });
        

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          toast.success("Login Successfully")
          navigate("/")

        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='z-50 bg-background/80 backdrop-blur-md border-2 w-[30vw] h-auto py-8 rounded-xl p-3'>
        <h2 className='text-2xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? 'Create Account📝' : 'Login🔐'}</h2>
        <p className='text-center text-sm mb-6'> {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}</p>
          
          <form onSubmit={onSubmitHandler}>
            {
              state === 'Sign Up' ? 
              <div className='px-3 flex flex-col gap-4'>
                <input onChange={e => setName(e.target.value)} value={name} className='w-full border px-3 rounded-full py-2' type="text" placeholder='Enter your full Name' required/>
                <input onChange={e => setEmail(e.target.value)} className='w-full border px-3 rounded-full py-2' value={email} type="email"  placeholder='Enter Email' required/>
                <input onChange={e => setPassword(e.target.value)} className='w-full border px-3 rounded-full py-2' type="password" value={password} placeholder='Enter Password' required minLength={6}/>
                <button type='submit' className='mb-2 backdrop-blur-md px-4 py-2 border rounded-full hover:bg-white/5 transition cursor-pointer'>{state}</button>
              </div>
              :
                <div className='px-3 flex flex-col gap-4 py-2'>
                  <input onChange={e => setEmail(e.target.value)} className='w-full border px-3 rounded-full py-2' value={email} type="email"  placeholder='Enter Email' required/>
                <input onChange={e => setPassword(e.target.value)} className='w-full border px-3 rounded-full py-2' type="password" value={password} placeholder='Enter Password' required minLength={6}/>
                <button type='submit'className='mb-2 backdrop-blur-md px-4 py-2 border rounded-full hover:bg-white/5 transition cursor-pointer'>{state}</button>
                
                </div>
                
            }
            
          </form>
          {state === 'Sign Up' ? ( <p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{' '} 
            <span onClick={() => setState('Login') } className='text-blue-400 cursor-pointer underline'>Login here</span>
          </p>) 
          : ( 
          <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{' '} 
            <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Sign Up</span>
          </p>)} 
      </div>
    </div>
  )
}

export default Login