import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { 
    FaFacebook, FaInstagram, FaLinkedinIn, 
    FaGithub, FaPinterest, FaWhatsapp } from 'react-icons/fa';

export default function Card(props) 
{
    const [card, setCard] = useState({});
    console.log(card);
    
    useEffect(() => {
        fetch(`/get-card?URL=${props.match.params.URL}`)
        .then(res => res.json())
        .then(card => setCard(card));
    }, [props.match.params.URL]);

    return card !== null ? (
        <div className="page-container">
            <div className="card-container">
                <img src="https://images.pexels.com/photos/804410/pexels-photo-804410.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="cover" className="cover"/>
                <img src="https://images.pexels.com/photos/3412818/pexels-photo-3412818.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="main" className="main"/>
                <Typography variant="h3">{card.name}</Typography>
                <Typography variant="h5" gutterBottom>{card.type}</Typography>
                <Grid container direction="row-reverse" justify="center" alignItems="flex-start">
                    <Grid item>
                        <div className="social">
                            <div className="social-wrapper">
                                <FaFacebook className="icon" />
                            </div>
                            <Typography variant="subtitle1">Facebook</Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="social">
                            <div className="social-wrapper">
                                <FaInstagram className="icon" />
                            </div>
                            <Typography variant="subtitle1">Instagram</Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="social">
                            <div className="social-wrapper">
                                <FaLinkedinIn className="icon" />
                            </div>
                            <Typography variant="subtitle1">Linkedin</Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="social">
                            <div className="social-wrapper">
                                <FaGithub className="icon" />
                            </div>
                            <Typography variant="subtitle1">Github</Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="social">
                            <div className="social-wrapper">
                                <FaPinterest className="icon" />
                            </div>
                            <Typography variant="subtitle1">Pinterest</Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="social">
                            <div className="social-wrapper">
                                <FaWhatsapp className="icon" />
                            </div>
                            <Typography variant="subtitle1">WhatsApp</Typography>
                        </div>
                    </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom><u>About</u></Typography>
                <Typography variant="body1">{card.description}</Typography>
            </div>
        </div>
    ) : <div className="full-container">Doesn't exists</div>
}
