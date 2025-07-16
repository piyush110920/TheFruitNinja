import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner=()=>{
    return (
        <div className='relative mt-5'>
            <img src={assets.bottom_banner_image} alt='banner' className='w-100% h-100 hidden md:block'/>
            <img src={assets.bottom_banner_image_sm} alt='banner' className='w-full md:hidden'/>
            <div className='absolute inset-0 flex flex-col items-center md:items-end
            md:justify-center pt-16 md:pt-0 px-6 md:px-24'>
                    <h1 className='text-2xl md:text-3xl font-semibold text-primary-dull mb-7'>Why We Are The Best?</h1>
                    <div  className="flex flex-col items-center gap-4 w-full max-w-screen-md md:items-end">
                    {features.map((feature,i)=>(
                        <div key={i} className='flex items-center gap-4 '>
                            <img src={feature.icon} alt={feature.title} className='md:w-11 w-11'/>
                            <div >
                            <h3 className='text-lg md:text-xl font-semibold'>{feature.title}</h3>
                            <p className='text-gray-500/70 text-xs md:text-sm'>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                
            </div>

        </div>
    )
}
export default BottomBanner