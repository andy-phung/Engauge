import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FileUpload from './FileUpload';
import '../Styles/Routes.css' 
import Reports from './Reports';

export default function Routes() {
    return(
        <Router>
            <div className="route-show">
                <Route path="/" render={() => <h1>Welcome!</h1>} />
                <Route exact path="/upload" component={FileUpload} />
                <Route exact path="/reports" component={Reports} />
            </div>
        </Router>
    )
}