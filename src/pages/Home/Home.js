import React from 'react';
import Hero from './Hero';
import Header from '../Header/Header';
import Products from './Products';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import FeatureSection from './FeatureSection';
import Reviews from './Reviews';

const Home = () => {
    return (
        <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
        >
            <Header></Header>
            <Hero></Hero>
            <Products></Products>
            <FeatureSection></FeatureSection>
            <Reviews></Reviews>
            <ToastContainer
                position="top-center"
                autoClose={2000}
            />
        </motion.div>
    );
};

export default Home;