import React, { useState } from 'react';
import { Avatar, makeStyles, Typography } from '@material-ui/core';

const styles = makeStyles({
    avatar: 
    {
        width: 35,
        height: 35
    },
    letter:
    {
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: 600
    },
    logo:
    {
        color: 'white',
        fontFamily: `"Nunito", sans-serif`
    }
});

export default function Navbar({username}) 
{
    const [active, setActive] = useState(false)
    const classes = styles();

    const changeBackground = () =>
    {
        window.scrollY >= 30 ? setActive(true) : setActive(false);
    }

    window.addEventListener('scroll', changeBackground);

    return (
        <div className={active ? "dashboard-navbar active" : "dashboard-navbar"}>
            <Typography variant="h6" className={classes.logo}>Get a Card</Typography>
            <Avatar className={classes.avatar}>
                <Typography variant="h6" className={classes.letter}>
                    {username.charAt(0).toUpperCase()}
                </Typography>
            </Avatar>
        </div>
    )
}
