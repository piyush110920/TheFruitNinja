import React, { useEffect, useState } from 'react';


import useAppContext from '../context/AppContext';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext() // ✅ invoke the context function

  const fetchMyOrders = async () => {
    try {
      const {data}= await axios.get(`/api/order/user?userId=${user._id}`)
    
      if(data.success){
        setMyOrders(data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if(user){
      fetchMyOrders();
    }
 
  }, [user]);

  return (
    <div className='mt-16 pb-16 px-4'>
      <div className='flex flex-col items-start w-max mb-8'>
        <p className='text-2xl font-medium uppercase'>My Orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      { Array.isArray(myOrders) && myOrders.map((order, i) => (
        <div
          key={order._id || i}
          className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'
        >
          <p className='flex justify-between flex-wrap md:items-center text-gray-400 md:font-medium mb-4'>
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: {currency}{order.amount}</span>
          </p>

          {order.items.map((item, j) => (
            <div key={j} className={`relative bg-white text-gray-500/70 ${order.items.length !== j+1 && "border-b"}
            border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>
            <div className='flex items-center mb-4 md:mb-0'>
              <div className='bg-primary/10 p-4 rounded-lg '>
                <img
                //  src={item.product.image[0] ||  '/placeholder.png'} alt='' className='w-16 h-16 object-cover'
                src={item.product?.image?.[0] || '/placeholder.png'}
                alt={item.product?.name || 'product image'}
                className='w-16 h-16 object-cover'
                 />
              </div>

              <div className='ml-4'>
                <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                <p className='text-gray-500'>Category: {item.product.category}</p>
              </div>
            </div>


            <div className='flex flex-col justify-center md:ml-14 mb-4 md:mb-0'>
            <p className='text-gray-500'>Quantity: {item.quantity || 1}</p>
                <p className='text-gray-500'>Status: {order.status}</p>
                <p className='text-gray-500'>
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
            </div> 


            <p className='text-primary text-lg font-medium'>
                  Amount: {currency}{' '}
                  {(item.product.offerPrice * (item.quantity || 1)).toFixed(2)}
                </p> 
            </div>  

          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
