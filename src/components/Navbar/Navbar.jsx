import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/userContext';
import { cartContext } from '../../Context/CartContext';

export default function Navbar() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [menuOpen, setMenuOpen] = useState(false);
    let { cart } = useContext(cartContext);
    let { userToken, setUserToken } = useContext(userContext);
    let navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('userToken');
        setUserToken(null);
        navigate('/');
    }

    return <>
        <div className='bg-[#000000] py-3 text-center'>
            <p className='font-serif text-white'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <Link to={'products'} className='ms-2 underline'>ShopNow</Link></p>
        </div>


        <nav className="bg-white sticky w-full z-30 top-0 start-0 border-b border-gray-200  shadow-sm">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to={''} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-900 hover:text-[#DB4444] transition-colors duration-300">ShopSphere</span>
                </Link>


                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {userToken && <>
                        <Link to={'wishlist'}><i className={`${currentPath === '/wishlist' ? 'fa-solid fa-heart text-[#DB4444]' : 'fa-regular fa-heart'} text-[#000000] text-2xl hover:text-[#DB4444] cursor-pointer transition-colors duration-300`}></i></Link>
                        <Link to={'cart'}><i className={`${currentPath === '/cart' ? 'fa-solid fa-cart-shopping text-[#DB4444]' : 'fa-solid fa-cart-shopping'} relative md:ms-2 text-[#000000] text-2xl hover:text-[#DB4444] cursor-pointer transition-colors duration-300`}></i>
                            {cart?.numOfCartItems > 0 && <>
                                <span className='absolute right-15  top-3 md:top-2 md:right-32 bg-[#DB4444] text-white font-medium text-sm px-1.5 rounded-full'>
                                    {cart.numOfCartItems}
                                </span>
                            </>}
                        </Link>
                    </>}

                    <button onClick={() => setMenuOpen(!menuOpen)} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200">
                        <span className="sr-only">Open main menu</span>
                        {menuOpen ? <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg></> : <> <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg></>}
                    </button>
                </div>


                <div className={`items-center ${menuOpen ? 'block' : 'hidden'} justify-between  w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col md:gap-5 p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 text-center md:text-left">
                        <li>
                            <Link to={''} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/' ? 'text-[#DB4444]' : 'hover:text-[#DB4444] text-gray-900'}  rounded md:p-0   relative group transition-colors duration-300`}>
                                Home
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2  w-0 h-0.5 bg-[#DB4444] transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'products'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/products' ? 'text-[#DB4444]' : 'hover:text-[#DB4444] text-gray-900'}  rounded md:p-0   relative group transition-colors duration-300`}>
                                Products
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2  w-0 h-0.5 bg-[#DB4444] transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'brands'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/brands' ? 'text-[#DB4444]' : 'hover:text-[#DB4444] text-gray-900'}  rounded md:p-0   relative group transition-colors duration-300`}>
                                Brands
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2  w-0 h-0.5 bg-[#DB4444] transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'category'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/category' ? 'text-[#DB4444]' : 'hover:text-[#DB4444] text-gray-900'}  rounded md:p-0   relative group transition-colors duration-300`}>
                                Category
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2  w-0 h-0.5 bg-[#DB4444] transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'about'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/about' ? 'text-[#DB4444]' : 'hover:text-[#DB4444] text-gray-900'}  rounded md:p-0   relative group transition-colors duration-300`}>
                                About
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2  w-0 h-0.5 bg-[#DB4444] transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'contact'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/contact' ? 'text-[#DB4444]' : 'hover:text-[#DB4444] text-gray-900'}  rounded md:p-0   relative group transition-colors duration-300`}>
                                Contact
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2  w-0 h-0.5 bg-[#DB4444] transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            {!userToken && <><Link to={'login'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/login' ? 'text-[#DB4444]' : 'hover:text-[#DB4444] text-gray-900'}  rounded md:p-0   relative group transition-colors duration-300`}>
                                Sign in
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2  w-0 h-0.5 bg-[#DB4444] transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link></>}
                            {userToken && <> <span onClick={logOut} className="cursor-pointer  font-bold text-gray-900 hover:text-[#DB4444] text-sm">
                                Logout
                            </span></>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    </>
}
