import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { Bounce, ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import About from "./pages/About"
import CreateTodo from "./pages/CreateTodo"
import YourTodos from './pages/YourTodos';
import UpDateTodo from './pages/UpDateTodo';
import Login from './pages/Login';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="theme" enableSystem={false}>
        <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
          />

      <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/create-todo' element={<CreateTodo />} />
          <Route path='/your-todos' element={<YourTodos />} />
          <Route path='/update-todo' element={<UpDateTodo />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />

          
      </Routes>
          </div>
      </ThemeProvider>
    </>
  )
}

export default App
