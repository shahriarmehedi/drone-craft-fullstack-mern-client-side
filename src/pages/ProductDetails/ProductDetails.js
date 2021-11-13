/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../Header/Header";

const ProductDetails = () => {

    let { productId } = useParams();

    const [productDetails, setProductDetails] = useState({});

    const { _id, product_name, product_imgURL, product_price, product_details, product_brand } = productDetails;


    //  LOADING DATA
    useEffect(() => {
        fetch(`http://localhost:5000/products/${productId}`)
            .then(res => res.json())
            .then(data => setProductDetails(data))
    }, []);








    return (
        <><Header></Header>
            <motion.div
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }} className="bg-yellow-50 py-10 ">
                <div className="bg-gray-800 w-5/6 md:w-3/4 lg:w-3/5 rounded-box xl:w-1/2 py-10 mx-auto">
                    <h2 className=" py-10 text-center text-4xl font-bold text-gray-50"> {product_name} </h2>
                    <img className="mx-auto w-5/6 rounded-box" src={product_imgURL} alt="" />
                    <h2 className="text-gray-200 pt-10 w-5/6 lg:w-2/5 mx-auto pb-2">Brand: {product_brand} </h2>
                    <h2 className="text-gray-200 pt-10 w-5/6 text-2xl  mx-auto">Product Details: </h2>
                    <h2 className="text-gray-200 pt-10 w-5/6  mx-auto pb-2">{product_details} </h2>

                    <h2 className="text-white pt-5 w-5/6 lg:w-2/5 mx-auto pb-20 text-xl font-bold">Price: <span className="text-white mx-auto text-2xl font-bold">$ {product_price}</span> </h2>
                    <NavLink to={`/order/${_id}`} activeStyle={{ fontWeight: "bold", color: "#34D399" }}><button className="px-16 py-4 mb-10 custom-pink-dark rounded hover:bg-gray-800 text-white hover:text-white transition duration-300 ">Buy Now</button></NavLink>
                </div>
            </motion.div></>
    );
};

export default ProductDetails;


