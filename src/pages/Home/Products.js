import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Product from './Product';
import './Products.css'

const Products = () => {


    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://warm-peak-17617.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))

    }, [])


    if (products.length === 0) {
        return (
            <div>
                <h2 className="text-xl my-7">Loading Products Please Wait...</h2>
                <div className="flex justify-center items-center">
                    <div
                        className="
            loader
            ease-linear
            rounded-full
            border-8 border-t-8 border-gray-200
            h-32
            w-32"
                    ></div>
                </div>
            </div>
        )
    }


    return (
        <div className="bg-red-50 text-white">
            <h1 className=" pt-10 text-center text-4xl font-bold text-gray-700">Available Drones</h1>
            <p className="text-gray-400 pt-5">A stunningly simple drone that makes taking aerial photos and videos effortless.</p>
            <div className="w-5/6 xl:px-36 2xl:px-48 py-5 lg:py-28 text-white grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto">
                {
                    products.slice(0, 6).map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
            <button
                className="px-8 py-3 mt-2 mb-10 bg-gray-700 rounded hover:bg-red-500 text-red-500 hover:text-white transition duration-300 "><NavLink to="/explore">EXPLORE ALL DRONES</NavLink></button>
        </div>
    );
};

export default Products;


