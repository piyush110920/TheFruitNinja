import React from 'react'
import MainBanner from '../components/MainBanner'

import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import Categories from '../components/Categories'


const Home = () => {
  return (
    <div>
        <MainBanner/>
      <Categories/>
        <BestSeller/>
        <BottomBanner/>
        <NewsLetter/>
    </div>
  )
}

export default Home