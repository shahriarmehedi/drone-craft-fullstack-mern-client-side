import { motion } from 'framer-motion';
import React from 'react';
import "./Addproduct.css"
import { useForm } from "react-hook-form";
import axios from 'axios';


const AddProduct = () => {

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        axios.post('http://localhost:5000/products', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Added successfully');
                    reset();
                }
            })

    };

    return (
        <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className="bg-yellow-50 text-white pb-24">
            <h1 className=" pb-20 pt-20 text-center text-3xl font-bold text-gray-700">ADD A NEW PRODUCT</h1>
            <div className="text-gray-800 pb-16 bg-gray-800 pt-10 rounded-box w-11/12 md:w-5/6 lg:w-2/5 mx-auto" >
                <form className=" add-service-form w-5/6 mx-auto " onSubmit={handleSubmit(onSubmit)}>
                    <label className="label">
                        <span className="label-text text-white">Name of the product:</span>
                    </label>
                    <input {...register("product_name", { required: true })} />



                    <label className="label">
                        <span className="label-text text-white">Image URL:</span>
                    </label>
                    <input type="url" required {...register("product_imgURL", { required: true })} />



                    <label className="label">
                        <span className="label-text text-white">Product Description:</span>
                    </label>
                    <input required  {...register("product_description")} />


                    <label className="label">
                        <span className="label-text text-white">Product Details:</span>
                    </label>
                    <textarea required  {...register("product_details", { required: true })} />



                    <label className="label">
                        <span className="label-text text-white">Product Price:</span>
                    </label>
                    <input type="number" {...register("product_price")} />



                    <label className="label">
                        <span className="label-text text-white">Product Brand:</span>
                    </label>
                    <input required {...register("product_brand", { required: true })} />


                    <br />
                    <input className=" custom-pink-lite hover:bg-gray-500 transition duration-300 text-white mt-12 submit-btn" type="submit" value="ADD THIS PRODUCT" />
                </form>
            </div>

        </motion.div>
    );
};

export default AddProduct;

