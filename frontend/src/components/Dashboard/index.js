import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import firebase from '../firebase';
import Card from './card';
import Navbar from './navbar';

export default function Dashbaord(props) 
{
    const currentUser = firebase.getCurrentUsername();
    const [cards, setCards] = useState([]);
    console.log(cards);

    useEffect(() => {
        document.title = 'Dashboard | Get a Card';
        fetch(`/get-all-cards?owner=${currentUser}`)
        .then(res => res.json())
        .then(cards => setCards(cards));
    }, [currentUser]);

    //protect the route
    if (!currentUser) {
        props.history.replace('/login');
        return null;
    }

    return (
        <div className="page-container">
            <div className="dashboard-container">
                <Navbar username={currentUser} logout={logout} />
                <div className="header" title="Photo by Anna Nekrashevich from Pexels">
                    <Typography>hey {currentUser}</Typography>
                </div>
                <Grid container direction="row" justify="center" alignItems="center" className="grid">
                    <Grid item>
                        <Link to="/add-card" className="add-new-card-link">
                            <div className="add-new-card-container">
                                <AddRoundedIcon className="icon" />
                                <h4>Add new card</h4>
                            </div>
                        </Link>
                    </Grid>
                    {cards.map((card) =>
                        <div key={card._id}>
                            <Grid item>
                                <Card cover={card.images.cover} title={card.name} url={card.URL} />
                            </Grid>
                        </div>
                    )}
                </Grid>
            </div>
        </div>
    )

    function logout()
    {
        firebase.logout();
        props.history.replace('/');
    }
}
