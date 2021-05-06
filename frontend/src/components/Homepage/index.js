import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage()
{
    return (
        <div className="full-container">
            <Link to="/login">Login</Link>
            <Link to="/registartion">Registartion</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/example">Example</Link>
        </div>
    )
}
