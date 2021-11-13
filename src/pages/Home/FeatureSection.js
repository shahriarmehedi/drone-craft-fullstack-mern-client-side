import React from 'react';

const FeatureSection = () => {
    return (
        <div className="bg-gray-50 pb-10 ">
            <h1 className=" pt-10  text-center text-4xl font-bold text-gray-700">Our Partners</h1>
            <p className="text-gray-400 pt-5">Our worlwide partners, the industry leaders</p>
            <div className="w-5/6 xl:px-36 2xl:px-48 py-5 lg:py-28  grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto">
                <div>
                    <img className="mx-auto h-32 mb-5 rounded-lg shadow-xl" src="https://i.ibb.co/kMKCBLw/1.png" alt="" />

                </div>
                <div>
                    <img className="mx-auto h-32 mb-5 shadow-xl rounded-lg" src="https://i.ibb.co/f4mGZ86/2.png" alt="" />

                </div>
                <div>
                    <img className="mx-auto h-32 mb-5 shadow-xl rounded-lg" src="https://i.ibb.co/gFsybB2/3.png" alt="" />

                </div>

            </div>
        </div>
    );
};

export default FeatureSection;