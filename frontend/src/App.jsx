import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Organizations from './components/admin/Organizations'
import OrganizationCreate from './components/admin/OrganizationCreate'
import OrganizationSetup from './components/admin/OrganizationSetup'
import AdminDuties from './components/admin/AdminDuties'
import PostDuty from './components/admin/PostDuty'
import Applicants from './components/admin/Applicants'

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
        <Route path="/admin/organizations/create" element={<OrganizationCreate/>}/>
        <Route path="/admin/organizations/:id" element={<OrganizationSetup/>}/>
        <Route path="/admin/duties" element={<AdminDuties/>}/>
        <Route path="/admin/duties/create" element={<PostDuty/>}/>
        <Route path="/admin/duties/:id/applicants" element={<Applicants/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App