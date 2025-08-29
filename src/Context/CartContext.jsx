import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


export let cartContext = createContext();

export default function CartContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(null);

    const headers = {
        token: localStorage.getItem('userToken')
    }

    async function getProductToCart(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
                productId
            },
                {
                    headers
                })
            getProductCart();
            toast.success(data.message, {
                duration: 1000
            })

        } catch (error) {
            console.log(error)
        }
    }



    async function getProductCart() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers
                })
            setCart(data);

        } catch (err) {
            console.log(err);
        }
    }

    async function updateProductCount(productId, count) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                count
            },
                {
                    headers

                })
            setCart(data);
            toast.success(data.status, {
                duration: 1000
            })
        } catch (error) {
            console.log(error);

        }
    }

    async function deleteProductCount(productId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers
                })
            setCart(data);
            toast.success(data.status, {
                duration: 1000
            })
        } catch (err) {
            console.log(err);
        }
    }

    async function clearCart() {
        try {
            let { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { headers }
            );
            setCart(null); // Empty cart in state
            toast.success("Cart cleared successfully", { duration: 1000 });
        } catch (e) {
            console.log(e);
            toast.error("Failed to clear cart");
        }
    }


    useEffect(() => {
        getProductCart();
    }, [])

    return <cartContext.Provider value={{ getProductToCart, cart, updateProductCount, deleteProductCount, clearCart }}>
        {children}
    </cartContext.Provider>
}
