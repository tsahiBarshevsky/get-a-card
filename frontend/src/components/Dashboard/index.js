import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import firebase from '../firebase';
import Card from './card';
import Navbar from './navbar';

const styles = makeStyles({
    title: { fontFamily: `"Nunito", sasn-serif`, marginBottom: 10 },
    subtitle: { fontFamily: `"Nunito", sasn-serif`, lineHeight: 1.3 }
});

export default function Dashbaord(props) 
{
    const currentUser = firebase.getCurrentUsername();
    const [cards, setCards] = useState('');
    const classes = styles();

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

    return cards ? (
        <div className="page-container">
            <Navbar username={currentUser} logout={logout} />
            <div className="dashboard-container">
                <div className="header" title="Photo by Anna Nekrashevich from Pexels">
                    {cards.length === 0 ?
                    <>
                        <Typography variant="h4" className={classes.title}>
                            Welcome to Get a Card!
                        </Typography>
                        <Typography variant="h6" className={classes.subtitle}>
                            A tool that allows you to create a new digital business card, faster than you ever imagined.
                        </Typography>
                        <Button component={Link} to="/add-card" className="button" variant="contained">
                            Create your first card
                        </Button>
                    </>
                    : null}
                </div>
                <Grid container direction="row" justify="center" alignItems="center" className="grid">
                    {cards.length > 0 ?
                    <Grid item>
                        <Link to="/add-card" className="add-new-card-link">
                            <div className="add-new-card-container">
                                <AddRoundedIcon className="icon" />
                                <h4>Add new card</h4>
                            </div>
                        </Link>
                    </Grid> : null}
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
    ) : <div className="full-container">Loading</div>

    function logout()
    {
        firebase.logout();
        props.history.replace('/');
    }
}
