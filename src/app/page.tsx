import React from 'react'
import "../../db"
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Scan from './components/Scan'
import Footer from './components/Footer'
import WhoWeAre from './components/WhoWeAre'
const page = () => {
  return (
    <div className='relative'>
      <Navbar/>
      <Hero/>
      <Scan/>
      <WhoWeAre/>
      <Footer/>
    </div>
  )
}

export default page
