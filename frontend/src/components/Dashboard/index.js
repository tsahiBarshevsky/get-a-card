import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../firebase';

// const styles = makeStyles({
// 	select:
//     {
//         width: 120,
// 		borderRadius: 5,
//         height: 40,
//         paddingLeft: 10,
//         color: 'black',
// 		border: '1px solid #c0c0c0',
// 		backgroundColor: 'transparent',
//         fontFamily: '"Nunito", sans-serif'
//     },
//     input:
// 	{
//         borderRadius: 5,
//         height: 45,
// 		color: 'black',
// 		border: '1px solid #c0c0c0',
// 		backgroundColor: 'transparent',
// 		fontFamily: '"Nunito", sans-serif',
// 	}
// });

export default function Dashbaord(props) 
{
    const currentUser = firebase.getCurrentUsername();

    //protect the route
    if (!currentUser) {
        props.history.replace('/login');
        return null;
    }

    // const notify = (type, message) =>
    // {
    //     switch (type)
    //     {
    //         case 'success':
    //             toast.success(message);
    //             break;
    //         case 'error':
    //             toast.error(message);
    //             break;
    //         default: return null;
    //     }
    // }

    return (
        <div className="page-container">
            <div className="dashboard-container">
                <Typography>hey {currentUser}</Typography>
                <Link to="/add-card">Add card</Link>
                <Button onClick={() => logout()}>Logout</Button>
            </div>
            {/* <ToastContainer
                position="bottom-center"
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}
        </div>
    )

    function logout()
    {
        firebase.logout();
        props.history.replace('/');
    }
}
