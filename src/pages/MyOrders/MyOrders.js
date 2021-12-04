/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';


const MyOrders = () => {
    const { user } = useAuth();

    const [myOrders, setMyOrders] = useState([]);
    useEffect(() => {
        fetch('https://warm-peak-17617.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => setMyOrders(data))

    }, [])



    const handleDeleteOrder = id => {
        const proceed = window.confirm('Are you sure to cancel this Booking?');
        if (proceed) {
            const url = `https://warm-peak-17617.herokuapp.com/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        alert('Service Deleted successfully')
                        const remaining = myOrders.filter(order => order._id !== id);
                        setMyOrders(remaining);
                    }
                });
        }
    }

    const reserveImg = "https://i.ibb.co/0jz6gHX/avatar.png";

    return (
        <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className="bg-yellow-50">
            <h1 className="pt-10 pb-5 text-center text-3xl font-bold text-gray-700">Manage Your Orders</h1>
            <p className="text-gray-400 pt-2 pb-20">Logged in user can only see his/her orders here and can cancel it.</p>


            {
                myOrders.filter(mydata => mydata.useremail === user.email).length ? <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="hover">
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Product Info</th>
                                <th>Amount Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>


                        {
                            myOrders.filter(mydata => mydata.useremail === user.email).map(order => <tbody
                                key={order._id}
                            >
                                <tr className="hover">
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-12 h-12 mask mask-squircle">
                                                    <img src={order.userimg || reserveImg} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">
                                                    {order.fullname}
                                                </div>
                                                <div className="text-sm opacity-50">
                                                    {order.useremail}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{order.useraddress}</td>
                                    <td>{order.userphone}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <img className="h-16" src={order.ordered_product_img} alt=" Tailwind CSS Component" />
                                            </div>
                                            <div>
                                                {order.ordered_product}
                                                <br />
                                                <span className="badge badge-outline badge-sm"> {order.ordered_product_brand} </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$ {order.ordered_product_price}</td>
                                    <td>

                                        {
                                            order.status === "pending" ? <div className="badge badge-error"><i className="far fa-clock mr-2"></i>PENDING</div> : <div className="badge badge-success"><i className="fas fa-shipping-fast mr-2"></i> SHIPPED</div>
                                        }

                                    </td>
                                    <th>
                                        {
                                            order.payment ?
                                                <button className=" bg-green-600 transition duration-150 hover:bg-green-800 text-white px-4 py-2 mr-2 rounded-md"><i className="fas fa-money-check mr-2"></i> Paid</button> : <NavLink to={`/dashboard/pay/${order._id}`}><button className=" bg-green-600 transition duration-150 hover:bg-green-800 text-white px-4 py-2 mr-2 rounded-md"><i className="fas fa-money-check mr-2"></i> Pay</button></NavLink>
                                        }
                                        <button onClick={() => handleDeleteOrder(order._id)} className=" bg-red-600 transition duration-150 hover:bg-red-800 text-white px-4 py-2 rounded-md"><i className="fas fa-trash mr-2"></i> Delete</button>
                                    </th>
                                </tr>

                            </tbody>)
                        }





                    </table>
                </div> : <div>
                    <h2 className="py-10 bg-red-200 mx-auto text-xl ">No orders found for this user</h2>
                </div>
            }




        </motion.div>
    );

};

export default MyOrders;