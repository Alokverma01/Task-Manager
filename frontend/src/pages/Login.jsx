import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          toast.success("Registered Successfully");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', {
          email,
          password
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          toast.success("Login Successfully");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4 sm:px-8">
      <div className="bg-background/80 backdrop-blur-md border-2 w-full max-w-sm sm:max-w-md lg:max-w-lg py-8 px-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-white text-center mb-3">
          {state === 'Sign Up' ? 'Create Account 📝' : 'Login 🔐'}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
        </p>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          {state === 'Sign Up' && (
            <input
              onChange={e => setName(e.target.value)}
              value={name}
              className="w-full border px-3 rounded-full py-2"
              type="text"
              placeholder="Enter your full name"
              required
            />
          )}

          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            className="w-full border px-3 rounded-full py-2"
            type="email"
            placeholder="Enter email"
            required
          />
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            className="w-full border px-3 rounded-full py-2"
            type="password"
            placeholder="Enter password"
            required
            minLength={6}
          />

          <button
            type="submit"
            className="mt-2 backdrop-blur-md px-4 py-2 border rounded-full hover:bg-white/5 transition cursor-pointer"
          >
            {state}
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs mt-4">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-blue-400 cursor-pointer underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-blue-400 cursor-pointer underline"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
