import React from 'react';
import { categories } from '../assets/assets';
import useAppContext from '../context/AppContext';



const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className='mt-16'>
      <p className='mx-8 text-2xl md:text-3xl font-medium'>Categories</p>
      <div className='mx-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mt-6 gap-6'>
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center'
              style={{ backgroundColor: category.bgColor }}
              onClick={() => {
                navigate(`/products/${category.path.toLowerCase()}`);
                scrollTo(0, 0);
              }}
            >
              <img
                src={category.image}
                alt={category.text}
                className='group-hover:scale-105 transition-transform duration-300 max-w-28'
              />
              <p className='text-sm font-medium mt-2 text-center'>{category.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories ;
