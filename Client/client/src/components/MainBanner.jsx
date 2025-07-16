import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="relative">
    <img
      src={assets.main_banner_bg}
      alt="banner"
      className="w-full p-8 hidden md:block"
    />
    <img
      src={assets.main_banner_bg_sm}
      alt="banner"
      className="w-full md:hidden"
    />
  </div>
  
  )
}

export default MainBanner