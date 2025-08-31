import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { cartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishListContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { motion } from "framer-motion";

export default function Wishlist() {
    let { getProductToCart, cart } = useContext(cartContext);
    let { getProductToWishList, WishProduct, deleteWishList, loading } = useContext(WishContext);
    const navigate = useNavigate();
    const [addedItems, setAddedItems] = useState([]);

    const handleAddToCart = (productId) => {
        let token = localStorage.getItem('userToken');

        if (!token) {
            toast.error("You must sign in first to add to cart");
            navigate("/login");
            return;
        }
        getProductToCart(productId);
        setAddedItems((prev) => [...prev, productId]); // mark as added
    }

    useEffect(() => {
        document.title = 'WishList';
        window.scrollTo(0, 0);
    }, []);

    return <>
        {/* Products section */}
        <section className='my-10 px-4 sm:px-6 lg:px-30'>
            {/* title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='px-2 mb-10 sm:px-0'
            >
                <div className='flex items-center gap-5'>
                    <div className='bg-[#DB4444] w-[20px] h-[40px] rounded-sm shadow-md'></div>
                    <h1 className='text-[#DB4444] font-extrabold text-lg sm:text-xl tracking-wide'>WishList</h1>
                </div>
            </motion.div>

            {/* Products */}
            {loading ? (
                <Loading />
            ) : (
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
                    }}
                    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
                >
                    {WishProduct?.map((product) => (
                        <motion.div
                            key={product._id}
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* card */}
                            <div className='cursor-pointer product bg-white p-3 sm:p-4 rounded-xl lg:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full border border-gray-100'>
                                {/* Product Image */}
                                <Link to={`/productdetails/${product._id}`}>
                                    <div className="overflow-hidden rounded-lg lg:rounded-xl relative">
                                        <img
                                            src={product.imageCover}
                                            alt={product.title}
                                            className="w-full h-40 sm:h-48 lg:h-52 object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                                        />
                                        {/* Subtle gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="mt-3 sm:mt-4 space-y-1">
                                        <span className="inline-block text-xs font-medium text-gray-400 uppercase tracking-widest">
                                            {product.category.name}
                                        </span>
                                        <h3 className="text-sm sm:text-base font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-[#DB4444] transition-colors duration-300">
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
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAddToCart(product._id)}
                                        disabled={addedItems.includes(product._id)} // disable if added
                                        className={`cursor-pointer flex-1 py-2 rounded-lg lg:rounded-xl transition-all duration-300 text-xs sm:text-sm font-semibold shadow 
                                            ${addedItems.includes(product._id)
                                                ? "bg-gray-400 text-white cursor-not-allowed shadow-none"
                                                : "bg-[#DB4444] text-white hover:bg-[#B83636] hover:shadow-md"}`}
                                    >
                                        {addedItems.includes(product._id) ? "Added" : "Add to Cart"}
                                    </motion.button>

                                    <motion.button
                                        whileTap={{ scale: 0.85 }}
                                        onClick={() =>
                                            WishProduct.some(p => p._id === product._id)
                                                ? deleteWishList(product._id)
                                                : getProductToWishList(product._id)
                                        }
                                        className={`cursor-pointer p-2 rounded-full border transition-colors duration-300 shadow-sm 
                                            ${WishProduct.some(p => p._id === product._id)
                                                ? "bg-red-100 border-red-400 text-red-500 hover:scale-110"
                                                : "border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-400 hover:scale-110"
                                            }`}
                                    >
                                        <i className="fa-solid fa-heart text-sm sm:text-lg"></i>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </section>
    </>
}
