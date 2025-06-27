import React from 'react'
import Navbar from './shared/Navbar'
import Hero from './Hero'
import Footer from './shared/Footer'
import Category from './Category'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Category/>
        <Footer/>
    </div>
  )
}

export default Home