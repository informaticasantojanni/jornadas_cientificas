import { Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/hooks/useAuth'

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();

    if (loading) {
        // Optionally, you can render a loading spinner or null while checking authentication
        return <div>Loading...</div>;
    }

    if (!user) {
        // If the user is not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If the user is authenticated, render the protected component
    return children;
}

export default PrivateRoute