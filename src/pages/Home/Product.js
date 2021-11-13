import React from 'react';
import { NavLink } from 'react-router-dom';
import './Service.css'

const Product = (props) => {

    const { _id, product_name, product_imgURL, product_price, product_description, product_brand } = props.product

    return (
        <div className="transform hover:-translate-y-2 to-hover shadow-xl hover:shadow-2xl bg-gray-800 text-center secondary-bg transition duration-300 rounded-box w-full mx-auto">
            <img className="mx-auto w-full rounded-t service-img" src={product_imgURL} alt="" />
            <h1 className="px-5 pt-5 pb-4 text-2xl font-bold text-white pb"> {product_name} </h1>
            <div className="badge badge-primary badge-outline"> {product_brand} </div>
            <h1 className="px-5 pt-2 text-2xl text-white">$ {product_price} </h1>
            <h4 className="px-5 pt-5 w-5/6 mx-auto text-gray-400"> {product_description} </h4>



            <NavLink
                to={`/products/${_id}`}
            ><button className="px-5 py-2 mt-5 mb-8 custom-pink-lite rounded hover:bg-white hover:text-gray-800 text-white transition duration-300">VIEW DETAILS</button></NavLink>
        </div>
    );
};

export default Product;