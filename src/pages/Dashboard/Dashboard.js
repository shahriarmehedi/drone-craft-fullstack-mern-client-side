/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    NavLink
} from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import AddProduct from '../AddProduct/AddProduct';
import ManageAllOrders from '../ManageAllOrders/ManageAllOrders';
import MyOrders from '../MyOrders/MyOrders';
import DashboardHome from './DashboardHome';
import MakeAdmin from './MakeAdmin';
import ManageProducts from './ManageProducts';
import Pay from './Pay';
import UserReview from './UserReview';
import AdminRoute from '../PrivateRoute/AdminRoute'

const Dashboard = () => {

    const reserveImg = "https://i.ibb.co/0jz6gHX/avatar.png";

    let { path, url } = useRouteMatch();
    const { admin, user, logOut } = useAuth();


    return (
        <div className=" shadow bg-base-200 drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer-2" className="mb-10 text-4xl cursor-pointer drawer-button lg:hidden absolute top-5 left-5 text-gray-800"><i className="fas fa-bars"></i></label>

                <div>
                    <Switch>
                        <Route exact path={path}>
                            <DashboardHome></DashboardHome>
                        </Route>
                        <AdminRoute path={`${path}/manageAllOrders`}>
                            <ManageAllOrders></ManageAllOrders>
                        </AdminRoute>
                        <AdminRoute path={`${path}/addProduct`}>
                            <AddProduct></AddProduct>
                        </AdminRoute>
                        <AdminRoute path={`${path}/makeAdmin`}>
                            <MakeAdmin></MakeAdmin>
                        </AdminRoute>
                        <AdminRoute path={`${path}/manageProducts`}>
                            <ManageProducts></ManageProducts>
                        </AdminRoute>


                        <Route path={`${path}/myOrders`}>
                            <MyOrders></MyOrders>
                        </Route>
                        <Route path={`${path}/pay`}>
                            <Pay></Pay>
                        </Route>
                        <Route path={`${path}/userReview`}>
                            <UserReview></UserReview>
                        </Route>
                    </Switch>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-gray-800 text-white">

                    <NavLink to="/"><button className="mt-2 py-3 px-7 mb-10 hover:bg-gray-50 hover:text-gray-800 rounded text-white bg-gray-700 transition duration-300"><i className="fas fa-arrow-circle-left mr-2"></i> HOME</button></NavLink>


                    <div className="mx-auto mb-10">{user?.email && <div className="avatar online">
                        <div className="rounded-full w-24 h-24">
                            <img className="rounded-full" src={user?.photoURL || reserveImg} alt="" />
                        </div>

                    </div>}
                        <h2 className=" pt-3 pb-2 font-semibold text-xl"> {user.displayName} </h2>
                        {
                            admin ? <div className="badge badge-info">ADMIN</div> : <div className="badge badge-info">CUSTOMER</div>
                        }
                    </div>



                    <li className="bg-gray-700 rounded-box hover:bg-gray-50 hover:text-gray-800 transition duration-150 mb-5">
                        <NavLink to={`${url}`} ><button><i className="fas fa-tachometer-alt mr-2"></i> Dashboard</button></NavLink>
                    </li>


                    {
                        admin && <div>
                            <li className="bg-gray-700 rounded-box hover:bg-gray-50 hover:text-gray-800 transition duration-150 mb-1">
                                <NavLink to={`${url}/manageAllOrders`}><button><i className="fas fa-tasks mr-2"></i> Manage All Orders</button></NavLink>
                            </li>


                            <li className="bg-gray-700 rounded-box hover:bg-gray-50 hover:text-gray-800 transition duration-150 mb-1">
                                <NavLink to={`${url}/addProduct`}><button><i className="fas fa-plus-circle mr-2"></i> Add a Product</button></NavLink>
                            </li>


                            <li className="bg-gray-700 rounded-box hover:bg-gray-50 hover:text-gray-800 transition duration-150 mb-1">
                                <NavLink to={`${url}/makeAdmin`}><button><i className="fas fa-user-shield mr-2"></i> Make Admin</button></NavLink>
                            </li>


                            <li className="bg-gray-700 rounded-box hover:bg-gray-50 hover:text-gray-800 transition duration-150 mb-1">
                                <NavLink to={`${url}/manageProducts`}><button><i className="fas fa-truck-loading mr-2"></i> Manage Products</button></NavLink>
                            </li>
                        </div>
                    }


                    {
                        admin ? <div></div> : <div><li className="bg-gray-700 rounded-box hover:bg-gray-50 hover:text-gray-800 transition duration-150 mb-1">
                            <NavLink to={`${url}/pay`}><button><i className="fas fa-money-check mr-2"></i> Pay</button></NavLink>
                        </li>

                            <li className="bg-gray-700 rounded-box hover:bg-gray-50 hover:text-gray-800 transition duration-150 mb-1">
                                <NavLink to={`${url}/myOrders`}><button><i className="fas fa-shopping-cart mr-2"></i> My Orders</button></NavLink>
                            </li>

                            <li className="bg-gray-700 rounded-box hover:bg-gray-50 hover:text-gray-800 transition duration-150 mb-1">
                                <NavLink to={`${url}/userReview`}><button><i className="fas fa-grin-stars mr-2"></i> User Review</button></NavLink>
                            </li></div>
                    }


                    <li onClick={logOut} className=" custom-pink-lite rounded cursor-pointer hover:bg-gray-50 hover:text-gray-800 transition duration-150 mt-32">
                        <a className="mx-auto"><button><i className="fas fa-sign-out-alt mr-2"></i> Log Out</button></a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;