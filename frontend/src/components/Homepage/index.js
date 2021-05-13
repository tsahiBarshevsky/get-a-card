import React from 'react';
import { Link } from 'react-router-dom';
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import AcUnitRoundedIcon from '@material-ui/icons/AcUnitRounded';
import { Button, Grid } from '@material-ui/core';

export default function Homepage()
{
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
            </div>
        </div>
    )
}
