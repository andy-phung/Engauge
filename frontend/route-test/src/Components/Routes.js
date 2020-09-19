import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

export default function Routes() {
    return(
        <Router>
            <div>
                <NavLink to="/here">Click here!</NavLink>
            <Route path="/" render={() => <h1>Welcome!</h1>} />
            <Route path="/here" render={() => <h1>Here!</h1>} />
            </div>
        </Router>
    )
}