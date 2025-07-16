// src/context/AppContext.jsx
import React, { createContext, useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;


// ✅ Create Context
const AppContext = createContext();

// ✅ Provider Component
export function AppContextProvider  ({ children })  {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [user, setUser] = useState(false);
  const [isSeller, setisSeller] = useState(false);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [products, setproducts] = useState([]);
  const [cartItems, setcartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

// fetch seller status
  const fetchSeller=async()=>{
    try {
      const {data}=await axios.post('/api/seller/isAuth');
      if(data.success){
        setisSeller(true)
      }else{
        setisSeller(false)
      }
    } catch (error) {
      setisSeller(false)
    }
  }

  //Fetch User Auth Status , user data and cart items
  const fetchUser= async ()=>{
    try {
      const {data}=await axios.get('/api/user/isAuth');
      if(data.success){
        setUser(data.user)
        setcartItems(data.user.cartItems)
      }
    } catch (error) {
      setUser(null)
    }
  }

  const fetchProduct = async () =>{
     try {
      const  {data}= await axios.get('/api/product/list')
      if(data.success){
        setproducts(data.product)
        
      }else{
        toast.error(data.message)
      }
     } catch (error) {
      toast.error(error.message)
     }
  }

  const addtocart = (itemId) => {
    const cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setcartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCardItems = (itemId, quantity) => {
    const cartData = { ...cartItems };
    cartData[itemId] = quantity;
    setcartItems(cartData);
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId) => {
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
      setcartItems(cartData);
      toast.success("Removed from cart");
    }
  };
  const getCartItemsCount=()=>{
      let totalCount=0;
      for(const item in cartItems){
        totalCount+=cartItems[item];
      }
      return totalCount;  
  }


  
   const getCartAmount=()=>{
     let totalAmount=0;
     for( let itemId in cartItems){
       let itemInfo=products.find((item)=>item._id===itemId)
       if( !itemInfo) continue;
        totalAmount+=itemInfo.offerPrice * cartItems[itemId]
     }
     return Math.floor(totalAmount*100)/100;
   }



  useEffect(() => {
    fetchUser()
    fetchSeller()
    fetchProduct();
  }, []);


  //Update databse cart items
 useEffect(()=>{
  const updateCart= async ()=>{
    try {
       const {data}= await axios.post('/api/cart/update', { userId: user._id, cartItems })
       
       if(!data.success){
        toast.error(data.message)
       }
    } catch (error) {
      toast.error(error.message)
    }
  }

  if(user){
    updateCart()
  }

 },[cartItems])



 const value={
    navigate,
    user,
    setUser,
    isSeller,
    setisSeller,
    showUserLogin,
    setshowUserLogin,
    currency,
    products,
    addtocart,
    updateCardItems,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartItemsCount,
    getCartAmount,
    axios,
    fetchProduct,
    setcartItems
  }
  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
}
export default function useAppContext(){
  return useContext(AppContext)
}

