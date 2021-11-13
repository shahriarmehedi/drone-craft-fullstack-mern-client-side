import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Header from '../Header/Header'



const Order = () => {

    const { user } = useAuth();
    let { orderId } = useParams();

    const [orderInfo, setOrderInfo] = useState({});

    const { _id, product_name, product_imgURL, product_price, product_brand } = orderInfo;

    //  LOADING DATA
    useEffect(() => {
        fetch(`http://localhost:5000/products/${orderId}`)
            .then(res => res.json())
            .then(data => setOrderInfo(data))
    });


    // SENDING NEW ORDER DATA TO SERVER
    const initialPlaceOrderInfo = { status: "pending", fullname: user?.displayName, userimg: user?.photoURL, useremail: user?.email, userphone: "", useraddress: "" };
    const [placeOrderInfo, setPlaceOrderInfo] = useState(initialPlaceOrderInfo);


    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...placeOrderInfo };
        newInfo[field] = value;
        setPlaceOrderInfo(newInfo);
        console.log(newInfo);
    }

    const handlePlaceOrderSubmit = e => {
        e.preventDefault();
        console.log('Place Order Button clicked');

        // COLLECT DATA
        const placeOrder = {
            ...placeOrderInfo,
            ordered_product: product_name,
            ordered_product_price: product_price,
            ordered_product_img: product_imgURL,
            ordered_product_brand: product_brand
        }


        // SEND TO SERVER
        console.log(placeOrder);

        axios.post('http://localhost:5000/orders', placeOrder)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Order Placed successfully');
                }
            })



    };


    return (
        <div>
            <Header></Header>
            <motion.div
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                className="bg-yellow-50 text-white pb-24">
                <h1 className="pt-10 pb-20 text-center text-3xl font-bold text-gray-700">Confirm Your Booking</h1>
                <div className="">
                    <div className="w-5/6 md:w-3/4 lg:w-3/5 rounded xl:w-1/2 py-10 bg-gray-800 mx-auto">
                        <h3 className="text-2xl font-bold">Selected Product : {product_name} </h3>
                        <h4> Product ID: {_id} </h4> <br />
                        <img className="mx-auto" src={product_imgURL} alt="" />
                        <h4 className="text-2xl"> Price: $ {product_price} </h4>
                        <h4 className="text-2xl"> Brand: {product_brand} </h4>
                    </div> <br />
                    <div className="w-5/6 md:w-3/4 lg:w-3/5 xl:w-1/2 mx-auto custom-pink-dark rounded">
                        <form className=" add-service-form w-5/6 mx-auto py-20 text-gray-800" onSubmit={handlePlaceOrderSubmit}>

                            <label className="label">
                                <span className="label-text text-white">Your Full Name:</span>
                            </label>
                            <input defaultValue={user?.displayName || ''} required name="fullname" onBlur={handleOnBlur} />



                            <label className="label">
                                <span className="label-text text-white">Email:</span>
                            </label>
                            <input required disabled type="email" name="email" defaultValue={user?.email || ''} onBlur={handleOnBlur} />



                            <label className="label">
                                <span className="label-text text-white">Phone Number:</span>
                            </label>
                            <input required type="tel" name="userphone" onBlur={handleOnBlur} />



                            <label className="label">
                                <span className="label-text text-white">Delivery Address:</span>
                            </label>
                            <textarea required type="textarea" name="useraddress" onBlur={handleOnBlur} />

                            <br />
                            <input className=" bg-gray-700 hover:bg-gray-800 transition duration-300 text-white mt-12 submit-btn" type="submit" defaultValue="CONFIRM BOOKING" />
                        </form>
                    </div>
                </div>
            </motion.div>
        </div >
    );
};

export default Order;