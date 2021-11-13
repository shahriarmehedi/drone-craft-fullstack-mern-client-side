/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeAuthentication from "../firebase/firebase.init";
import { toast } from 'react-toastify';

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);


    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();



    ///////// GOOGLE SIGN IN POPUP //////////
    const signInUsingGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                setUser(user);
                // SAVE USER TO DATABASE
                saveUser(user.email, user.displayName, 'PUT');
                console.log(result.user);
                // eslint-disable-next-line no-unused-expressions
                toast.success('User Successfully Signed In via Google');

            }).catch(error => {
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }
    ////////// USER LOG OUT //////////
    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
                toast.success('User Successfully Logged Out')
            }).finally(() => setIsLoading(false))
    }
    /////// OBSERVE WHEATHER AUTH STATE CHANGED OR NOT ///////

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                console.log('inside state changed', user);
                setUser(user);
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])


    // ADMIN CHECKING
    useEffect(() => {
        fetch(`https://warm-peak-17617.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin));


    }, [user.email]);


    // SAVE USER TO DATABASE
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://warm-peak-17617.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        signInUsingGoogle,
        isLoading,
        user,
        admin,
        logOut
    }
}

export default useFirebase;