import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading/Loading';

export let productContext = createContext();

export default function ProductsContextProvider({ children }) {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getAllProducts() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
            console.log(data.data);
            setProducts(data.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

   

    return (
        <productContext.Provider value={{ products ,loading }}>
            {children}
        </productContext.Provider>
    );
}
