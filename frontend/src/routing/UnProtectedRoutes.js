import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RequireUnAuth() {
    let location = useLocation();
    return localStorage.getItem('user') ? (
        <Navigate to="/dashboard" state={{ from: location }} />
    ) : (
        <Outlet />
    );
}