import React, { useEffect, useState } from 'react';
import { useTheme, Typography, Grid, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import firebase from '../firebase';
import Card from './card';
import Navbar from './navbar';
import LoadingAnimation from '../Loading';
import ScrollToTop from '../scrollToTop';

const styles = makeStyles({
    title: { fontFamily: `"Nunito", sasn-serif`, marginBottom: 10 },
    subtitle: { fontFamily: `"Nunito", sasn-serif`, lineHeight: 1.3 }
});

export default function Dashbaord(props) 
{
    const currentUser = firebase.getCurrentUsername();
    const [cards, setCards] = useState('');
    const [update, setUpdate] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true
	});
    const classes = styles();

    useEffect(() => {
        document.title = 'Dashboard | Get a Card';
        async function fetchData() 
        {
            const res = await fetch(`https://get-a-card.herokuapp.com/get-all-cards?owner=${currentUser}`);
            const json = await res.json();
            setCards(json);
        }
        if (update)
        {
            fetchData();
            setUpdate(false);
        }
    }, [currentUser, setCards, update]);

    //protect the route
    if (!currentUser) {
        props.history.replace('/login');
        return null;
    }

    return cards ? (
        <div className="page-container">
            <Navbar username={currentUser} cards={cards.length} logout={logout} />
            <ScrollToTop />
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
                <div className="grid-container">
                    {cards.length > 0 ? <h3>Your digital business cards</h3> : null}
                    <Grid container direction="row" justify={isMobile ? "center" : "flex-start"} alignItems="center">
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
                                    <Card 
                                        cover={card.images.cover} 
                                        title={card.name} 
                                        url={card.URL}
                                        gallery={card.gallery}
                                        setUpdate={setUpdate} />
                                </Grid>
                            </div>
                        )}
                    </Grid>
                </div>
            </div>
        </div>
    ) : <LoadingAnimation />

    function logout()
    {
        firebase.logout();
        props.history.replace('/');
    }
}
