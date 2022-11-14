import React from 'react';
import {isMobile} from 'react-device-detect';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Home from './home.js';
import AllSeasons from './all_seasons.js';
import Season from './season.js';
import Pilots from './pilots.js';

class AppDesktop extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render () {
        return (
            <div>
                <Router>
                    {/* {path_location !== '/login' && <Header/>} */}
                    <Switch>
                        <Route exact path="/" >
                            <Home />
                        </Route>
                        <Route path="/all-seasons" >
                            <AllSeasons />
                        </Route>
                        <Route path="/pilots" >
                            <Pilots />
                        </Route>
                        <Route path="/:slug" >
                            <Season />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}
class AppMobile extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render () {
        return (
            <div>Edu testing mobile</div>
        )
    }
}
const app = isMobile ? AppMobile : AppDesktop
export default app;