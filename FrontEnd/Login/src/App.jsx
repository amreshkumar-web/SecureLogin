import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import api, { setNavigate }  from './utils/ApiHandel.js';
import { useNavigate } from "react-router-dom";
import Login from './components/Login.jsx';
import Loading from './components/Loading.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from './components/DashBoard.jsx';
import './App.css'





function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  setNavigate(navigate);  

  return (
    <>
        <ToastContainer  style={{ fontSize: "1.6rem", width: "300px" ,zIndex: 999999}} position="bottom-left"
  autoClose={3000}
  closeOnClick
  pauseOnHover
  draggable
  theme="dark" />

 <Routes>

   <Route path='/' element={<Login/>} />
   <Route path='/Loading' element={<Loading/>} />
   <Route path='/DashBoard' element={<DashBoard />} />

  </Routes>
    </>
  )
}

export default App
