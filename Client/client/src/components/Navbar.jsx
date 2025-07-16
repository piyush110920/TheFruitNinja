import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import useAppContext from '../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user,setUser, setshowUserLogin, navigate, axios,getCartItemsCount, setSearchQuery } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout');
      if (data.success) {
        toast.success(data.message);
         setUser(false)
        navigate('/')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="flex items-center justify-between flex-wrap px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/">
        <img className="h-11 w-45" src={assets.logo} alt="Logo" />
      </NavLink>

      {/* ✅ Search Bar (always visible, responsive) */}
      <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 py-1.5 rounded-full w-full max-w-[300px] mx-4 flex-1">
        <input onChange={(e)=>  setSearchQuery(e.target.value)}
          className="w-full bg-transparent outline-none placeholder-gray-500 text-sm"
          type="text"
          placeholder="Search products"
        />
        <img src={assets.search_icon} alt="search" className="w-4 h-4" />
      </div>

      {/* ✅ Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        {user && <NavLink to="/MyOrders" onClick={() => setOpen(false)}>My Orders</NavLink>}
        <NavLink to="/contact">Contact</NavLink>

        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <span className="absolute -top-2 -right-2 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getCartItemsCount()}
          </span>
        </div>

        {!user ? (
          <button
            onClick={() => setshowUserLogin(true)}
            className="px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-9 cursor-pointer" alt="profile" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-32 rounded-md text-sm z-40">
              <li onClick={() => navigate('/MyOrders')} className="px-4 py-2 hover:bg-primary/10 cursor-pointer">My Orders</li>
              <li onClick={logout} className="px-4 py-2 hover:bg-primary/10 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>

      {/* ✅ Cart Icon for small screens */}
      <div onClick={() => navigate('/cart')} className="relative sm:hidden cursor-pointer ml-3 mr-2">
        <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
        <span className="absolute -top-2 -right-2 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
         {getCartItemsCount()}
        </span>
      </div>

      {/* ✅ Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden cursor-pointer">
        <img src={assets.menu_icon} alt="menu" />
      </button>

      {/* ✅ Mobile Menu */}
      {open && (
        <div className="absolute top-[65px] right-3 w-[145px] bg-white shadow-md py-4 flex-col items-start gap-2 px-3 py-1 text-sm sm:hidden flex rounded-2xl z-50">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
          {user && <NavLink to="/MyOrders" onClick={() => setOpen(false)}>My Orders</NavLink>}
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setshowUserLogin(true);
              }}
              className="cursor-pointer px-4 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-4 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
