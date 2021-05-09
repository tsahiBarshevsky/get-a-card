import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';

const styles = makeStyles({
    title:
    {
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: 600,
        margin: '10px 0'
    }
})

export default function Card({cover, title, url}) 
{
    const classes = styles();

    return (
        <div className="display-card-container">
            <img src={cover} alt="cover" className="cover" />
            <Typography variant="h6" className={classes.title}>{title}</Typography>
            <div className="buttons-container">
                <Button className="button" variant="contained">Edit</Button>
                <Button className="button" variant="contained">Delete</Button>
            </div>
        </div>
    )
}
