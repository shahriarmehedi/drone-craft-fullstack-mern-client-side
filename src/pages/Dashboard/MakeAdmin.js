import React, { useState } from 'react';

const MakeAdmin = () => {

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleMakeAdmin = e => {

        const user = { email };

        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    setEmail('');
                    setSuccess(true);
                }

            })

        e.preventDefault();
    }


    return (
        <div>
            <h2 className=" pb-20 pt-20 text-center text-3xl font-bold text-gray-700 ">Upgrade an user to an Admin</h2>
            <div className="text-gray-800 pb-16 bg-gray-800 pt-10 rounded-box w-11/12 md:w-5/6 lg:w-2/5 mx-auto">
                <form className=" add-service-form w-5/6 mx-auto " onSubmit={handleMakeAdmin}>
                    <label className="label">
                        <span className="label-text text-white">Type users Email:</span>
                    </label>
                    <input onBlur={handleOnBlur} type="email" variant="standard" />
                    <button className=" py-3 custom-pink-lite hover:bg-gray-500 transition duration-300 text-white mt-5 submit-btn" type="submit" >Make Admin</button>
                </form>
            </div>
            {success && <div class="alert alert-success my-7 w-11/12 md:w-5/6 lg:w-2/5 mx-auto">
                <div class="flex-1">
                    <label><i className="fas fa-check-circle mr-2"></i> User made admin successfully</label>
                </div>
            </div>}
        </div>
    );
};

export default MakeAdmin;