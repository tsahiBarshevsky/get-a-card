import React, { useState, useEffect } from 'react';
import { Paper, Button, FormControl, Input, InputAdornment } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import { MdEmail, FaLock, MdVisibility, MdVisibilityOff } from 'react-icons/all';
import firebase from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = theme => ({
	main: 
	{
		width: 'auto',
		height: 320,
		display: 'block',
		borderRadius: 10,
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		zIndex: 10,
		[theme.breakpoints.up(400 + theme.spacing(6))]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: 
	{
		height: 'fit-content',
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.2)',
		backgroundColor: 'white',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
	input:
	{
		color: 'black',
		border: '1px solid #c0c0c0',
		borderRadius: 5,
		backgroundColor: 'transparent',
        height: 45,
		fontFamily: '"Nunito", sans-serif',
	},
	submit: 
	{
		color: 'white',
		fontSize: 18,
		height: 40,
		borderRadius: 5,
		letterSpacing: 2,
		textTransform: 'capitalize',
		backgroundColor: '#1a535c',
		'&:hover':
		{
			backgroundColor: '#1a535c',
		}
	}
});

function Login(props) 
{
	const { classes } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		document.title = 'Get a card | Login';
	}, [])

	if (firebase.getCurrentUsername())
	{
		props.history.replace('/dashboard');
		return null;
	}

    const notify = (message) => 
    {
        toast.error(message);
    }

	return (
		<div className="form-container">
			<div className="left-section">
				<div className="smartphone">
					<div className="speaker" />
					<div className="camera" />
					hey
				</div>
			</div>
			<div className="right-section">
				<main className={classes.main}>
					<Paper className={classes.paper}>
						<div className="title">
							<h3>Login into your account</h3>
						</div>
						<form onSubmit={e => e.preventDefault() && false}>
							<FormControl margin="normal" required fullWidth>
								<Input 
									className={classes.input}
									autoFocus 
									disableUnderline
									autoComplete="off"
									id="email" name="email" 
									value={email}
									type="email"
									placeholder="Your email" 
									startAdornment=
										{<InputAdornment style={{marginLeft: 13}} position="start">
											<MdEmail />
										</InputAdornment>}
									onChange={e => setEmail(e.target.value)} />
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<Input 
									className={classes.input}
									disableUnderline
									autoComplete="off"
									name="password" id="password"
									type={showPassword ? 'text' : 'password'} 
									value={password} 
									placeholder="Password"
									startAdornment=
										{<InputAdornment style={{marginLeft: 13}} position="start">
											<FaLock />
										</InputAdornment>}
									endAdornment={
										<InputAdornment className="visibility" position="end"
											onClick={() => setShowPassword(!showPassword)}>
											{showPassword ? <MdVisibilityOff /> : <MdVisibility />}
										</InputAdornment>}
									onChange={e => setPassword(e.target.value)} />
							</FormControl>
							<div className="button-container">
								<Button variant="contained"
									type="submit" fullWidth
									className={classes.submit} 
									onClick={onLogin}>Login</Button>
							</div>
						</form>
					</Paper>
				</main>	
				<p className="caption">
					First time here? <Link to="/registartion" className="link">Create an account</Link>
				</p>
			</div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="toast"
            />
		</div>
	)

    async function onLogin() 
	{
		try 
		{
			await firebase.login(email, password);
			props.history.replace('/dashboard');
		} 
		catch(error) 
		{
			notify(error.message);
		}
	}
}

export default withRouter(withStyles(styles)(Login));