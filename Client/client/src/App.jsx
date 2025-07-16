import React from 'react'

import { Routes,Route, useLocation } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Home from './pages/Home'
import Footer from './components/Footer'
import  useAppContext  from './context/AppContext'
import Login from './components/Login'
import AllProduct from './pages/AllProduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'

import AddAddress from './pages/AddAddresses'
import MyOrders from './pages/MyOrder'
import Sellerlogin from './components/Seller/Sellerlogin'
import Sellerlayout from './pages/seller/Sellerlayout'
import AddProduct from './pages/seller/AddProduct'
import Orders from './pages/seller/Orders'
import ProductList from './pages/seller/ProductList'
import Cart from './pages/Cart'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'




const App = () => {
  const isSellerPath=useLocation().pathname.includes("seller")
  const {showUserLogin,isSeller}=useAppContext()
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null: <Navbar/>}
      {showUserLogin? <Login/>: null}
      <Toaster/>
     <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 "}`}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        
        <Route path='/products' element={<AllProduct/>}/>
        <Route path='/products/:category' element={<ProductCategory/>}/>
        <Route path='/products/:category/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/add-address' element={<AddAddress/>}/>
        <Route path='/MyOrders' element={<MyOrders/>}/>
        <Route path='/loader' element={<Loading/>}/>
        <Route path='/seller' element={isSeller ? <Sellerlayout/>: <Sellerlogin/>}>
        <Route index element={isSeller ? <AddProduct/>: null}/>
        <Route path='product-list' element={<ProductList/>}/>
        <Route path='orders' element={<Orders/>}/>
        </Route>
      </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App