/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Header.css'

const Header = () => {

    const reserveImg = "https://i.ibb.co/0jz6gHX/avatar.png";

    const { user, logOut } = useAuth();

    // FOR MOBILE SIDEBAR //
    const [showmenu, setShowmenu] = useState(false);
    // MOBILE NAVIGATION //
    let menu
    if (showmenu) {
        menu =
            <div className="fixed bg-gray-800 top-0 left-0 w-4/5 h-full transition duration-500 shadow z-50">
                <h1 className="pt-10"><NavLink to="/home" activeStyle={{
                    fontWeight: "bold",
                    color: "#34D399"
                }}><button className="py-3">HOME</button></NavLink></h1>

                <h1 className="pt-10"><NavLink to="/explore" activeStyle={{
                    fontWeight: "bold",
                    color: "#34D399"
                }}><button className="py-3">EXPLORE PRODUCTS</button></NavLink></h1>


                {
                    user?.email && <h1 className="pt-10"><NavLink to="/dashboard" activeStyle={{
                        fontWeight: "bold",
                        color: "#34D399"
                    }}><button className="py-3 ">DASHBOARD</button></NavLink></h1>
                }


                <h1 className="pt-10">{user?.email ? <><h3 className=" user-name text-xl font-bold">{user?.displayName}</h3></> : <NavLink to="/login" activeStyle={{
                    fontWeight: "bold",
                    color: "#34D399"
                }}><button className="py-3 ">LOGIN</button></NavLink>}</h1>
                <h1>
                    {user?.email && <img className="user-photo mx-auto mt-4" src={user?.photoURL || reserveImg} alt="" />}
                </h1>
                <h1 className="pt-10">{user?.email ? <button className="px-6 py-3  bg-red-500 rounded text-gray-800 hover:bg-white transition duration-300" onClick={logOut}>Log Out</button> : <NavLink to="/signup"><button
                    className="px-6 py-3  bg-red-500 rounded text-gray-800 hover:bg-white transition duration-300">SIGNUP</button></NavLink>}</h1>
            </div>

    }



    return (
        <div>
            <nav className="bg-gray-900 text-white mx-auto overflow-x-hidden h-20">
                <ul className="flex justify-between mt-2 items-center">
                    <li className="px-10 lg:pl-20 py-3 text-2xl font-bold"><a href="/"><img src="https://i.ibb.co/vvXhTVt/logo2.png" alt="" /></a></li>
                    <li className="md:hidden">{user?.displayName && <img className="user-photo" src={user?.photoURL} alt="" />}</li>
                    <li onClick={() => setShowmenu(!showmenu)} className="md:hidden text-2xl px-5"><i className="fas fa-bars"></i>
                        {menu}</li>
                    <div className="hidden md:flex">
                        <li className="mx-5 hover:text-green-400"><NavLink to="/home" activeStyle={{
                            fontWeight: "bold",
                            color: "#FF0062"
                        }}><button className="py-3 font-semibold hover:text-red-500 transition duration-300">HOME</button></NavLink>
                        </li>

                        <li className="mx-5 hover:text-green-400"><NavLink to="/explore" activeStyle={{
                            fontWeight: "bold",
                            color: "#FF0062"
                        }}><button className="py-3 font-semibold hover:text-red-500 transition duration-300">EXPLORE PRODUCTS</button></NavLink>
                        </li>




                        {
                            user?.email && <li className="mx-5 hover:text-red-500 transition duration-300"> <NavLink to="/dashboard" activeStyle={{
                                fontWeight: "bold",
                                color: "#FF0062"
                            }}><button className="py-3 font-semibold ">DASHBOARD</button></NavLink> </li>
                        }

                        <li>
                            {
                                user?.email && <><h3 className=" user-name text-xl font-bold">{user?.displayName}</h3></>
                            }
                        </li>

                        <li className="ml-7">
                            {user?.email && <img className="user-photo" src={user?.photoURL || reserveImg} alt="" />}
                        </li>

                        <li className="xl:mx-5 lg:px-7 md:px-7 hidden md:flex">
                            {user?.email ? <button className="px-6 py-3 custom-pink-lite rounded text-white hover:text-red-500 hover:bg-white transition duration-300" onClick={logOut}>Log Out</button> : <NavLink to="/login"><button
                                className="px-6 py-3 custom-pink-lite rounded text-white hover:text-red-500 hover:bg-white transition duration-300">LOGIN</button></NavLink>}
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default Header;




