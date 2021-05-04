import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.sass';
import Homepage from '../Homepage';
import Card from '../Card';
import Dashbaord from '../Dashboard';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/dashboard" component={Dashbaord} />
                <Route exact path="/:URL" component={Card} />
            </Switch>
        </Router>
    )
}
