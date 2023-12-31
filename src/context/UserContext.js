import React, { createContext, useEffect, useState } from 'react';
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import app from '../components/firebase/firebase.config';

 export const AuthContext =createContext();

    const auth = getAuth(app);

const UserContext = ({children}) => {
        const [user,setUser]=useState({});
        const [loading, setLoading] = useState(true);

        const googleProvider = new GoogleAuthProvider();

        const createUser = (email, password) => {
            return createUserWithEmailAndPassword (auth, email, password);
        }
        const signIn= (email,password)=>{
            return signInWithEmailAndPassword(auth,email,password);

        }

            const logOut=()=>{
                return signOut(auth);
            }

            const signInWithGoogle = () =>{
                return signInWithPopup(auth, googleProvider);
            }


            useEffect(()=>{
                const unsubscribe =  onAuthStateChanged(auth,currentUser=>{
                    setUser(currentUser);
                    setLoading(false);
                    console.log('auth state chang',currentUser);
                })
                return () => {
                    unsubscribe();
                }
            },[])



    const authInfo ={user,createUser,signIn,logOut,signInWithGoogle,loading}


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;
