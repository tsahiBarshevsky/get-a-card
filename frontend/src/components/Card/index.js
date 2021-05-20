import React, { useState, useEffect } from 'react';
import { Button, createMuiTheme, Grid, MuiThemeProvider, Typography } from '@material-ui/core';
import { 
    FaFacebook, FaInstagram, FaLinkedinIn, FaWaze,
    FaGithub, FaPinterest, FaPhone, FaTelegramPlane,
    FaMobileAlt, FaWhatsapp, FaDribbble } from 'react-icons/fa';
import { 
    FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon,
    TelegramShareButton, TelegramIcon, LinkedinShareButton, LinkedinIcon,
    FacebookMessengerShareButton, FacebookMessengerIcon } from 'react-share';
import { AiFillYoutube } from 'react-icons/ai';
import { IoLogoTiktok } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { GiWorld } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import ImageGallery from 'react-image-gallery';
import LoadingAnimation from '../Loading';
import firebase from '../firebase';

export default function Card(props) 
{
    const theme = createMuiTheme({
        typography:
        {
            allVariants: { fontFamily: `"Nunito", sans-serif`, textAlign: 'center' },
            body1: { fontSize: 20, marginTop: 5 },
            subtitle1: { fontSize: 18 },
            h5: { textDecoration: 'underline', marginTop: 25 },
            h6: { marginBottom: 15 }
        }
    });

    const [load, setLoad] = useState(false);
    const [card, setCard] = useState({});
    const [gallery, setGallery] = useState([]);
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
        color: card.palette.name === 'Default palette' ? 'white' : card.palette.text,
        borderRadius: 10,
        width: 160,
        height: 40,
        fontSize: 17,
        textTransform: 'capitalize'
    } : null;
    var hebrewFont = { fontFamily: `"Alef", sans-serif` };
    var delay = 0;
    
    useEffect(() => 
    {
        setTimeout(() => {
            setLoad(true);
        }, 1000);
        fetch(`https://get-a-card.herokuapp.com/get-card?URL=${props.match.params.URL}`)
        .then(res => res.json())
        .then(card => {
            setCard(card);
            if (card.gallery)
            {
                const storageRef = firebase.storage.ref();
                storageRef.child(`${card.owner}/${card.URL}/gallery`).listAll()
                .then((res) => {
                    res.items.map((itemRef) => {
                        itemRef.getDownloadURL().then(function(url)
                        {
                            console.log(url);
                            setGallery(oldGallery => [...oldGallery, {original: url, thumbnail: url }]);
                        });
                    });
                }).catch((error) => {
                    console.log(error.message);
                });
            }
            document.title = Object.keys(card).length > 0 ? `${card.name} | Get a Card` : 'Error | Get a Card';
        });
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
            case 'Website': return <GiWorld className="icon" />
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

    const renderDescription = () =>
    {
        var paragraphs = card.description.split("\n");
        return paragraphs.map((paragraph, index) =>
            <div key={index}>
            {paragraph !== "" ? 
                <ScrollAnimation animateIn="animate__fadeInUpBig" animateOnce>
                    <Typography 
                        variant="body1" 
                        style={card.langauge === 'Hebrew' ? hebrewFont : null}
                        align="center">{paragraph}</Typography>
                    <br />    
                </ScrollAnimation>
            : null }
            </div>
        )
    }

    const localization = (element) =>
    {
        switch (element)
        {
            case 'Telephone':
                return 'טלפון';
            case 'Phone':
                return 'פלאפון';
            case 'WhatsApp':
                return 'וואטסאפ';
            case 'Telegram':
                return 'טלגרם';
            case 'Email':
                return 'מייל';
            case 'Facebook':
                return 'פייסבוק';
            case 'Instagram':
                return 'אינסטגרם';
            case 'Linkedin':
                return 'לינקדין';
            case 'Github':
                return 'גיטהאב';
            case 'Pinterest':
                return 'פינטרסט';
            case 'Youtube':
                return 'יוטיוב';
            case 'Tiktok':
                return 'טיק-טוק';
            case 'Dribbble':
                return 'דריבל';
            case 'Website':
                return 'אתר';
            default: return null;
        }
    }

    return load ? (
        Object.keys(card).length > 0 ?
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
                        <ScrollAnimation animateIn="animate__bounceInLeft" animateOnce>
                            <Typography 
                                variant="h3" 
                                style={card.langauge === 'Hebrew' ? hebrewFont : null}>
                                    {card.name}
                            </Typography>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="animate__bounceInRight" animateOnce>
                            <Typography 
                                variant="h4" 
                                style={card.langauge === 'Hebrew' ? hebrewFont : null}
                                gutterBottom>{card.type}</Typography>
                        </ScrollAnimation>
                        {card.socials ?
                        <Grid container direction="row" justify="center" alignItems="flex-start" className="grid">
                            {card.socials.map((social) =>
                                <ScrollAnimation animateIn="animate__backInUp" delay={delay+=100} animateOnce>
                                    <div key={social.id}>
                                        {social.show && social.link !== '' ?
                                        <Grid item>
                                            <div className="social">
                                                <a href={social.link} target="_blank" rel="noreferrer" className="social-wrapper" style={iconStyle}>
                                                    {renderIcon(social.name)}
                                                </a>
                                                <Typography 
                                                    variant="subtitle1"
                                                    style={card.langauge === 'Hebrew' ? hebrewFont : null}>
                                                    {card.langauge === 'English' ? social.name : localization(social.name)}
                                                </Typography>
                                            </div>
                                        </Grid> : null}
                                    </div>
                                </ScrollAnimation>
                            )}
                        </Grid> : null}
                        {card.contact ?
                        <Grid container direction="row" justify="center" alignItems="flex-start" className="grid">
                            {card.contact.map((element) =>
                                <ScrollAnimation animateIn="animate__backInUp" delay={delay+=100} animateOnce>
                                    <div key={element.id}>
                                        {element.show && element.value !== '' ?
                                        <Grid item>
                                            <div className="contact">
                                                {renderContact(element)}
                                                <Typography 
                                                    variant="subtitle1"
                                                    style={card.langauge === 'Hebrew' ? hebrewFont : null}>
                                                    {card.langauge === 'English' ? element.type : localization(element.type)}
                                                </Typography>
                                            </div>
                                        </Grid> : null}
                                    </div>
                                </ScrollAnimation>
                            )}
                        </Grid> : null}
                        <Typography 
                            variant="h5" 
                            style={card.langauge === 'Hebrew' ? hebrewFont : null}
                            gutterBottom>{card.langauge === 'Hebrew' ? 'אודות' : 'About'}</Typography>
                        <div className="description">
                            {card.description !== undefined ? renderDescription() : null}
                        </div>
                        <div className="location">
                            {card.waze !== 'none' ?
                            <a target="_blank" rel="noreferrer" href={card.waze}>
                                <Button 
                                    variant="contained" 
                                    startIcon={<FaWaze style={card.langauge === 'Hebrew' ? {marginLeft: 15} : null} />}
                                    style={wazeButton}>
                                    {card.langauge === 'English' ? 'Navigate' : 'נווט אליי'}
                                </Button>
                            </a> : null }
                            {card.address !== '' ?
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
                            </div> : null }
                        </div>
                        {card.gallery ?
                        <div className="image-gallery">
                            <ImageGallery items={gallery} showIndex showPlayButton={false} />
                        </div> : null}
                        <Typography 
                            variant="h5" 
                            style={card.langauge === 'Hebrew' ? hebrewFont : null}
                            gutterBottom>{card.langauge === 'Hebrew' ? 'שתף עם חברים' : 'Share with friends'}
                        </Typography>
                        <div className="share-icons-container">
                            <FacebookShareButton
                                url={window.location.href}>
                                <FacebookIcon size={45} round className="icon" />
                            </FacebookShareButton>
                            <FacebookMessengerShareButton
                                appId="472443117195729"
                                url={window.location.href}>
                                <FacebookMessengerIcon size={45} round className="icon" />
                            </FacebookMessengerShareButton>
                            <WhatsappShareButton
                                url={window.location.href}>
                                <WhatsappIcon size={45} round className="icon" />
                            </WhatsappShareButton>
                            <TelegramShareButton
                                url={window.location.href}>
                                <TelegramIcon size={45} round className="icon" />
                            </TelegramShareButton>
                            <LinkedinShareButton
                                url={window.location.href}>
                                <LinkedinIcon size={45} round className="icon" />
                            </LinkedinShareButton>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
            <div className="footer">
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h6">
                        This business card generated by <Link to='/' className="link">Get a</Link>
                    </Typography>
                </MuiThemeProvider>
            </div>
        </div>
        : 
        <div className="page-404-container">
            <h1>Oops!</h1>
            <h3>404 - page not found</h3>
            <p>The business card you were looking for doesn't exists.</p>
            <Button 
                variant="contained"
                component={Link}
                to='/'
                className="button">Go Home</Button>
        </div>
    ) : <LoadingAnimation />
}
