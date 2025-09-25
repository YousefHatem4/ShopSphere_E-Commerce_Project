import React, { useEffect, useState } from 'react'
import style from './Category.module.css'
import Loading from '../Loading/Loading';
import axios from 'axios';

export default function Category() {
        const [category, setCategory] = useState([]);
        const [Looading, setLoading] = useState(true);

    async function getCategory() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            console.log(data.data);
            setCategory(data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

      useEffect(() => {
            document.title = 'Category';
            getCategory();
        }, []);
    return <>
        {/* category section */}
        {Looading ? <Loading /> : <>
            <section className='px-5 lg:px-30 py-16 bg-gradient-to-b from-gray-50 to-white'>
                {/* title */}
                <div className='px-2 sm:px-0 mb-12'>
                    <div className='flex items-center gap-5 mb-4'>
                        <div className='bg-[#DB4444] w-[20px] h-[40px] rounded-sm'></div>
                        <h1 className='text-[#DB4444] font-bold text-sm sm:text-base'>Our Categories</h1>
                    </div>
                
                </div>

                {/* main section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
                    {category?.map((categories) => (
                        <div
                            key={categories._id}
                            className='group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100'
                        >
                            {/* Background gradient overlay */}
                            <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#DB4444]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                            {/* Content container */}
                            <div className='relative p-6 lg:p-8 flex flex-col items-center text-center'>
                                {/* Image container with modern styling */}
                                <div className='relative mb-6 overflow-hidden rounded-xl bg-gray-50 p-4 group-hover:bg-white transition-colors duration-300'>
                                    <img
                                        src={categories.image}
                                        className='w-16 h-16 lg:w-20 lg:h-20 object-cover object-center mx-auto filter group-hover:brightness-110 transition-all duration-300'
                                        alt={categories.name}
                                    />
                                    {/* Decorative circle */}
                                    <div className='absolute -top-2 -right-2 w-8 h-8 bg-[#DB4444]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                </div>

                                {/* Category name */}
                                <h3 className='font-semibold text-lg lg:text-xl text-gray-800 group-hover:text-[#DB4444] transition-colors duration-300'>
                                    {categories.name}
                                </h3>

                                {/* Subtle description */}
                                <p className='text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                                    Explore collection
                                </p>
                            </div>

                            {/* Bottom border accent */}
                            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DB4444] to-[#FF6B6B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
                        </div>
                    ))}
                </div>


               
            </section>
        </>}
    </>
}
