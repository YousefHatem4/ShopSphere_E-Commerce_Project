import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'; // Make sure the path is correct

export default function HomeCategory() {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    async function getCategoryName() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            console.log(data.data);
            setCategory(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Stop loading in all cases
        }
    }

    useEffect(() => {
        getCategoryName();
    }, []);

    // Show loading spinner if still loading
    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <ul>
                {category?.map((categories, index) => (
                    <div key={index}>
                        <li className='my-2 text-[#000000]'>{categories.name}</li>
                    </div>
                ))}
            </ul>
        </div>
    );
}
