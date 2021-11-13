import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


const DashboardHome = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://warm-peak-17617.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))

    }, [])


    const [totalOrders, setTotalOrders] = useState([]);
    useEffect(() => {
        fetch('https://warm-peak-17617.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => setTotalOrders(data))

    }, [])

    const [totalUsers, setTotalUsers] = useState([]);
    useEffect(() => {
        fetch('https://warm-peak-17617.herokuapp.com/users')
            .then(res => res.json())
            .then(data => setTotalUsers(data))

    }, [])










    return (
        <div className="bg-yellow-50 px-5 xl:px-20 h-screen">
            <h2 className="pt-10 pb-10 text-center text-3xl font-bold text-gray-700">This is Dashboard Home</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="py-10 bg-green-500 rounded text-white mx-5 mb-5">
                    <h3 className="">Total Prodcts</h3>
                    <h2 className="text-2xl xl:text-5xl font-bold"> {products.length} </h2>
                </div>
                <div className=" py-10 bg-blue-500 rounded text-white mx-5 mb-5">
                    <h3 className="">Total Orders</h3>
                    <h2 className="text-2xl xl:text-5xl font-bold"> {totalOrders.length} </h2>
                </div>
                <div className=" py-10 bg-yellow-500 rounded text-white mx-5 mb-5">
                    <h3 className="">Total Users</h3>
                    <h2 className="text-2xl xl:text-5xl font-bold"> {totalUsers.length} </h2>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;