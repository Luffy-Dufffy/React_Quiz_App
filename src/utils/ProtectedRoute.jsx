import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.key) {
        return <Navigate to={'/login'} />;
    }
    return <Outlet />;
}

export default ProtectedRoute