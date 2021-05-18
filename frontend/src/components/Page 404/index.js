import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Page404() 
{
    document.title = 'Error | Get c Card';

    return (
        <div className="page-404-container">
            <h1>Oops!</h1>
            <h3>404 - page not found</h3>
            <p>The page you were looking for doesn't exists.</p>
            <Button 
                variant="contained"
                component={Link}
                to='/'
                className="button">Go Home</Button>
        </div>
    )
}
