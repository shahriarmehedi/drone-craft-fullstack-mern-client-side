import React from 'react';
import { NavLink } from 'react-router-dom';
import './Hero.css'

const Hero = () => {
    return (
        <div className="bg-gray-50">
            <section className="container mx-auto text-left px-10 py-10">
                <div className="flex items-center justify-between flex-col lg:flex-row">
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-10 leading-normal"> <span className="text-red-500">Collection</span> of Drones <br />you'll love to have!
                        </h1>
                        <p className="">Explore our droneshop and choose ypur own.</p>
                        <button
                            className="px-8 py-3 mt-10 bg-gray-700 rounded hover:bg-red-500 text-red-500 hover:text-white transition duration-300 "><NavLink to="/explore">EXPLORE DRONES</NavLink></button>
                    </div>
                    <div>
                        <img className="py-10 lg:py-0" src="https://i.ibb.co/kGg4zHM/Front-drone.png" alt="" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;