import React, { useEffect, useState } from 'react';


const ManageAllOrders = () => {


    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(res => res.json())
            .then(data => setMyOrders(data))

    }, [])



    const handleDeleteOrder = id => {
        const proceed = window.confirm('Are you sure to delete this Booking?');
        if (proceed) {
            const url = `http://localhost:5000/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        alert('Order Deleted Successfully')
                        const remaining = myOrders.filter(order => order._id !== id);
                        setMyOrders(remaining);
                    }
                });
        }
    }




    const handleConfirmBookingShipped = id => {
        const confirmedShipped = { status: "shipped" };

        const url = `http://localhost:5000/orders/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(confirmedShipped)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Service Updated Successfully.')
                    window.location.reload();
                }
            })
    }


    const reserveImg = "https://i.ibb.co/0jz6gHX/avatar.png";

    return (
        <div className="bg-yellow-50">
            <h1 className="pt-20 pb-2 text-center text-3xl font-bold text-gray-700">Manage All Orders </h1>
            <p className="text-gray-400 pt-5 pb-20">Admin can see and manage everyones order here</p>

            {
                myOrders.length ? <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="hover">
                                <th className="px-3">Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Product Info</th>
                                <th>Amount Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>


                        {
                            myOrders.map(order => <tbody
                                key={order.useremail}
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
                                                <img className="h-16 rounded-md" src={order.ordered_product_img} alt=" Tailwind CSS Component" />
                                            </div>
                                            <div>
                                                {order.ordered_product}
                                                <br />
                                                <span className="badge badge-primary badge-sm"> {order.ordered_product_brand} </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$ {order.ordered_product_price}</td>
                                    <td>

                                        {
                                            order.status === "pending" ? <div className="badge badge-error"><i className="far fa-clock mr-2"></i>PENDING</div> : <div className="badge badge-success"><i className="fas fa-shipping-fast mr-2"></i> SHIPPED</div>
                                        }

                                    </td>
                                    <td>

                                        {
                                            order.status === "pending" ? <button onClick={() => handleConfirmBookingShipped(order._id)} className=" bg-purple-600 transition duration-150 mr-3 hover:bg-purple-800 text-white px-4 py-2 rounded-md"><i className="fas fa-shipping-fast mr-2"></i> Shipped</button> : <button className=" bg-green-500 transition duration-150 mr-3 text-white px-4 py-2 rounded-md"><i className="fas fa-check-circle mr-2"></i> Shipped</button>
                                        }


                                        <button onClick={() => handleDeleteOrder(order._id)} className=" bg-red-600 transition duration-150 hover:bg-red-800 text-white px-4 py-2 rounded-md"><i className="fas fa-trash mr-2"></i> Delete</button>
                                    </td>
                                </tr>

                            </tbody>)
                        }





                    </table>
                </div> : <div>
                    <h2 className="py-10 bg-red-200 mx-auto text-xl ">No orders found for this user</h2>
                </div>
            }




        </div>


    );
};

export default ManageAllOrders;



