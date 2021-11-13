import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Product from '../Home/Product';

const ServicesMenu = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
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
        <><Header></Header>
            <div className="bg-yellow-50 text-white">
                <h1 className=" pt-10 text-center text-4xl font-bold text-gray-700">Available Drones</h1>
                <p className="text-gray-400 pt-5">A stunningly simple drone that makes taking aerial photos and videos effortless.</p>
                <div className="w-5/6 xl:px-36 2xl:px-48 py-5 lg:py-28 text-white grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto">
                    {products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)}
                </div>
            </div></>
    );
};

export default ServicesMenu;