import React, { useEffect, useState } from 'react'

import { NavLink, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';
import useAppContext from '../context/AppContext';

const ProductDetails= () => {

  const {products,navigate,currency, addtocart}=useAppContext()
  const {id}=useParams()
  const [relatedProducts, setRelatedProducts] = useState([])
  const [thumbnail, setThumbnail] = useState();

  const product=products.find((item)=>item._id===id);

  useEffect(()=>{
    if(products.length >0){
      let productsCopy=products.slice();
      productsCopy=productsCopy.filter((item)=> product.category===item.category)
      setRelatedProducts(productsCopy.slice(0,5))
    }
  },[products])
  useEffect(()=>{
    if(product && product.image && product.image.length > 0){
    setThumbnail(product.image[0]? product.image[0] : "null")
    }
  },[product])

  return product && (
      <div className="mt-12">
          <p>
            
              <NavLink to={'/'}>Home</NavLink> /
              <NavLink to={'/products'}> Products</NavLink> /
              <NavLink to={`/products/${product.category.toLowerCase()}`}> {product.category}</NavLink> /
              <NavLink className="text-primary"> {product.name}</NavLink>
          </p>

          <div className="flex flex-col md:flex-row gap-16 mt-4">
              <div className="flex gap-3">
                  <div className="flex flex-col gap-3">
                      {product.image.map((image, index) => (
                          <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                              <img src={image} alt={`Thumbnail ${index + 1}`} />
                          </div>
                      ))}
                  </div>

                  <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                      <img src={thumbnail} alt="Selected product" />
                  </div>
              </div>

              <div className="text-sm w-full md:w-1/2">
                  <h1 className="text-3xl font-medium">{product.name}</h1>

                  <div className="flex items-center gap-0.5 mt-1">
                      {Array(5).fill('').map((_, i) => (
                          
                            <img src={i<4 ? assets.star_icon :assets.star_dull_icon} alt='start icon'
                            className='md:w-4 w-3.5'/> 
                      ))}
                      <p className="text-base ml-2">({4})</p>
                  </div>

                  <div className="mt-6">
                      <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                      <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                      <span className="text-gray-500/70">(inclusive of all taxes)</span>
                  </div>

                  <p className="text-base font-medium mt-6">About Product</p>
                  <div className="list-disc text-base text-gray-500/70">
                    
                      {product.description}
                  </div>

                  <div onClick={()=>{addtocart(product._id)}} className="flex items-center mt-10 gap-4 text-base">
                      <button className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                          Add to Cart
                      </button>
                      <button   onClick={()=>{addtocart(product._id); navigate('/cart')} }className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" >
                          Buy now
                      </button>
                  </div>
              </div>
          </div>
          {/* .............realted Products............  */}
          <div className='flex flex-col items-center mt-20'>
            <div className='flex flex-col items-center w-max'>
              <p className='text-3xl font-medium'>Related products</p>
              <div className='w-20 h-0.5 bg-primary rounded-full mt-2'></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6 w-full">
               {relatedProducts
              .filter((product) => product.inStock)
              .map((product) => (
               <ProductCard key={product._id} product={product} />
               ))}
         </div>
            <button onClick={()=>{navigate('/products'); scrollTo(0,0)}
          } className='mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition'>See More</button>
          </div>
      </div>
  );
};
export default ProductDetails