import React, { useContext } from 'react';
import style from './Home.module.css';
import HomeCategory from '../HomeCategory/HomeCategory';
import HomeSlider from '../HomeSlider/HomeSlider';
import { Link } from 'react-router-dom';
import { productContext } from '../../Context/ProductsContext';
import Loading from '../Loading/Loading';

export default function Home() {

    let { products, loading } = useContext(productContext);

    return (
        <>
            <header className='flex flex-col lg:flex-row justify-center gap-6 lg:gap-0 px-5 lg:px-30 py-6 relative'>
                <div className='w-full text-center md:text-left lg:w-3/12 mb-2 lg:mb-0'>
                    <HomeCategory />
                </div>

                <div className='hidden lg:block bg-gray-300 h-85 w-0.5 me-15 absolute top-0 left-1/4'></div>

                <div className='w-full lg:w-9/12'>
                    <HomeSlider />
                </div>
            </header>
            {/* Products section */}
            <section className='my-10 px-4 sm:px-6 lg:px-30'>
                {/* title */}
                <div className='px-2 sm:px-0'>
                    <div className='flex items-center gap-5'>
                        <div className='bg-[#DB4444] w-[20px] h-[40px] rounded-sm'></div>
                        <h1 className='text-[#DB4444] font-bold text-sm sm:text-base'>Our Products</h1>
                    </div>
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold mt-5 sm:mt-7 mb-6 sm:mb-10'>Explore Our Products</h1>
                </div>

                {/* Products */}
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                            {products?.slice(0, 8).map((product) => (
                                <div key={product._id} className=''>
                                    {/* card */}
                                    <div className='cursor-pointer product bg-white p-3 sm:p-4 rounded-xl lg:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full border border-gray-100 hover:-translate-y-1'>
                                        {/* Product Image */}
                                        <Link to={`/productdetails/${product._id}`}>
                                            <div className="overflow-hidden rounded-lg lg:rounded-xl">
                                                <img
                                                    src={product.imageCover}
                                                    alt={product.title}
                                                    className="w-full h-40 sm:h-48 lg:h-52 object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="mt-3 sm:mt-4 space-y-1">
                                                <span className="inline-block text-xs font-medium text-gray-400 uppercase tracking-widest">
                                                    {product.category.name}
                                                </span>
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-800 leading-snug line-clamp-2">
                                                    {product.title.split(' ', 2).join(' ')}
                                                </h3>

                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-green-600 font-bold text-xs sm:text-sm">{product.price} EGP</span>
                                                    <div className="flex items-center text-yellow-500 text-xs sm:text-sm">
                                                        <i className="fas fa-star mr-1"></i>
                                                        {product.ratingsAverage}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Action Buttons */}
                                        <div className="mt-3 sm:mt-5 flex justify-between items-center gap-2 sm:gap-3">
                                            <button
                                                className="cursor-pointer flex-1 bg-[#DB4444] text-white py-1 sm:py-2 rounded-lg lg:rounded-xl hover:bg-[#B83636] transition-all duration-300 text-xs sm:text-sm font-medium"
                                            >
                                                Add to Cart
                                            </button>

                                            <button
                                                className="cursor-pointer p-1 sm:p-2 rounded-full border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-400 transition-colors duration-300"
                                            >
                                                <i className="fa-solid fa-heart text-sm sm:text-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='flex justify-center mt-8 lg:mt-10'>
                            <Link to={'/products'}
                                className="w-full sm:w-1/2 md:w-1/3 lg:w-[15%] py-2 px-4 text-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#DB4444] hover:bg-[#b53737] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB4444] transition-colors duration-300"
                            >
                                View All Products
                            </Link>
                        </div>
                    </>
                )}
            </section>
        </>
    );
}
