import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Organizations from './components/admin/Organizations'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login'element={<Login/>}/>
        <Route path='/signup'element={<Signup/>}/>
        //admin routes
        <Route path='/admin/organizations' element={<Organizations/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App