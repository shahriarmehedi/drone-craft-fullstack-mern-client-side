import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Checkout = ({ order }) => {
    const { ordered_product_price, fullname, useremail } = order;

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);

    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('https://warm-peak-17617.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ ordered_product_price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));

    }, [ordered_product_price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }


        setProcessing(true);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            setSuccess('');
            setProcessing(false);
        } else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        // Payment Intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: fullname,
                        email: useremail
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess('');
            setProcessing(false);
        }
        else {
            setError('');
            setSuccess('Your Payment Processed Successfully')
            console.log(paymentIntent);
            setProcessing(false);

            // SAVE TO OUR 

        }

    }


    return (
        <div className="w-5/6 md:w2/5 lg:w-1/2 mx-auto bg-white py-10 my-8">
            <form className="w-5/6 mx-auto" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {processing ? <button className=" bg-green-600 transition duration-150 hover:bg-green-800 text-white px-4 py-2 mr-2 mt-10 rounded-md">
                    Please wait..
                </button> : <button className=" bg-green-600 transition duration-150 hover:bg-green-800 text-white px-4 py-2 mr-2 mt-10 rounded-md" type="submit" disabled={!stripe}>
                    Pay $ {ordered_product_price}
                </button>}
                {
                    error && <div className="my-5 text-red-500 py-3 rounded-md bg-red-100 ">
                        <h2> {error} </h2>
                    </div>
                }
                {
                    success && <div className="my-5 text-green-500 py-3 rounded-md bg-green-100 ">
                        <h2> {success} </h2>
                    </div>
                }
            </form>
        </div>
    );
};

export default Checkout;