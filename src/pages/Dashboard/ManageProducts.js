/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ManageProducts = () => {


    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        fetch('https://warm-peak-17617.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setAllProducts(data))

    }, [])



    const handleDeleteProduct = id => {
        const proceed = window.confirm('Are you sure to delete this product?');
        if (proceed) {
            const url = `https://warm-peak-17617.herokuapp.com/product/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        alert('Service Deleted successfully')
                        const remaining = allProducts.filter(product => product._id !== id);
                        setAllProducts(remaining);
                    }
                });
        }
    }


    return (
        <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className="bg-yellow-50">
            <h1 className="pt-10 pb-5 text-center text-3xl font-bold text-gray-700">Manage All Products</h1>
            <p className="text-gray-400 pt-2 pb-20">Logged in user can only see his/her orders here and can cancel it.</p>


            {
                allProducts.length ? <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="hover">
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>


                        {
                            allProducts.map(product => <tbody
                                key={product._id}
                            >
                                <tr className="hover">
                                    <td>
                                        <div>
                                            <div>
                                                <img className="h-16 rounded-md" src={product.product_imgURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-bold">{product.product_name}</td>
                                    <td>{product.product_brand}</td>
                                    <td>{product.product_price}</td>

                                    <th>
                                        <button onClick={() => handleDeleteProduct(product._id)} className=" bg-red-600 transition duration-150 hover:bg-red-800 text-white px-4 py-2 rounded-md"><i className="fas fa-trash mr-2"></i> Delete</button>
                                    </th>
                                </tr>

                            </tbody>)
                        }





                    </table>
                </div> : <div>
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
            }




        </motion.div>
    );
};

export default ManageProducts;