import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/WishListContext';


export default function ProductDetails() {
    let { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [mainImage, setMainImage] = useState('');
    const sliderRef = useRef(null);
    let { getProductToCart, cart } = useContext(cartContext);
    const navigate = useNavigate();
    const [addedItems, setAddedItems] = useState([]);
    let { getProductToWishList, WishProduct, deleteWishList } = useContext(WishContext);



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

    // Add this new function for wishlist authentication check
    const handleWishlistAction = (productId) => {
        let token = localStorage.getItem('userToken');

        if (!token) {
            toast.error("You must sign in first to add to wishlist");
            navigate("/login");
            return;
        }

        // If authenticated, proceed with wishlist action
        if (WishProduct.some(p => p._id === productId)) {
            deleteWishList(productId);
        } else {
            getProductToWishList(productId);
        }
    }


    async function getProductDetails(productId) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
            setProduct(data.data);
            setMainImage(data.data.imageCover);
            getRelatedProducts(data.data.category._id);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product details:", error);
            setLoading(false);
        }
    }


    async function getRelatedProducts(relatedProductId) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${relatedProductId}`);
            setRelatedProducts(data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setLoading(false);
        }
    }


    useEffect(() => {
        getProductDetails(id);
        window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 scroll to top on load
    }, [id]);



    useEffect(() => {
        document.title = 'Product Details';
    }, []);


    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        arrows: false
    };


    return <>
        {loading ? <Loading /> : <>
            <section className='py-5 md:py-20 px-4 sm:px-8 md:px-30 md:ms-10'>
                <div className='flex flex-col lg:flex-row gap-6 md:gap-10'>
                    {/* Thumbnail Images - Vertical on large screens, horizontal on small */}
                    <div className='flex flex-row justify-center lg:flex-col gap-2 md:gap-4 order-2 lg:order-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0'>
                        {product.images?.slice(0, 4).map((image, index) => (
                            <div
                                key={index}
                                onClick={() => sliderRef.current.slickGoTo(index)}
                                className='rounded-sm flex-shrink-0 flex items-center justify-center'
                            >
                                <img
                                    className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[170px] lg:h-[138px] object-cover cursor-pointer'
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                />
                            </div>
                        ))}
                    </div>


                    {/* Main Image Slider */}
                    <div className='w-full lg:w-[500px] h-auto lg:h-[600px] order-1 lg:order-2'>
                        <Slider {...sliderSettings} ref={sliderRef}>
                            {product.images?.map((image, index) => (
                                <div key={index} className='rounded-sm flex items-center justify-center'>
                                    <img
                                        className='object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px]'
                                        src={image}
                                        alt={`Slide ${index}`}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>


                    {/* Product Info */}
                    <div className='ms-0 lg:ms-7 order-3 w-full lg:w-auto'>
                        <h1 className='text-xl md:text-2xl text-[#000000] font-semibold'>{product.title}</h1>
                        <p className='text-[#363738]'>{product.category.name}</p>
                        <div className='flex items-center mt-3 md:mt-4'>
                            <i className="fa-solid fa-star text-[#FFAD33]"></i>
                            <p className='text-[#7D8184] text-sm ms-2'>({product.ratingsAverage})</p>
                            <span className='text-[#7D8184] text-sm ms-2'>|</span>
                            <span className='text-[#00FF66] text-sm ms-2'>In Stock</span>
                        </div>
                        <h1 className='text-[#000000] text-xl md:text-2xl mt-3 md:mt-4'>{product.price} EGP</h1>
                        <p className='text-sm text-[#000000] w-full lg:w-[373px] mt-3 md:mt-5'>{product.description}</p>
                        <div className='bg-[#000000] w-full lg:w-[400px] h-[1px] mt-3 md:mt-5'></div>


                        {/* Action Buttons */}
                        <div className='mt-6 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6'>
                            <button
                                onClick={() => handleAddToCart(product._id)}
                                disabled={addedItems.includes(product._id)} // disable if added
                                className={`cursor-pointer flex-1 py-1 sm:py-2 rounded-lg lg:rounded-xl transition-all duration-300 text-xs sm:text-sm font-medium 
                                                    ${addedItems.includes(product._id) ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#DB4444] text-white hover:bg-[#B83636]"}`}
                            >
                                {addedItems.includes(product._id) ? "Added" : "Add to Cart"}
                            </button>


                            {/* Updated wishlist button with authentication check - ONLY changed the onClick */}
                            <button
                                onClick={() => handleWishlistAction(product._id)}
                                className={`cursor-pointer p-1 sm:p-2 rounded-full border transition-colors duration-300 
             ${WishProduct.some(p => p._id === product._id)
                                        ? "bg-red-100 border-red-400 text-red-500"
                                        : "border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-400"
                                    }`}
                            >
                                <i className="fa-solid fa-heart text-sm sm:text-lg"></i>
                            </button>


                        </div>


                        {/* Delivery Info */}
                        <div className='mt-6 md:mt-10 border border-gray-400 rounded-md w-full lg:w-[400px]'>
                            <div className='flex items-center p-3 md:p-4 border-b border-gray-400'>
                                <i className="fa-solid fa-truck-fast text-lg md:text-xl text-gray-700 me-2 md:me-3"></i>
                                <div>
                                    <h2 className='text-sm font-semibold text-black'>Free Delivery</h2>
                                    <p className='text-xs text-gray-500 underline cursor-pointer'>
                                        Enter your postal code for Delivery Availability
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center p-3 md:p-4'>
                                <i className="fa-solid fa-rotate-left text-lg md:text-xl text-gray-700 me-2 md:me-3"></i>
                                <div>
                                    <h2 className='text-sm font-semibold text-black'>Return Delivery</h2>
                                    <p className='text-xs text-gray-500'>
                                        Free 30 Days Delivery Returns. <span className='underline cursor-pointer'>Details</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>}
    </>
}
