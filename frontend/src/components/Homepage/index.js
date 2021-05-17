import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';
import { Button, Grid, makeStyles } from '@material-ui/core';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import { FaLinkedinIn, FaTelegramPlane, FaFacebookF } from 'react-icons/fa';
import card1 from '../../Images/card1.png';
import card2 from '../../Images/card2.png';
import card3 from '../../Images/card3.png';
import card4 from '../../Images/card4.png';
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
	item6: {order: 6},
    smartphones: 
    {
        width: '100%',
        height: '100%',
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
    }
}));

export default function Homepage()
{
    const [chosenCard, setChosenCard] = useState('example1');
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

    const renderImage = () =>
    {
        switch (chosenCard)
        {
            case 'example1':
                return <img className="example" src={card1} alt="Example1" />
            case 'example2':
                return <img className="example" src={card2} alt="Example2" />
            case 'example3':
                return <img className="example" src={card3} alt="Example3" />
            case 'example4':
                return <img className="example" src={card4} alt="Example4" />
            default: return null;
        }
    }

    return (
        <div className="homepage-container">
            <div className="hero-container" title="Photo by Domenico Loia from Unsplash">
                <Grid container direction="row" justify="center" alignItems="center" alignContent="center">
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <h1 className="title">Create your own digital business card today</h1>
                        <p className="subtitle">
                            The marketing world has been changed dramatically over the last years; 
                            Everything has become digital. So, forget about the traditional 
                            business card you know and create an attractive digital business card!
                        </p>
                        <Button component={Link} to='/registartion' variant="contained" className="get-started">Get started</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.smartphones}>
                        <div id="first-smartphone">
                            <img className="example" src={card1} alt="Example1" />
                        </div>
                        <div id="second-smartphone">
                            <img className="example" src={card2} alt="Example2" />
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="about-container" id="about-section">
                <h1 className="section-title">Why should you using it?</h1>
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
                                And stop worry about wasting money on having enough "hard" copies. 
                                Your clients are on their smartphone anyway, so use it to let them 
                                find you reach you by call, message or navigation in a short and convenient way.
                            </p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.item6}>
                            <img src={vector3} alt="Vector3" />
                        </Grid>
                </Grid> 
            </div>
            <div className="how-it-works-container" id="how-it-works-section">
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
            <div className="examples-container" id="examples-section">
                <h1 className="section-title">Looking for inspiration?</h1>
                <div className="content">
                    <Link className="smartphone" to={`/${chosenCard}`} target="_blank">
                        {renderImage()}
                    </Link>
                    <div className="containers">
                        <div className="container" 
                            style={chosenCard === 'example1' ? {backgroundColor: '#1a73e880'} : null}
                            onClick={() => setChosenCard('example1')}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/get-a-card.appspot.com/o/user1%40gmail.com%2Fexample1%2Fmain?alt=media&token=2ad5a5c8-9e40-4187-b6d6-fc8cea2bd3c8" alt="example1" className="profile" />
                            <div className="information">
                                <h4>Shandra Llewellin</h4>
                                <h5>Analyst Programmer</h5>
                            </div>
                        </div>
                        <div className="container" 
                            style={chosenCard === 'example2' ? {backgroundColor: '#1a73e880'} : null}
                            onClick={() => setChosenCard('example2')}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/get-a-card.appspot.com/o/user1%40gmail.com%2Fexample2%2Fmain?alt=media&token=dd8c8fb2-c82f-411e-87bc-951258f3d344" alt="example2" className="profile" />
                            <div className="information">
                                <h4>Karel Kiddell</h4>
                                <h5>Chief Design Engineer</h5>
                            </div>
                        </div>
                        <div className="container" 
                            style={chosenCard === 'example3' ? {backgroundColor: '#1a73e880'} : null}
                            onClick={() => setChosenCard('example3')}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/get-a-card.appspot.com/o/user1%40gmail.com%2Fexample3%2Fmain?alt=media&token=37fadf79-a204-4af4-9835-f24f02a0a507" alt="example3" className="profile" />
                            <div className="information">
                                <h4>Tamqrah Yegorkov</h4>
                                <h5>Graphic Designer</h5>
                            </div>
                        </div>
                        <div className="container" 
                            style={chosenCard === 'example4' ? {backgroundColor: '#1a73e880'} : null}
                            onClick={() => setChosenCard('example4')}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/get-a-card.appspot.com/o/user1%40gmail.com%2Fexample4%2Fmain?alt=media&token=5547ec1e-cae7-43f1-8668-eea022b445cd" alt="example4" className="profile" />
                            <div className="information">
                                <h4>Jaime Ainsworth</h4>
                                <h5>Engineer</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer title="Photo by Skitterphoto from Pixaby">
                <Grid container direction="row" justify="center" alignItems="center" alignContent="center">
                    <Grid item>
                        <div className="about">
                            <h1 className="title">Get a</h1>
                            <h6 className="subtitle">Business card generator</h6>
                            <p className="content">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="site-map">
                            <h2 className="title">Services</h2>
                            <div className="groups">
                                <div className="group">
                                    <div className="map">
                                        <ArrowRightAltRoundedIcon className="arrow" />
                                        <Scroll className="link" to='about-section'
                                            exact='true' smooth={true} duration={1000}
                                            spy={true} offset={-55}>
                                            About
                                        </Scroll>
                                    </div>
                                    <div className="map">
                                        <ArrowRightAltRoundedIcon className="arrow" />
                                        <Scroll className="link" to='how-it-works-section'
                                            exact='true' smooth={true} duration={1000}
                                            spy={true} >
                                            Help
                                        </Scroll>
                                    </div>
                                    <div className="map">
                                        <ArrowRightAltRoundedIcon className="arrow" />
                                        <Scroll className="link" to='examples-section'
                                            exact='true' smooth={true} duration={1000}
                                            spy={true} >
                                            Examples
                                        </Scroll>
                                    </div>
                                </div>
                                <div className="group">
                                    <div className="map">
                                        <ArrowRightAltRoundedIcon className="arrow" />
                                        <Link to='/registartion' className="link">
                                            Sign up
                                        </Link>
                                    </div>
                                    <div className="map">
                                        <ArrowRightAltRoundedIcon className="arrow" />
                                        <Link to='/login' className="link">
                                            Sign in
                                        </Link>
                                    </div>
                                    <div className="map">
                                        <ArrowRightAltRoundedIcon className="arrow" />
                                        <Link to='/dashboard' className="link">
                                            Dashboard
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="contact">
                            <h2 className="title">Have a Questions?</h2>
                            <div className="row">
                                <a href="mailto:tsahi.13@gmail.com">
                                    <FaTelegramPlane className="icon" />
                                </a>
                                <a 
                                    href="https://www.linkedin.com/in/tsahi-barshavsky-frontend-developer/"
                                    target="_blank" rel="noreferrer">
                                    <FaLinkedinIn className="icon" />
                                </a>
                                <a
                                    href="https://www.facebook.com/tsahi.barshavsky/"
                                    target="_blank" rel="noreferrer">
                                    <FaFacebookF className="icon" />
                                </a>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <p className="copyright">
                    Copyright &copy; {new Date().getFullYear()} All rights reserved
                </p>
            </footer>
        </div>
    )
}
