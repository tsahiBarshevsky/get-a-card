import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { 
    FaFacebook, FaInstagram, FaLinkedinIn, 
    FaGithub, FaPinterest, FaPhone,
    FaMobileAlt, FaWhatsapp } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';
import { IoLogoTiktok } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

export default function Card(props) 
{
    const [card, setCard] = useState({});
    var cardStyle = Object.keys(card).length > 0 ? {
        color: card.palette.text,
        backgroundColor: card.palette.primary,
    } : null;
    // var iconStyle = Object.keys(card).length > 0 ? {
    //     border: `1px solid ${card.palette.secondary}`
    // } : null;
    
    useEffect(() => {
        fetch(`/get-card?URL=${props.match.params.URL}`)
        .then(res => res.json())
        .then(card => setCard(card));
    }, [props.match.params.URL]);

    const renderIcon = (name) =>
    {
        switch (name)
        {
            case 'Facebook': return <FaFacebook className="icon" />
            case 'Instagram': return <FaInstagram className="icon" />
            case 'Linkedin': return <FaLinkedinIn className="icon" />
            case 'Github': return <FaGithub className="icon" />
            case 'Pinterest': return <FaPinterest className="icon" />
            case 'Youtube': return <AiFillYoutube className="icon" />
            case 'Tiktok': return <IoLogoTiktok className="icon" />
            case 'Telephone': return <FaPhone className="icon" />
            case 'Phone': return <FaMobileAlt className="icon" />
            case 'Whatsapp': return <FaWhatsapp className="icon" />
            case 'Email': return <MdEmail className="icon" />
            default: return null;
        }
    }

    return card !== null ? (
        <div className="page-container">
            <div className="card-container" style={cardStyle}>
                <div className="header">
                    <img src={card.images? card.images.cover : null} alt="cover" className="cover"/>
                    <img src={card.images? card.images.main : null} alt="main" className="main"/>
                </div>
                <div className="content">
                    <Typography variant="h3">{card.name}</Typography>
                    <Typography variant="h5" gutterBottom>{card.type}</Typography>
                    {card.socials ?
                    <Grid container direction="row" justify="center" alignItems="flex-start">
                        {card.socials.map((social, index) =>
                            <div key={index}>
                                {social.show ?
                                <Grid item>
                                    <div className="social">
                                        <div className="social-wrapper">
                                            {renderIcon(social.name)}
                                        </div>
                                        <Typography variant="subtitle1">{social.name}</Typography>
                                    </div>
                                </Grid> : null}
                            </div>
                        )}
                    </Grid> : null}
                    {card.contact ?
                    <Grid container direction="row" justify="center" alignItems="flex-start">
                        {card.contact.map((element, index) =>
                            <div key={index}>
                                {element.show ?
                                <Grid item>
                                    <div className="social">
                                        <div className="social-wrapper">
                                            {renderIcon(element.type)}
                                        </div>
                                        <Typography variant="subtitle1">{element.type}</Typography>
                                    </div>
                                </Grid> : null}
                            </div>
                        )}
                    </Grid> : null}
                    <Typography variant="h6" gutterBottom><u>About</u></Typography>
                    <div className="description">
                        <Typography variant="body1" align="center">{card.description}</Typography>
                    </div>
                </div>
            </div>
        </div>
    ) : <div className="full-container">Doesn't exists</div>
}
