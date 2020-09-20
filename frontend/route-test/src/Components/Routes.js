import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FileUpload from './FileUpload';
import '../Styles/Routes.css' 
import Reports from './Reports';

export default function Routes() {
    return(
        <Router>
            <div className="route-show">
                <Route exact path="/" render={
                    () => 
                    <>
                    <h1>Welcome!</h1>
                        <p style={{"font-size": "1.35em", "textAlign": "center"}}>
                        Upload a recording of your session through the upload tab.
                        <br /><br />
                        Then, wait for 15 seconds before heading over to the reports tab.
                        <br /><br />
                        Your session report will be available there!
                        </p>
                    </>
                } />
                <Route exact path="/upload" component={FileUpload} />
                <Route exact path="/reports" component={Reports} />
            </div>
        </Router>
    )
}