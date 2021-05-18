import React, { useState } from 'react';
import { Avatar, makeStyles, withStyles, Menu, ListItemIcon, ListItemText, MenuItem, Typography, Divider } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
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
        fontFamily: `"Anton", sans-serif`,
        fontSize: 20,
        textDecoration: 'none',
        textTransform: 'uppercase'
    },
    content:
    {
        color: '#c1c2c6',
        fontFamily: `"Nunito", sans-serif`,
    },
    menu:
    {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        marginRight: 10,
        cursor: 'default'
    },
    menuAvatar:
    {
        width: 50,
        height: 50,
        marginRight: 15,
        marginLeft: 6
    },
    userInfo:
    {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    menuItem:
    {
        color: 'white',
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: 600
    },
    divider:
    {
        width: '85%',
        backgroundColor: '#ffffff1A',
        transform: 'translateX(8%)',
        marginBottom: 15
    },
    icon:
    {
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        backgroundColor: '#3a3b3c'
    }
});

const StyledMenu = withStyles(
{
    paper: 
    {
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: '#252c36',
        border: '2px solid #3a3b3c'
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
        color: 'transparent',
        '&:hover':
        {
            backgroundColor: '#ffffff1A'
        },
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': 
        {
            color: theme.palette.common.white,
            fontFamily: `"Nunito", sans-serif`
        }
    },
}))(MenuItem);

function Navbar(props) 
{
    const [active, setActive] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = styles();

    const renderNumberOfCards = () =>
    {
        switch(props.cards)
        {
            case 0: return "Haven't added any cards yet";
            case 1: return "1 card";
            default: return `${props.cards} cards`;
        }
    }

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
            <Link to="/" className={classes.logo}>Get a Card</Link>
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
                    <div className={classes.menu}>
                        <Avatar className={classes.menuAvatar}>
                            <h2 className={classes.letter}>
                                {props.username.charAt(0).toUpperCase()}
                            </h2>
                        </Avatar>
                        <div className={classes.userInfo}>
                            <h4 className={classes.content}>
                                {props.username}
                            </h4>
                            <h5 className={classes.content}>
                                {renderNumberOfCards()}
                            </h5>
                        </div>
                    </div>
                    <Divider className={classes.divider} />
                    <StyledMenuItem onClick={addNewCard}>
                        <ListItemIcon>
                            <div className={classes.icon}>
                                <AddRoundedIcon fontSize="small" />
                            </div>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="subtitle1" className={classes.menuItem}>
                                Add new card
                            </Typography>
                        </ListItemText>
                    </StyledMenuItem>
                    <StyledMenuItem onClick={props.logout}>
                        <ListItemIcon>
                            <div className={classes.icon}>
                                <ExitToAppRoundedIcon fontSize="small" />
                            </div>
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