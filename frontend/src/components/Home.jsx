import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Hero from './Hero'
import Footer from './shared/Footer'
import Category from './Category'
import useGetAllDuties from '@/hooks/useGetAllDuties'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Latest_Duties from './Latest_Duties'
import About from './About'

const Home = () => {
  useGetAllDuties()
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role === 'admin'){
      navigate('/admin/organizations');
    }
  },[])
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Category/>
        <Latest_Duties/>
        <About/>
        <Footer/>
    </div>
  )
}

export default Home