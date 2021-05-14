import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, makeStyles } from '@material-ui/core';
import vector1 from '../../Images/Card.svg';
import vector2 from '../../Images/Digital.svg';
import vector3 from '../../Images/Find your way.svg';
import image1 from '../../Images/protect.png';
import image2 from '../../Images/business-card.png';
import image3 from '../../Images/socials.png';

const useStyles = makeStyles(theme => ({
	grid:
	{
		marginBottom: 70,
        [theme.breakpoints.down("sm")]:
		{
			paddingTop: 40
		}
	},
	item1: {order: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'},
	item2: {order: 2},
	item3:
	{
		order: 3,
		[theme.breakpoints.down("sm")]:
		{
			order: 4
		}
	},
	item4:
	{
		display: 'flex', flexDirection: 'column', alignItems: 'center',
		order: 4,
		[theme.breakpoints.down("sm")]:
		{
			order: 3
		}
	},
	item5: {order: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'},
	item6: {order: 6}
}));

export default function Homepage()
{
    const classes = useStyles();
    const account = {
        backgroundColor: '#ffce00',
        backgroundImage: "url(" + image1 + ")",
        backgroundSize: '100% 100%'
    };
    const card = {
        backgroundColor: '#00d7df',
        backgroundImage: "url(" + image2 + ")",
        backgroundSize: '100% 100%'
    };
    const social = {
        backgroundColor: '#607ea3',
        backgroundImage: "url(" + image3 + ")",
        backgroundSize: '100% 100%'
    };

    return (
        <div className="homepage-container">
            {/* <Link to="/login">Login</Link>
            <Link to="/registartion">Registartion</Link>
            <Link to="/dashboard">Dashboard</Link> */}
            <div className="hero-container">
                <div className="subtitle">
                    <h3>Get a Card</h3>
                </div>
                <h1 className="title">The world has become digital, why would you be left behind?</h1>
                <Button className="button"
                    variant="contained" 
                    component={Link} 
                    to='/registartion'>Get started</Button>
            </div>
            <div className="about-container">
                <Grid
                    className={classes.grid}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    alignContent="center">
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item1}>
                            <h1 className="title">It's one business card</h1>
                            <p className="content">
                                But the possibilities are endless! Forget about the small and traditional business
                                card and create a digital card with rich content, photos, videos, links to social 
                                networks, a map and the option to navigate the business.
                            </p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item2}>
                            <img src={vector1} alt="Vector1" />
                        </Grid>
                        {/*---*/}
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item3}>
                            <img src={vector2} alt="Vector2" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item4}>
                            <h1 className="title">We're living in a digital world</h1>
                            <p className="content">
                                So accordingly and for the sake of preserving the planet and the environment, 
                                there is no point in spending money and resources on paper and printing. 
                                It's better to create one card and spread it to anyone you want using one link.
                            </p>
                        </Grid>
                        {/*---*/}
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item5}>
                            <h1 className="title">Earn full mobility</h1>
                            <p className="content">
                                And don't worry about wasting money on having enough "hard" copies. 
                                Your customers are on your cell phone anyway, so use it to let them 
                                find you reach you by call, message or navigation in a short and convenient way.
                            </p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item6}>
                            <img src={vector3} alt="Vector3" />
                        </Grid>
                </Grid> 
            </div>
            <div className="how-it-works-container">
                <h1>How does it work?</h1>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <div className="element">
                            <div className="circle" style={account} title="Icon made by Freepik from Flaticon">
                                <div className="step"><h3>1</h3></div>
                            </div>
                            <h2 className="title">Create an account</h2>
                            <h4 className="subtitle">With one account you can create countless business cards</h4>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <div className="element">
                            <div className="circle" style={card} title="Icon made by Freepik from Flaticon">
                                <div className="step"><h3>2</h3></div>
                            </div>
                            <h2 className="title">Create and style card</h2>
                            <h4 className="subtitle">Fill the information about your business and style the card</h4>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <div className="element">
                            <div className="circle" style={social} title="Icon made by Freepik from Flaticon">
                                <div className="step"><h3>3</h3></div>
                            </div>
                            <h2 className="title">Spread it everywhere!</h2>
                            <h4 className="subtitle">Once the card is ready, you can share it everywhere you want</h4>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
