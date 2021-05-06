import React, { useState } from 'react';
import { Typography, Button, Input, Checkbox, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { scroller } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../firebase';

function getStepContent(step) 
{
    switch (step) {
        case 0:
            return 'Choose URL...';
        case 1:
            return 'Choose color palette...';
        case 2:
            return 'Fill information...';
        default:
            return 'Unknown step';
    }
}

export default function Dashbaord() 
{
    const [activeStep, setActiveStep] = useState(0);
    const [URL, setURL] = useState('');
    const [palette, setPalette] = useState({primary: '#f5f5f5', secondary: '#E45447', text: '#000000'});
    const [langauge, setLanguage] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [result, setResult] = useState('');
    const [disable, setDisable] = useState(false);
    const [images, setImages] = useState({
        main: '',
        cover: ''
    });
    console.log(images);
    const [progress, setProgress] = useState({
        main: 0,
        cover: 0
    });
    console.log(progress);
    const [contact, setContact] = useState({
        telephoneValue: '',
        phoneValue: '',
        whatsappValue: '',
        emailValue: ''
    });
    const [checkboxes, setCheckboxes] = useState({
        telephone: false,
        phone: false,
        whatsapp: false,
        email: false,
        facebook: false,
        instagram: false,
        linkedin: false,
        github: false,
        pinterest: false,
        youtube: false,
        tiktok: false
    });
    const [socialsLinks, setSocialsLinks] = useState({
        facebookLink: '',
        instagramLink: '',
        linkedinLink: '',
        githubLink: '',
        pinterestLink: '',
        youtubeLink: '',
        tiktokLink: ''
    });
    const { telephone, phone, whatsapp, email, facebook, instagram, linkedin, github, pinterest, youtube, tiktok } = checkboxes;
    const { facebookLink, instagramLink, linkedinLink, githubLink, pinterestLink, youtubeLink, tiktokLink } = socialsLinks;
    const { telephoneValue, phoneValue, whatsappValue, emailValue } = contact;
    const steps = ['Choose URL', 'Choose color palette', 'Fill information'];

    const handleNext = () => 
    {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    // const handleBack = () => 
    // {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // }

    const handleReset = () => 
    {
        setActiveStep(0);
    }

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
                scroll('information');
                notify('success', 'Default palette selected');
                handleNext();
                break;
            case 'dark':
                setPalette({primary: '#18191a', secondary: '#3a3b3c', text: '#e4e6eb'})
                scroll('information');
                handleNext();
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
                handleNext();
                setDisable(true);
                scroll('palette-selection');
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
					const uploadTask = firebase.storage.ref(`Images/main`).put(e.target.files[0]);
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
                            firebase.storage.ref("Images").child('main').getDownloadURL().then(
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
					const uploadTask = firebase.storage.ref(`Images/cover`).put(e.target.files[0]);
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
                            firebase.storage.ref("Images").child('cover').getDownloadURL().then(
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

    const submitCard = () =>
    {
        var socialsArray = [];
        socialsArray.push({ name: 'Facebook', show: facebook, link: facebookLink });
        socialsArray.push({ name: 'Instagram', show: instagram, link: instagramLink });
        socialsArray.push({ name: 'Linkedin', show: linkedin, link: linkedinLink });
        socialsArray.push({ name: 'Github', show: github, link: githubLink });
        socialsArray.push({ name: 'Pinterest', show: pinterest, link: pinterestLink });
        socialsArray.push({ name: 'Youtube', show: youtube, link: youtubeLink });
        socialsArray.push({ name: 'Tiktok', show: tiktok, link: tiktokLink });
        var contactArray = [];
        contactArray.push({ type: "Telephone", show: telephone, number: telephoneValue});
        contactArray.push({ type: "Phone", show: phone, number: phoneValue});
        contactArray.push({ type: "Whatsapp", show: whatsapp, number: whatsappValue});
        contactArray.push({ type: "Email", show: email, number: emailValue});
        fetch(`/insert-new-card`, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    URL: URL,
                    palette: palette,
                    langauge: langauge,
                    name: name,
                    type: type,
                    description: description,
                    address: address,
                    contact: contactArray,
                    socials: socialsArray,
                    images: images
                })
            }    
        )
        .then(res => res.json())
        .then(res => notify("success", res));
    }

    return (
        <div className="page-container">
            <div className="dashboard-container">
                <Stepper alternativeLabel activeStep={activeStep} className="stepper">
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <section id="url-selection">
                    <Input
                        id="URL"
                        placeholder="URL..."
                        margin="dense"
                        fullWidth
                        autoComplete="off"
                        value={URL} 
                        onChange={(e) => setURL(e.target.value)} />
                    <Button disabled={URL === '' || disable} variant="contained" onClick={() => checkURLAvailability(URL)}>Check</Button>
                </section>
                <section id="palette-selection">
                    <Grid container spacing={3} direction="row" justify="center" alignItems="flex-start">
                        <Grid item>
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
                        </Grid>
                        <Grid item>
                            <div className="palette" onClick={() => handlePaletteChange('dark')}>
                                <Typography variant="subtitle1">Dark palette</Typography>
                                <div className="colors">
                                    <div className="color">
                                        <Typography variant="subtitle2">Primary: #18191A</Typography>
                                        <div className="preview" style={{backgroundColor: '#18191a'}} />
                                    </div>
                                    <div className="color">
                                        <Typography variant="subtitle2">Secondary: #3A3B3C</Typography>
                                        <div className="preview" style={{backgroundColor: '#3a3b3c'}} />
                                    </div>
                                    <div className="color">
                                        <Typography variant="subtitle2">Text: #E4E6Eb</Typography>
                                        <div className="preview" style={{backgroundColor: '#e4e6eb'}} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </section>
                <section id="information">
                    <Typography variant="h6">Main image and cover</Typography>
                    <input
                        accept="image/*"
                        //style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={uploadMainImage} />
                    <input
                        accept="image/*"
                        //style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={uploadCoverImage} />
                    <Typography variant="h6">Language</Typography>
                    <FormControl>
                        {/* <InputLabel>Language</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={langauge}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Hebrew">Hebrew</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography variant="h6">Business details</Typography>
                    <div>
                        <Input
                            id="name"
                            placeholder="Name..."
                            margin="dense"
                            fullWidth
                            autoComplete="off"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} />
                        <Input
                            id="type"
                            placeholder="Type..."
                            margin="dense"
                            fullWidth
                            autoComplete="off"
                            value={type} 
                            onChange={(e) => setType(e.target.value)} />
                        <Input
                            id="description"
                            placeholder="Description..."
                            margin="dense"
                            fullWidth multiline
                            autoComplete="off"
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} />
                        <Input
                            id="address"
                            placeholder="Address..."
                            margin="dense"
                            fullWidth
                            autoComplete="off"
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <Typography variant="h6">Contact</Typography>
                    <div className="social">
                        <FormControlLabel
                            control={<Checkbox checked={telephone} onChange={handleCheckboxChange} color="primary" />}
                            label="Telephone"
                            name="telephone"
                        />
                        <Input
                            id="Telephone"
                            placeholder="Telephone number..."
                            type="tel"
                            margin="dense"
                            autoComplete="off"
                            disabled={!telephone}
                            value={telephoneValue}
                            onChange={(e) => setContact({ ...contact, telephoneValue: e.target.value })} />
                    </div>
                    <div className="social">
                        <FormControlLabel
                            control={<Checkbox checked={phone} onChange={handleCheckboxChange} color="primary" />}
                            label="Phone"
                            name="phone"
                        />
                        <Input
                            id="Phone"
                            placeholder="Phone number..."
                            type="tel"
                            margin="dense"
                            autoComplete="off"
                            disabled={!phone}
                            value={phoneValue}
                            onChange={(e) => setContact({ ...contact, phoneValue: e.target.value })} />
                    </div>
                    <div className="social">
                        <FormControlLabel
                            control={<Checkbox checked={whatsapp} onChange={handleCheckboxChange} color="primary" />}
                            label="Whatsapp"
                            name="whatsapp"
                        />
                        <Input
                            id="Whatsapp"
                            placeholder="Phone number..."
                            type="tel"
                            margin="dense"
                            autoComplete="off"
                            disabled={!whatsapp}
                            value={whatsappValue}
                            onChange={(e) => setContact({ ...contact, whatsappValue: e.target.value })} />
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
                            margin="dense"
                            autoComplete="off"
                            disabled={!email}
                            value={emailValue}
                            onChange={(e) => setContact({ ...contact, emailValue: e.target.value })} />
                    </div>
                    <Typography variant="h6">Social media</Typography>
                    <div className="social">
                        <FormControlLabel
                            control={<Checkbox checked={facebook} onChange={handleCheckboxChange} color="primary" />}
                            label="Facebook"
                            name="facebook"
                        />
                        <Input
                            id="Facebook URL"
                            placeholder="Facebook URL..."
                            margin="dense"
                            autoComplete="off"
                            disabled={!facebook}
                            value={facebookLink}
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
                            margin="dense"
                            autoComplete="off"
                            disabled={!instagram}
                            value={instagramLink}
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
                            margin="dense"
                            autoComplete="off"
                            disabled={!linkedin}
                            value={linkedinLink}
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
                            margin="dense"
                            autoComplete="off"
                            disabled={!github}
                            value={githubLink}
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
                            margin="dense"
                            autoComplete="off"
                            disabled={!pinterest}
                            value={pinterestLink}
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
                            margin="dense"
                            autoComplete="off"
                            disabled={!youtube}
                            value={youtubeLink}
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
                            margin="dense"
                            autoComplete="off"
                            disabled={!tiktok}
                            value={tiktokLink}
                            onChange={(e) => setSocialsLinks({ ...socialsLinks, tiktokLink: e.target.value })} />
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
            </div>
        </div>
    )
}
