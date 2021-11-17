import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import useAuth from '../../hooks/useAuth';


const UserReview = () => {

    const { user } = useAuth();
    const reserveImg = "https://i.ibb.co/0jz6gHX/avatar.png";

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {

        const newReviewData = {
            ...data,
            rating_person: user.displayName || "Anonymous User",
            rating_person_img: user.photoURL || reserveImg
        };
        console.log(newReviewData);
        axios.post('https://warm-peak-17617.herokuapp.com/reviews', newReviewData)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Your feedback has been sent');
                    reset();
                }
            })
    };

    return (
        <div>
            <h2 className=" pb-20 pt-20 text-3xl font-bold text-gray-700">Give us a review:</h2>

            <div className="text-gray-800 pb-16 bg-gray-800 pt-10 rounded-box w-11/12 md:w-5/6 lg:w-2/5 mx-auto">
                <form className="mx-auto add-service-form w-5/6" onSubmit={handleSubmit(onSubmit)}>


                    <label className="label">
                        <span className="label-text text-white">Type a rating number (Between 1-5):</span>
                    </label>
                    <input type="number" {...register("rating", { min: 1, max: 5 })} />

                    <label className="label">
                        <span className="label-text text-white">Your comment for us:</span>
                    </label>
                    <textarea {...register("comment", { required: true })} /> <br />
                    <input className="submit-btn custom-pink-lite text-white" type="submit" />
                </form>
            </div>


        </div>
    );
};

export default UserReview;