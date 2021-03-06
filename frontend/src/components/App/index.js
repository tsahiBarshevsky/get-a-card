import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.sass';
import firebase from '../firebase';
import Homepage from '../Homepage';
import Card from '../Card';
import Dashbaord from '../Dashboard';
import Registartion from '../Registartion';
import Login from '../Login';
import AddCard from '../Add Card';
import EditCard from '../Edit card';
import Page404 from '../Page 404';
import LoadingAnimation from '../Loading';

export default function App() 
{
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		});
	});

    return firebaseInitialized !== false ? (
        <Router>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/registartion" component={Registartion} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashbaord} />
                <Route exact path="/add-card" component={AddCard} />
                <Route exact path="/edit-card" component={Page404} />
                <Route exact path="/edit-card/:URL" component={EditCard} />
                <Route exact path="/:URL" component={Card} />
                <Route exact path="*" component={Page404} />
            </Switch>
        </Router>
    ) : <LoadingAnimation />
}
