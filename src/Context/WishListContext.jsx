import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export let WishContext = createContext();

export default function WishListContextProvider({ children }) {

    const [WishProduct, setWishProduct] = useState([]);
        const [loading, setLoading] = useState(true);
    

    const headers = {
        token: localStorage.getItem('userToken')
    }

    async function getProductToWishList(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                productId
            },
                {
                    headers
                })
            getWishListProducts();
            toast.success(data.message, {
                duration: 1000
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    async function getWishListProducts() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    headers
                })
            setWishProduct(data.data); 

            console.log(data.data);
            
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function deleteWishList(productId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            getWishListProducts();
            toast.success(data.message, {
                duration: 1000
            })

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getWishListProducts();
    }, [])


    return <>
        <WishContext.Provider value={{ getProductToWishList, WishProduct, deleteWishList, loading }}>
            {children}
        </WishContext.Provider>
    </>
}
