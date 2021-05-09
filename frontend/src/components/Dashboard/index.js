import React, { useEffect, useState } from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import Card from './card';

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
                <Typography>hey {currentUser}</Typography>
                <Link to="/add-card">Add card</Link>
                <Button onClick={() => logout()}>Logout</Button>
                <Grid container direction="row" justify="center" alignItems="center" className="grid">
                    {/* <Grid item lg={4}>
                        <Card title="stam"/>
                    </Grid> */}
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
