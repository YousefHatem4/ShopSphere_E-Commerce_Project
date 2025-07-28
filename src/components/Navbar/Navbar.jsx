import React from 'react'
import style from './Navbar.module.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return <>
        <div className='bg-[#000000] py-3 text-center'>
            <p className='font-serif text-white'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <Link to={'products'} className='ms-2 underline'>ShopNow</Link></p>
        </div>


        <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 mt-18 md:mt-12 shadow-sm">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to={''} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-900 hover:text-[#DB4444] transition-colors duration-300">ShopSphere</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <i className="fa-regular fa-heart text-[#DB4444]"></i>

                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col md:gap-5 p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0">
                        <li>
                            <Link to={''} className="block py-2 px-3 text-gray-900 rounded md:p-0 hover:text-[#DB4444] relative group transition-colors duration-300">
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DB4444] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'products'} className="block py-2 px-3 text-gray-900 rounded md:p-0 hover:text-[#DB4444] relative group transition-colors duration-300">
                                Products
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DB4444] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'brands'} className="block py-2 px-3 text-gray-900 rounded md:p-0 hover:text-[#DB4444] relative group transition-colors duration-300">
                                Brands
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DB4444] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'category'} className="block py-2 px-3 text-gray-900 rounded md:p-0 hover:text-[#DB4444] relative group transition-colors duration-300">
                                Category
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DB4444] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'about'} className="block py-2 px-3 text-gray-900 rounded md:p-0 hover:text-[#DB4444] relative group transition-colors duration-300">
                                About
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DB4444] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'contact'} className="block py-2 px-3 text-gray-900 rounded md:p-0 hover:text-[#DB4444] relative group transition-colors duration-300">
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DB4444] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'login'} className="block py-2 px-3 text-gray-900 rounded md:p-0 hover:text-[#DB4444] relative group transition-colors duration-300">
                                Sign in
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DB4444] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    </>
}
