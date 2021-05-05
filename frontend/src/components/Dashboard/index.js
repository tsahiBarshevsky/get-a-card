import React, { useState } from 'react';
import { Typography, Button, Input, Checkbox, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { scroller } from 'react-scroll';

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
    //const [palette, setPalette] = useState({primary: '', secondary: '', text: ''});
    const [langauge, setLanguage] = useState('');
    const [contact, setContact] = useState({
        telephoneValue: '',
        phoneValue: '',
        whatsappValue: '',
        emailValue: ''
    })
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

    const handleBack = () => 
    {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleReset = () => 
    {
        setActiveStep(0);
    }

    const handleCheckboxChange = (event) => 
    {
        setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
    }

    const checkURLAvailability = (url) =>
    {
        fetch(`/URL-availability?URL=${url}`)
        .then(res => res.json())
        .then(result => 
        {
            if (result)
            {
                handleNext();
                scroll('palette-selection');
            }
            else
                alert("Not available");
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
                    <Button disabled={URL === ''} variant="contained" onClick={() => checkURLAvailability(URL)}>Check</Button>
                </section>
                <section id="information">
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
