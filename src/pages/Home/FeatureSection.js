import React from 'react';

const FeatureSection = () => {
    return (
        <div className="bg-white pb-10 ">
            <h1 className=" pt-10  text-center text-4xl font-bold text-gray-700">Our Partners</h1>
            <p className="text-gray-400 pt-5">Our worlwide partners, the industry leaders</p>
            <div className="w-5/6 xl:px-36 2xl:px-48 py-5 lg:py-28  grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto">
                <div>
                    <img className="mx-auto h-32 mb-5" src="https://i.ibb.co/VShKg3j/2.png" alt="" />
                    <h2 className="text-2xl font-bold mb-3">Years of successfull work</h2>

                </div>
                <div>
                    <img className="mx-auto h-32 mb-5" src="https://i.ibb.co/WnP5Dfw/1.png" alt="" />
                    <h2 className="text-2xl font-bold mb-3">Stunning tours</h2>

                </div>
                <div>
                    <img className="mx-auto h-32 mb-5" src="https://i.ibb.co/Q8qjqqK/3.png" alt="" />
                    <h2 className="text-2xl font-bold mb-3">Travel experts</h2>

                </div>

            </div>
        </div>
    );
};

export default FeatureSection;