import React, { useState } from 'react';
import { Button, makeStyles, Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = makeStyles({
    title:
    {
        fontFamily: `"Nunito", sans-serif`,
        fontSize: 20,
        fontWeight: 600,
        color: 'white'
    }
})

export default function Card({cover, title, url, setUpdate}) 
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
        .then(res => res === 'OK' ? notify("success", `${title} deleted successfully`) : notify("error", 'An unexpected error occurred'));
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
                <Button className="button" variant="contained" id="edit">Edit</Button>
                <Button className="button" variant="contained" id="delete" onClick={() => setOpen(true)}>Delete</Button>
            </div>
            <Dialog open={open} onClose={handleClose} fullWidth disableBackdropClick>
                <DialogTitle>Delete card</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the drug {title}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteCard()} variant="contained">
                        Yes, delete
                    </Button>
                </DialogActions>
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
