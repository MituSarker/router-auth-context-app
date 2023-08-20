import React, { useContext } from 'react';
import { AuthContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const PrivetRout = ({children}) => {

    const {user,loading } = useContext(AuthContext);

    if(loading) {
        return <div>Loading...</div>
    }

    if (user && user.uid){
        return children;
    }

    return  <Navigate to='/login'></Navigate>;
};

export default PrivetRout;