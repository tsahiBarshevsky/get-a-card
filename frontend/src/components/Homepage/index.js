import React from 'react';
import { Link } from 'react-router-dom';
// import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
// import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { Button, Grid } from '@material-ui/core';
import image1 from '../../Images/protect.png';
import image2 from '../../Images/business-card.png';
import image3 from '../../Images/socials.png';

export default function Homepage()
{
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
            {/* <div className="about-container">
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <div className="about">
                            <div className="icon-container">
                                <ReceiptRoundedIcon className="icon" />
                            </div>
                            <h2 className="title">Saves paper</h2>
                            <p className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce maximus pellentesque quam ac viverra. Curabitur.
                            </p>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="about">
                            <div className="icon-container">
                                <PhoneAndroidRoundedIcon className="icon" />
                            </div>
                            <h2 className="title">Portable</h2>
                            <p className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce maximus pellentesque quam ac viverra. Curabitur.
                            </p>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="about">
                            <div className="icon-container">
                                <AccountCircleRoundedIcon className="icon" />
                            </div>
                            <h2 className="title">One account</h2>
                            <p className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce maximus pellentesque quam ac viverra. Curabitur.
                            </p>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="about">
                            <div className="icon-container">
                                <AcUnitRoundedIcon className="icon" />
                            </div>
                            <h2 className="title">Lorem ipsum</h2>
                            <p className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce maximus pellentesque quam ac viverra. Curabitur.
                            </p>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="about">
                            <div className="icon-container">
                                <AcUnitRoundedIcon className="icon" />
                            </div>
                            <h2 className="title">Lorem ipsum</h2>
                            <p className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce maximus pellentesque quam ac viverra. Curabitur.
                            </p>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="about">
                            <div className="icon-container">
                                <AcUnitRoundedIcon className="icon" />
                            </div>
                            <h2 className="title">Lorem ipsum</h2>
                            <p className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce maximus pellentesque quam ac viverra. Curabitur.
                            </p>
                        </div>
                    </Grid>
                </Grid>
            </div> */}
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
