import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

export default function Dashbaord(props) 
{
    const currentUser = firebase.getCurrentUsername();

    //protect the route
    if (!currentUser) {
        props.history.replace('/login');
        return null;
    }

    return (
        <div className="page-container">
            <div className="dashboard-container">
                <Typography>hey {currentUser}</Typography>
                <Link to="/add-card">Add card</Link>
                <Button onClick={() => logout()}>Logout</Button>
            </div>
        </div>
    )

    function logout()
    {
        firebase.logout();
        props.history.replace('/');
    }
}
