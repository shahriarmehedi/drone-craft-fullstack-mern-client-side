import { motion } from 'framer-motion';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Hero.css'

const Hero = () => {

    const bgBanner = "https://images.unsplash.com/photo-1515060939377-d73d9c162a66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1452&q=80"


    return (
        <div style={{ backgroundImage: `url(${bgBanner})`, backgroundSize: "cover" }} className="bg-gray-50 ">
            <section className="container mx-auto text-left px-10 pt-10">
                <div className="flex items-center justify-between flex-col lg:flex-row">
                    <div>
                        <motion.h1
                            initial={{ x: '-100vw' }}
                            animate={{ x: 0 }}
                            transition={{ type: 'spring' }}
                            className=" text-5xl md:text-6xl lg:text-7xl font-bold my-10 leading-tight md:leading-relaxed"> <span className="text-red-500">Collection</span> of Drones <br />you'll love to have!
                        </motion.h1>
                        <p className="">Explore our droneshop and choose your own.</p>
                        <button
                            className="px-8 py-3 mt-10 bg-gray-700 rounded hover:bg-red-500 text-red-500 hover:text-white transition duration-300 "><NavLink to="/explore">EXPLORE DRONES</NavLink></button>
                    </div>
                    <motion.div
                        initial={{ y: '-100vw' }}
                        animate={{ y: 0 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <img className="py-5 lg:py-0" src="https://i.ibb.co/kGg4zHM/Front-drone.png" alt="" />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Hero;