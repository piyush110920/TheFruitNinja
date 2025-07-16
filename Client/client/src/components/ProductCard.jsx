import React from 'react';
// import { useAppContext } from "../context/AppContext";
import { assets } from '../assets/assets';
import useAppContext from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { currency, addtocart, removeFromCart, cartItems,navigate } = useAppContext();

  return product && (
    <div  onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}}  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 max-w-xs flex flex-col h-full">
      {/* Product Image */}
      <div className="relative group h-48 overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        {/* Category & Name */}
        <div>
          <p className="text-sm text-gray-400">{product.category}</p>
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mt-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-4 h-4 mr-1"
              />
            ))}
            <span className="text-sm text-green-600 ml-1">(4.0)</span>
          </div>
        </div>

        {/* Price */}
        <p className="text-xl font-bold text-primary mt-3">
          {currency}{product.price}
        </p>

        {/* Cart Controls */}
        <div onClick={(e) => e.stopPropagation()} className="mt-4">
          {!cartItems[product._id] ? (
            <button
              onClick={() => addtocart(product._id)}
              className="w-full flex items-center justify-center gap-2 cursor-pointer bg-primary text-white hover:bg-primary-dull py-2 rounded-lg transition-transform duration-300 group-hover:scale-120"
            >
              <img src={assets.cart_icon} alt="cart" className="w-5 h-5 filter invert" />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg">
              <button
                onClick={() => removeFromCart(product._id)}
                className="text-xl font-bold cursor-pointer text-red-500 hover:scale-110"
              >
                –
              </button>
              <span className="text-lg font-medium text-gray-700">
                {cartItems[product._id]}
              </span>
              <button
                onClick={() => addtocart(product._id)}
                className="text-xl font-bold cursor-pointer text-green-600 hover:scale-110"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
