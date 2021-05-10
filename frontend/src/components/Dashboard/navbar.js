import React, { useState } from 'react';
import { Avatar, makeStyles, withStyles, Menu, ListItemIcon, ListItemText, MenuItem, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const styles = makeStyles({
    letter:
    {
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: 600
    },
    logo:
    {
        color: 'white',
        fontFamily: `"Nunito", sans-serif`,
        fontSize: 20
    },
    menuItem:
    {
        color: 'black',
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: 600
    }
});

const StyledMenu = withStyles(
{
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => 
(
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) =>
({
    root: 
    {
        backgroundColor: 'transpaernt',
        color: '#1a73e8',
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': 
        {
            color: theme.palette.common.black,
            fontFamily: `"Nunito", sans-serif`
        }
    },
}))(MenuItem);

function Navbar(props) 
{
    const [active, setActive] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = styles();

    const handleClick = (event) => 
    {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () =>
    {
        setAnchorEl(null);
    }

    const addNewCard = () =>
    {
        props.history.replace('/add-card');
    }

    const changeBackground = () =>
    {
        window.scrollY >= 30 ? setActive(true) : setActive(false);
    }

    window.addEventListener('scroll', changeBackground);

    return (
        <div className={active ? "dashboard-navbar active" : "dashboard-navbar"}>
            <p className={classes.logo}>Get a Card</p>
            <Avatar 
                className="avatar"
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <Typography variant="subtitle1" className={classes.letter}>
                    {props.username.charAt(0).toUpperCase()}
                </Typography>
            </Avatar>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                    <StyledMenuItem onClick={addNewCard}>
                        <ListItemIcon >
                            <AddRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="subtitle1" className={classes.menuItem}>
                                Add new card
                            </Typography>
                        </ListItemText>
                    </StyledMenuItem>
                    <StyledMenuItem onClick={props.logout}>
                        <ListItemIcon>
                            <ExitToAppRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="subtitle1" className={classes.menuItem}>
                                Logout
                            </Typography>
                        </ListItemText>
                    </StyledMenuItem>
            </StyledMenu>
        </div>
    )
}

export default withRouter(Navbar);