import React, { useState, useEffect } from 'react';
import { Typography, Button, Input, Checkbox, FormControlLabel, InputLabel, FormControl, Select, MenuItem, Grid, InputAdornment, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { scroller } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { red, green } from '@material-ui/core/colors';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import { SocialLinks } from 'social-links';
import firebase from '../firebase';
import { withRouter } from 'react-router';

// function getStepContent(step) 
// {
//     switch (step) {
//         case 0:
//             return 'Choose URL...';
//         case 1:
//             return 'Choose color palette...';
//         case 2:
//             return 'Fill information...';
//         default:
//             return 'Unknown step';
//     }
// }

const styles = makeStyles({
	select:
    {
        width: 130,
		borderRadius: 5,
        height: 40,
        paddingLeft: 10,
        marginBottom: 20,
        color: 'black',
		border: '1px solid #c0c0c0',
		backgroundColor: 'transparent',
        fontFamily: '"Nunito", sans-serif'
    },
    label:
    {
        paddingLeft: 10,
        paddingTop: 3
    },
    input:
	{
        borderRadius: 5,
        height: 45,
		color: 'black',
		border: '1px solid #c0c0c0',
		backgroundColor: 'transparent',
		fontFamily: '"Nunito", sans-serif',
	},
    button:
    {
        height: 45,
        borderRadius: 5,
        fontSize: 15,
        margin: '0 5px',
        textTransform: 'capitalize',
        '@media (max-width: 600px)':
        {
            margin: '5px 0'
        }
    }
});

const theme = createMuiTheme({
    typography:
    {
        allVariants: { fontFamily: `"Nunito", sans-serif` },
        h5: { textDecoration: 'underline', fontWeight: 600, marginBottom: 20 },
        h6: { fontWeight: 600, marginBottom: 15 },
        subtitle1: { fontWeight: 600 },
        subtitle2: { fontWeight: 600 },
        caption: { fontSize: 16, fontWeight: 600, marginBottom: 20 },
        overline: { fontSize: 15, fontWeight: 600, textTransform: 'capitalize' }
    }
});

function AddCard(props) 
{
    const currentUser = firebase.getCurrentUsername();
    const socialLinks = new SocialLinks();
    const classes = styles();
    const [activeStep, setActiveStep] = useState(0);
    const [URL, setURL] = useState('');
    const [palette, setPalette] = useState({primary: '#f5f5f5', secondary: '#E45447', text: '#000000'});
    const [langauge, setLanguage] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    //const [waze, setWaze] = useState('');
    //const [disable, setDisable] = useState(false);
    const [images, setImages] = useState({
        main: '',
        cover: ''
    });
    const [progress, setProgress] = useState({
        main: 0,
        cover: 0
    });
    const [contact, setContact] = useState({
        telephoneValue: '',
        phoneValue: '',
        whatsappValue: '',
        telegramValue: '',
        emailValue: ''
    });
    const [checkboxes, setCheckboxes] = useState({
        telephone: false,
        phone: false,
        whatsapp: false,
        telegram: false,
        email: false,
        facebook: false,
        instagram: false,
        linkedin: false,
        github: false,
        pinterest: false,
        youtube: false,
        tiktok: false,
        dribbble: false
    });
    const [socialsLinks, setSocialsLinks] = useState({
        facebookLink: '',
        instagramLink: '',
        linkedinLink: '',
        githubLink: '',
        pinterestLink: '',
        youtubeLink: '',
        tiktokLink: '',
        dribbbleLink: ''
    });
    const { telephone, phone, whatsapp, telegram, email, facebook, instagram, linkedin, github, pinterest, youtube, tiktok, dribbble } = checkboxes;
    const { facebookLink, instagramLink, linkedinLink, githubLink, pinterestLink, youtubeLink, tiktokLink, dribbbleLink } = socialsLinks;
    const { telephoneValue, phoneValue, whatsappValue, telegramValue, emailValue } = contact;
    const steps = ['Choose URL', 'Choose color palette', 'Fill information'];
    const regex = { 
        url: /^[A-Za-z][A-Za-z0-9]*$/,
        telephone: /02|03|04|08|09[0-9]{7}/,
        phone: /050|051|052|053|054|055|058[0-9]{7}/,
        whatsapp: /972(50|51|52|53|54|55|58)[0-9]{7}/,
        telegram: /.*?\B\w{5,64}\b.*/gm,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    };

    useEffect(() => {
        document.title = 'Add new card | Get a Card ';
    }, []);

    //protect the route
    if (!currentUser) {
        props.history.replace('/login');
        return null;
    }

    console.log(images);

    const notify = (type, message) =>
    {
        switch (type)
        {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            default: return null;
        }
    }

    // if (progress.main === 100)
	// {
	// 	notify("success", "Main image uploaded successfully!");
	// 	setProgress({ ...progress, main: 0 });
	// }

    const handleNext = (currentStep) => 
    {
        switch (currentStep)
        {
            case 0:
                if (activeStep !== 1)
                {
                    setActiveStep(1);
                    scroll('palette-selection');
                }
                break;
            case 1:
                if (activeStep !== 2)
                {
                    setActiveStep(2);
                    scroll('information');
                }
                break;
            default: return null;
        }
    }

    // const handleBack = () => 
    // {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // }

    // const handleReset = () => 
    // {
    //     setActiveStep(0);
    // }

    const handleCheckboxChange = (event) => 
    {
        setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
    }

    const handlePaletteChange = (palette) =>
    {
        switch (palette)
        {
            case 'default':
                setPalette({primary: '#f5f5f5', secondary: '#E45447', text: '#000000'})
                notify('success', 'Default palette selected');
                handleNext(1);
                break;
            case 'dark':
                setPalette({primary: '#18191a', secondary: '#252c36', text: '#e4e6eb'})
                handleNext(1);
                notify('success', 'Dark palette selected');
                break;
            default: return null;
        }
    }

    const checkURLAvailability = (url) =>
    {
        fetch(`/URL-availability?URL=${url}`)
        .then(res => res.json())
        .then(result => 
        {
            if (result)
            {
                notify('success', 'URL is available');
                // handleNext();
                // setDisable(true);
                // scroll('palette-selection');
            }
            else
                notify('error', "URL isn't available");
        });
    }

    const scroll = (section) =>
    {
        scroller.scrollTo(section, 
        {
            duration: 1500,
            delay: 0,
            smooth: "easeInOutQuart"
        });
    }

    const uploadMainImage = (e) =>
	{
		if (e.target.files[0])
		{
			try 
			{	
				if (e.target.files[0].size < 10000000) //less then 10mb
				{
					// if (url !== '')
					// 	deleteImage(false);
					const uploadTask = firebase.storage.ref(`${currentUser}/main`).put(e.target.files[0]);
					uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            setProgress({ ...progress, main: progress })
                        },
                        (error) => {
                            console.log(error);
                            alert(error.message);
                        },
                        () => {
                            firebase.storage.ref(`${currentUser}`).child('main').getDownloadURL().then(
                                url => setImages({ ...images, main: url })
                            );
                        }
                    );
				}
				else
				{
					notify("error", "Image's size is bigger than 10mb!");
				}
			} 
			catch (error) 
			{
                notify('error', 'error');
				console.log(error.message);
			}
		}
	}

    const uploadCoverImage = (e) =>
	{
		if (e.target.files[0])
		{
			try 
			{	
				if (e.target.files[0].size < 10000000) //less then 10mb
				{
					// if (url !== '')
					// 	deleteImage(false);
					const uploadTask = firebase.storage.ref(`${currentUser}/cover`).put(e.target.files[0]);
					uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            setProgress({ ...progress, cover: progress })
                        },
                        (error) => {
                            console.log(error);
                            alert(error.message);
                        },
                        () => {
                            firebase.storage.ref(`${currentUser}`).child('cover').getDownloadURL().then(
                                url => setImages({ ...images, cover: url })
                            );
                        }
                    );
				}
				else
				{
					notify("error", "Image's size is bigger than 10mb!");
				}
			} 
			catch (error) 
			{
                notify('error', 'error');
				console.log(error.message);
			}
		}
	}

    async function submitCard()
    {
        const response = await fetch(`/waze-link?address=${address}`);
        var link = await response.json();
        console.log(typeof link);
        var socialsArray = [];
        socialsArray.push({ name: 'Facebook', show: facebook, link: facebookLink });
        socialsArray.push({ name: 'Instagram', show: instagram, link: instagramLink });
        socialsArray.push({ name: 'Linkedin', show: linkedin, link: linkedinLink });
        socialsArray.push({ name: 'Github', show: github, link: githubLink });
        socialsArray.push({ name: 'Pinterest', show: pinterest, link: pinterestLink });
        socialsArray.push({ name: 'Youtube', show: youtube, link: youtubeLink });
        socialsArray.push({ name: 'Tiktok', show: tiktok, link: tiktokLink });
        socialsArray.push({ name: 'Dribbble', show: dribbble, link: dribbbleLink });
        var contactArray = [];
        contactArray.push({ type: "Telephone", show: telephone, number: telephoneValue });
        contactArray.push({ type: "Phone", show: phone, number: phoneValue });
        contactArray.push({ type: "WhatsApp", show: whatsapp, number: whatsappValue });
        contactArray.push({ type: "Telegram", show: telegram, number: `https://t.me/${telegramValue}` });
        contactArray.push({ type: "Email", show: email, number: emailValue });
        fetch(`/insert-new-card`, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    owner: currentUser,
                    URL: URL,
                    palette: palette,
                    langauge: langauge,
                    name: name,
                    type: type,
                    description: description,
                    address: address,
                    waze: link,
                    contact: contactArray,
                    socials: socialsArray,
                    images: images
                })
            }    
        )
        .then(res => res.json())
        .then(res => 
        {
            notify("success", res);
            setTimeout(() => {
                props.history.replace('/dashboard');
            }, 5000);
        });
    }

    return (
        <div className="page-container">
            <div className="add-card-container">
                <MuiThemeProvider theme={theme}>
                    <Stepper alternativeLabel activeStep={activeStep} className="stepper">
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    <section id="url-selection">
                        <Typography variant="h5">Choose URL</Typography>
                        <Typography variant="caption">
                            The URL is used to identify your digital business card. <br />
                            It have to be one word that start with an English letter 
                            (uppercase or lowercase) and can contain numbers.
                        </Typography>
                        <div className="input">
                            <Input
                                id="URL"
                                placeholder="URL..."
                                autoComplete="off"
                                value={URL} 
                                className={classes.input}
                                disableUnderline
                                style={{ marginRight: 5 }}
                                inputProps={{ style: { marginLeft: 15 } }}
                                endAdornment=
                                {
                                    regex.url.test(URL) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                onChange={(e) => setURL(e.target.value)} />
                            <Button     
                                disabled={URL === ''} 
                                variant="contained" 
                                className={classes.button}
                                onClick={() => checkURLAvailability(URL)}>Check Availability</Button>
                            <Button 
                                variant="contained"
                                className={classes.button}
                                onClick={() => handleNext(0)}>Choose</Button>
                        </div>
                    </section>
                    <section id="palette-selection">
                        <Typography variant="h5">Choose Color Palette</Typography>
                        <div className="palettes-container">
                            <div className="palette" onClick={() => handlePaletteChange('default')}>
                                <Typography variant="subtitle1">Default palette</Typography>
                                <div className="colors">
                                    <div className="color">
                                        <Typography variant="subtitle2">Primary: #F5F5F5</Typography>
                                        <div className="preview" style={{backgroundColor: '#f5f5f5'}} />
                                    </div>
                                    <div className="color">
                                        <Typography variant="subtitle2">Secondary: #E45447</Typography>
                                        <div className="preview" style={{backgroundColor: '#E45447'}} />
                                    </div>
                                    <div className="color">
                                        <Typography variant="subtitle2">Text: #000000</Typography>
                                        <div className="preview" style={{backgroundColor: '#000000'}} />
                                    </div>
                                </div>
                            </div>
                            <div className="palette" onClick={() => handlePaletteChange('dark')}>
                                <Typography variant="subtitle1">Dark palette</Typography>
                                <div className="colors">
                                    <div className="color">
                                        <Typography variant="subtitle2">Primary: #18191A</Typography>
                                        <div className="preview" style={{backgroundColor: '#18191a'}} />
                                    </div>
                                    <div className="color">
                                        <Typography variant="subtitle2">Secondary: #3A3B3C</Typography>
                                        <div className="preview" style={{backgroundColor: '#252c36'}} />
                                    </div>
                                    <div className="color">
                                        <Typography variant="subtitle2">Text: #E4E6Eb</Typography>
                                        <div className="preview" style={{backgroundColor: '#e4e6eb'}} />
                                    </div>
                                </div>
                            </div>
                            <div className="palette" onClick={() => handlePaletteChange('dark')}>
                                {/* <Typography variant="subtitle1">Dark palette</Typography>
                                <div className="colors">
                                    <div className="color">
                                        <Typography variant="subtitle2">Primary: #18191A</Typography>
                                        <div className="preview" style={{backgroundColor: '#18191a'}} />
                                    </div>
                                    <div className="color">
                                        <Typography variant="subtitle2">Secondary: #3A3B3C</Typography>
                                        <div className="preview" style={{backgroundColor: '#252c36'}} />
                                    </div>
                                    <div className="color">
                                        <Typography variant="subtitle2">Text: #E4E6Eb</Typography>
                                        <div className="preview" style={{backgroundColor: '#e4e6eb'}} />
                                    </div>
                                </div> */}
                            </div>
                            <div className="palette" onClick={() => handlePaletteChange('dark')}>
                                {/* <Typography variant="subtitle1">Dark palette</Typography>
                                <div className="colors">
                                    <div className="color">
                                        <Typography variant="subtitle2">Primary: #18191A</Typography>
                                        <div className="preview" style={{backgroundColor: '#18191a'}} />
                                    </div>
                                    <div className="color">
                                        <Typography variant="subtitle2">Secondary: #3A3B3C</Typography>
                                        <div className="preview" style={{backgroundColor: '#252c36'}} />
                                    </div>
                                    <div className="color">
                                        <Typography variant="subtitle2">Text: #E4E6Eb</Typography>
                                        <div className="preview" style={{backgroundColor: '#e4e6eb'}} />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </section>
                    <section id="information">
                        <Typography variant="h5">Information About Your Bussiness</Typography>
                        {/* <Typography variant="h6">Main image and cover</Typography>
                        <input
                            accept="image/*"
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={uploadMainImage} />
                        {progress.main}
                        <input
                            accept="image/*"
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={uploadCoverImage} />
                        {progress.cover} */}
                        <Typography variant="h6">Language</Typography>
                        <Typography variant="caption">The language in which you want your card to be displayed</Typography>
                        <FormControl>
                            <InputLabel className={classes.label}>Language...</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={langauge}
                                className={classes.select}
                                disableUnderline
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Hebrew">Hebrew</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="h6">Business basic details</Typography>
                        <div className="basic-details">
                            <Input
                                id="name"
                                placeholder="Name..."
                                fullWidth
                                disableUnderline
                                className={classes.input}
                                inputProps={{ style: { marginLeft: 15 } }}
                                style={{ marginBottom: 10 }}
                                autoComplete="off"
                                value={name} 
                                onChange={(e) => setName(e.target.value)} />
                            <Input
                                id="type"
                                placeholder="Type..."
                                fullWidth
                                disableUnderline
                                className={classes.input}
                                inputProps={{ style: { marginLeft: 15 } }}
                                style={{ marginBottom: 10 }}
                                autoComplete="off"
                                value={type} 
                                onChange={(e) => setType(e.target.value)} />
                            <Input
                                id="description"
                                placeholder="Description..."
                                fullWidth multiline
                                disableUnderline
                                className={classes.input}
                                inputProps={{ style: { marginLeft: 15 } }}
                                style={{ marginBottom: 10 }}
                                autoComplete="off"
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} />
                            <Input
                                id="address"
                                placeholder="Address..."
                                fullWidth
                                disableUnderline
                                className={classes.input}
                                inputProps={{ style: { marginLeft: 15 } }}
                                style={{ marginBottom: 10 }}
                                autoComplete="off"
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <Typography variant="h6">Contact</Typography>
                        <Typography variant="caption">In what ways can people contact you?</Typography>
                        <Typography variant="overline">Traditional ways</Typography>
                        <div className="contact">
                            <FormControlLabel
                                control={<Checkbox checked={telephone} onChange={handleCheckboxChange} color="primary" />}
                                label="Telephone"
                                name="telephone"
                            />
                            <Input
                                id="Telephone"
                                placeholder="Telephone number..."
                                type="tel"
                                autoComplete="off"
                                disableUnderline
                                disabled={!telephone}
                                value={telephoneValue}
                                inputProps={{ maxLength: 9, style: { marginLeft: 10 } }}
                                endAdornment=
                                {
                                    regex.telephone.test(telephoneValue) && telephoneValue.length === 9 ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setContact({ ...contact, telephoneValue: e.target.value })} />
                        </div>
                        <div className="contact">
                            <FormControlLabel
                                control={<Checkbox checked={phone} onChange={handleCheckboxChange} color="primary" />}
                                label="Phone"
                                name="phone"
                            />
                            <Input
                                id="Phone"
                                placeholder="Phone number..."
                                type="tel"
                                autoComplete="off"
                                disableUnderline
                                disabled={!phone}
                                value={phoneValue}
                                inputProps={{ maxLength: 10, style: { marginLeft: 10 } }}
                                endAdornment=
                                {
                                    regex.phone.test(phoneValue) && phoneValue.length === 10 ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setContact({ ...contact, phoneValue: e.target.value })} />
                        </div>
                        <div className="contact">
                            <FormControlLabel
                                control={<Checkbox checked={whatsapp} onChange={handleCheckboxChange} color="primary" />}
                                label="WhatsApp"
                                name="whatsapp"
                            />
                            <Input
                                id="Whatsapp"
                                placeholder="International format phone number..."
                                type="tel"
                                autoComplete="off"
                                disableUnderline
                                disabled={!whatsapp}
                                value={whatsappValue}
                                inputProps={{ maxLength: 12, style: { marginLeft: 10 } }}
                                endAdornment=
                                {
                                    regex.whatsapp.test(whatsappValue) && whatsappValue.length === 12 ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setContact({ ...contact, whatsappValue: e.target.value })} />
                        </div>
                        <div className="contact">
                            <FormControlLabel
                                control={<Checkbox checked={telegram} onChange={handleCheckboxChange} color="primary" />}
                                label="Telegram"
                                name="telegram"
                            />
                            <Input
                                id="Telegram"
                                placeholder="Telegram username..."
                                type="tel"
                                autoComplete="off"
                                disableUnderline
                                disabled={!telegram}
                                value={telegramValue}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    regex.telegram.test(telegramValue) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setContact({ ...contact, telegramValue: e.target.value })} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={email} onChange={handleCheckboxChange} color="primary" />}
                                label="Email"
                                name="email"
                            />
                            <Input
                                id="Email"
                                placeholder="email address..."
                                type="email"
                                autoComplete="off"
                                disableUnderline
                                disabled={!email}
                                value={emailValue}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    regex.email.test(emailValue) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setContact({ ...contact, emailValue: e.target.value })} />
                        </div>
                        <Typography variant="overline">Social media</Typography>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={facebook} onChange={handleCheckboxChange} color="primary" />}
                                label="Facebook"
                                name="facebook"
                            />
                            <Input
                                id="Facebook URL"
                                placeholder="Facebook URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!facebook}
                                value={facebookLink}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('facebook', facebookLink) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setSocialsLinks({ ...socialsLinks, facebookLink: e.target.value })} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={instagram} onChange={handleCheckboxChange} color="primary" />}
                                label="Instagram"
                                name="instagram"
                            />
                            <Input
                                id="Instagram URL"
                                placeholder="Instagram URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!instagram}
                                value={instagramLink}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('instagram', instagramLink) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setSocialsLinks({ ...socialsLinks, instagramLink: e.target.value })} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={linkedin} onChange={handleCheckboxChange} color="primary" />}
                                label="Linkedin"
                                name="linkedin"
                            />
                            <Input
                                id="Linkedin URL"
                                placeholder="Linkedin URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!linkedin}
                                value={linkedinLink}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('linkedin', linkedinLink) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setSocialsLinks({ ...socialsLinks, linkedinLink: e.target.value })} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={github} onChange={handleCheckboxChange} color="primary" />}
                                label="Github"
                                name="github"
                            />
                            <Input
                                id="Github URL"
                                placeholder="Github URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!github}
                                value={githubLink}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('github', githubLink) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setSocialsLinks({ ...socialsLinks, githubLink: e.target.value })} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={pinterest} onChange={handleCheckboxChange} color="primary" />}
                                label="Pinterest"
                                name="pinterest"
                            />
                            <Input
                                id="Pinterest URL"
                                placeholder="Pinterest URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!pinterest}
                                value={pinterestLink}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    /^(http(s?):\/\/)?(www\.)?pinterest\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/.test(pinterestLink) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setSocialsLinks({ ...socialsLinks, pinterestLink: e.target.value })} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={youtube} onChange={handleCheckboxChange} color="primary" />}
                                label="Youtube"
                                name="youtube"
                            />
                            <Input
                                id="Youtube URL"
                                placeholder="Youtube URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!youtube}
                                value={youtubeLink}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('youtube', youtubeLink) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setSocialsLinks({ ...socialsLinks, youtubeLink: e.target.value })} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={tiktok} onChange={handleCheckboxChange} color="primary" />}
                                label="Tiktok"
                                name="tiktok"
                            />
                            <Input
                                id="Tiktok URL"
                                placeholder="Tiktok URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!tiktok}
                                value={tiktokLink}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('tiktok', tiktokLink) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setSocialsLinks({ ...socialsLinks, tiktokLink: e.target.value })} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={dribbble} onChange={handleCheckboxChange} color="primary" />}
                                label="Dribbble"
                                name="dribbble"
                            />
                            <Input
                                id="Dribbble URL"
                                placeholder="Dribbble URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!dribbble}
                                value={dribbbleLink}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('dribbble', dribbbleLink) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => setSocialsLinks({ ...socialsLinks, dribbbleLink: e.target.value })} />
                        </div>
                    </section>
                    <Button variant="contained" onClick={() => submitCard()}>Submit</Button>
                    <ToastContainer
                        position="bottom-center"
                        closeOnClick
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    {/* <div>
                        {activeStep === steps.length ? (
                        <div>
                            <Typography>
                                All steps completed - you're finished
                            </Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                        ) : (
                        <div>
                            <Typography>{getStepContent(activeStep)}</Typography>
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                                <Button variant="contained" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                        )}
                    </div> */}
                </MuiThemeProvider>
            </div>
        </div>
    )
}

export default withRouter(AddCard);