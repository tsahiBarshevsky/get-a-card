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
                <Route exact path="/:URL" component={Card} />
            </Switch>
        </Router>
    ) : <div className="full-container">wait</div>
}
