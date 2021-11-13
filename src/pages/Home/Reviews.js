import React, { useEffect, useState } from 'react';
import Rating from 'react-rating'
import './Reviews.css'



const Reviews = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))

    }, [])







    return (
        <div>
            <h2 className=" py-10 text-center text-4xl font-bold text-gray-700">User Review</h2>
            <div className=" mx-auto grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-4/5 pb-24">
                {
                    reviews.map(review => <div
                        key={review._id}
                        className="mx-auto bg-yellow-100 rounded-box py-10"
                    >
                        <img className="rounded-full h-20 mx-auto" src={review.rating_person_img} alt="" />
                        <h2 className="my-3 font-bold"> {review.rating_person} </h2>
                        <Rating
                            initialRating={review.rating}
                            emptySymbol="far fa-star fa-2x icon-color"
                            fullSymbol="fas fa-star fa-2x icon-color"
                            readonly
                        ></Rating>
                        <h2 className="my-3 w-5/6 mx-auto">{review.comment} </h2>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Reviews;