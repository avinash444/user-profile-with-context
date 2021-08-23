import React from 'react';
import UserPage from './components/userDashBoard/UserPage'
import UserDetailsPage from "./components/userDetails/UserDetailsPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div className='container'>
                <Switch>
                    <Route path='/user-details/:id' component={UserDetailsPage} />
                    <Route exact path='/' component={UserPage}/>
                </Switch>
            </div>
        </Router>
    )

}

export default App;