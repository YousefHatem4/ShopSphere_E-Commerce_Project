import React from 'react'
import style from './Home.module.css'
import HomeCategory from '../HomeCategory/HomeCategory'
import HomeSlider from '../HomeSlider/HomeSlider'

export default function Home() {
    return <>
        <header className='flex  justify-center gap-0 px-30 py-6 relative' >
            <div className='w-3/12 ms-10'><HomeCategory /></div>
            <div className='bg-gray-300 h-85 w-0.5 me-15 absolute top-0 left-100'></div>
            <div className='w-9/12'><HomeSlider/></div>
        </header>
    </>
}
