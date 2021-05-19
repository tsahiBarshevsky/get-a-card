import React, { useState } from 'react';
import { Button, makeStyles, Dialog, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../firebase';

const styles = makeStyles({
    title:
    {
        fontSize: 20,
        fontWeight: 600,
        color: 'white',
        backgroundColor: '#252c36'
    },
    dialog:
    {
        color: 'white',
        backgroundColor: '#252c36',
    },
    paper: 
    { 
        borderRadius: 20, 
    },
    button:
    {
        width: 120,
        margin: 5,
        color: 'white',
        borderRadius: 10,
        textTransform: 'capitalize'
    }
});

const theme = createMuiTheme({
    typography:
    {
        allVariants: { fontFamily: `"Nunito", sans-serif` }
    }
})

export default function Card({cover, title, url, gallery, setUpdate}) 
{
    const [open, setOpen] = useState(false);
    const classes = styles();

    const handleClose = () =>
    {
        setOpen(false);
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

    function deleteCard()
    {
        fetch(`/delete-card?URL=${url}`)
        .then(res => res.json())
        .then(res => 
        {
            if (res === 'OK')
            {
                notify("success", `${title} deleted successfully`)
                firebase.deleteImages(url, gallery);
            }
            else
                notify("error", 'An unexpected error occurred')
        });
        handleClose();
        setUpdate(true);
    }

    return (
        <div className="display-card-container">
            <img src={cover} alt="cover" className="cover" />
            <Link to={`/${url}`} className="link" target="_blank">
                <h4 className={classes.title}>{title}</h4>
            </Link>
            <div className="buttons-container">
                <Button component={Link}
                    to={`/edit-card/${url}`} 
                    className="button" 
                    variant="contained" 
                    id="edit">Edit</Button>
                <Button className="button" variant="contained" id="delete" onClick={() => setOpen(true)}>Delete</Button>
            </div>
            <Dialog classes={{paper: classes.paper}} open={open} onClose={handleClose} fullWidth disableBackdropClick>
                <MuiThemeProvider theme={theme}>
                    <DialogTitle className={classes.title}>Delete card</DialogTitle>
                    <DialogContent className={classes.dialog}>
                        <DialogContentText style={{color: 'white'}}>
                            Are you sure you want to delete the card {title}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.dialog}>
                        <Button 
                            onClick={handleClose} 
                            className={classes.button} 
                            style={{backgroundColor: '#363d4d'}}
                            variant="contained">
                            Cancel
                        </Button>
                        <Button 
                            onClick={() => deleteCard()} 
                            className={classes.button} 
                            style={{backgroundColor: '#0a71e7'}}
                            variant="contained">
                            Yes, delete
                        </Button>
                    </DialogActions>
                </MuiThemeProvider>
            </Dialog>
            <ToastContainer
                position="bottom-center"
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
