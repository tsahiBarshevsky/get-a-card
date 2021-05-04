import React, { useState } from 'react';
import { Typography, Button, Input } from '@material-ui/core';
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
