import React, { useState, useEffect } from 'react';
import { Button, createMuiTheme, Grid, MuiThemeProvider, Typography } from '@material-ui/core';
import { 
    FaFacebook, FaInstagram, FaLinkedinIn, FaWaze,
    FaGithub, FaPinterest, FaPhone, FaTelegramPlane,
    FaMobileAlt, FaWhatsapp, FaDribbble } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';
import { IoLogoTiktok } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

const theme = createMuiTheme({
    typography:
    {
        allVariants: { fontFamily: `"Nunito", sans-serif` },
        subtitle1: { fontSize: 18 },
        h5: { textDecoration: 'underline', marginTop: 25 },
        h6: { marginBottom: 15 }
    }
});

export default function Card(props) 
{
    const [card, setCard] = useState({});
    var cardStyle = Object.keys(card).length > 0 ? {
        color: card.palette.text,
        backgroundColor: card.palette.primary,
    } : null;
    var iconStyle = Object.keys(card).length > 0 ? {
        border: `2px solid ${card.palette.text}`,
        color: card.palette.text
    } : null;
    var wazeButton = Object.keys(card).length > 0 ? {
        backgroundColor: card.palette.secondary,
        color: card.palette.text,
        borderRadius: 10,
        width: 160,
        height: 40,
        fontSize: 17,
        textTransform: 'capitalize'
    } : null;
    
    useEffect(() => 
    {
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
            case 'Dribbble': return <FaDribbble className="icon" />
            case 'Telephone': return <FaPhone className="icon" />
            case 'Phone': return <FaMobileAlt className="icon" />
            case 'WhatsApp': return <FaWhatsapp className="icon" />
            case 'Telegram': return <FaTelegramPlane className="icon" />
            case 'Email': return <MdEmail className="icon" />
            default: return null;
        }
    }

    const renderContact = (contact) =>
    {
        switch (contact.type)
        {
            case 'Telephone':
            case 'Phone':
                return (
                    <a href={`tel:${contact.value}`} className="contact-wrapper" style={iconStyle}>
                        {renderIcon(contact.type)}
                    </a>
                );
            case 'WhatsApp':
                return (
                    <a href={`https://api.whatsapp.com/send?phone=${contact.value}`} className="contact-wrapper" style={iconStyle}>
                        {renderIcon(contact.type)}
                    </a>
                );
            case 'Telegram':
                return (
                    <a href={`https://t.me/${contact.value}`} className="contact-wrapper" style={iconStyle}>
                        {renderIcon(contact.type)}
                    </a>
                );
            case 'Email':
                return (
                    <a href={`mailto:${contact.value}`} className="contact-wrapper" style={iconStyle}>
                        {renderIcon(contact.type)}
                    </a>
                );
            default: return null;
        }
    }

    return card !== null ? (
        <div className="page-container">
            <div className="card-container" style={cardStyle} dir={card.langauge === 'Hebrew' ? "rtl" : "ltr"}>
                <MuiThemeProvider theme={theme}>
                    <div className="header">
                        <div className="top">
                            <img src={card.images? card.images.cover : null} alt="cover" className="cover"/>
                        </div>
                        <div className="bottom">
                            <div className="main-image-container">
                                <img src={card.images? card.images.main : null} alt="main" className="main-image"/>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <Typography variant="h3">{card.name}</Typography>
                        <Typography variant="h4" gutterBottom>{card.type}</Typography>
                        {card.socials ?
                        <Grid container direction="row" justify="center" alignItems="flex-start" className="grid">
                            {card.socials.map((social) =>
                                <div key={social.id}>
                                    {social.show ?
                                    <Grid item>
                                        <div className="social">
                                            <a href={social.link} target="_blank" rel="noreferrer" className="social-wrapper" style={iconStyle}>
                                                {renderIcon(social.name)}
                                            </a>
                                            <Typography variant="subtitle1">{social.name}</Typography>
                                        </div>
                                    </Grid> : null}
                                </div>
                            )}
                        </Grid> : null}
                        {card.contact ?
                        <Grid container direction="row" justify="center" alignItems="flex-start" className="grid">
                            {card.contact.map((element) =>
                                <div key={element.id}>
                                    {element.show && element.value !== '' ?
                                    <Grid item>
                                        <div className="contact">
                                            {renderContact(element)}
                                            <Typography variant="subtitle1">{element.type}</Typography>
                                        </div>
                                    </Grid> : null}
                                </div>
                            )}
                        </Grid> : null}
                        <Typography variant="h5" gutterBottom>{card.langauge === 'Hebrew' ? 'אודות' : 'About'}</Typography>
                        <div className="description">
                            <Typography variant="body1" align="center">{card.description}</Typography>
                        </div>
                        <div className="location">
                            <a target="_blank" rel="noreferrer" href={card.waze}>
                                <Button 
                                    variant="contained" 
                                    startIcon={<FaWaze />}
                                    style={wazeButton}>
                                    Navigate
                                </Button>
                            </a>
                            <div className="map">
                                <iframe
                                    width="500"
                                    height="350"
                                    title="map"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA8jIFMHAm_UV2UgdB5jzUwGR6hiIuQ4ew
                                        &q=${card.address}`}>
                                </iframe>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
            <div className="footer">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h6">This business card generated by Get a Card</Typography>
                </MuiThemeProvider>
            </div>
        </div>
    ) : <div className="full-container">Doesn't exists</div>
}
