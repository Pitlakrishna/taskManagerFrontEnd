import React from 'react'
import { Routes, Route } from "react-router-dom"
import SignUp from './Auth/Sign_Up/Sign_Up'
import SignIn from './Auth/Sign_In/Sign_In'
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  )
}
export default App