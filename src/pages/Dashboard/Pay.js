import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import Checkout from './Checkout';


const stripePromise = loadStripe('pk_test_51JwoQBH5pvqyzU7t1vfxRoh0ctCqNDXVvHO5EsZkbIPdzRtSKxZw5oC77CTh61ykcX1j3GgsJHfoCOhcIkGWE9mX00TonZlY5g');




const Pay = () => {

    const { orderId } = useParams();
    const [order, setorder] = useState({});
    useEffect(() => {
        fetch(`https://warm-peak-17617.herokuapp.com/orders/${orderId}`)
            .then(res => res.json())
            .then(data => setorder(data))
    }, [orderId])


    return (
        <div>
            <h2 className=" pb-5 pt-20 text-center text-4xl font-bold text-gray-700 ">Payment</h2>
            <h2> Order ID: {orderId}  </h2>
            <h3 className="text-3xl font-bold text-gray-700"> To Pay: $ {order.ordered_product_price} </h3>

            <div className="py-5">
                <img className="rounded-lg mx-auto" src={order.ordered_product_img} alt=" " />
            </div>
            <div>
                <h2 className="text-2xl">{order.ordered_product}</h2>
                <span className="badge badge-primary badge-lg mt-2"> {order.ordered_product_brand} </span>
            </div>
            {order?.ordered_product_price && <Elements stripe={stripePromise}>
                <Checkout
                    order={order}
                ></Checkout>
            </Elements>}
        </div>
    );
};

export default Pay;