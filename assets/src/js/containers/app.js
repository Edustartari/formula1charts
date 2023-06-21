import React from 'react';
import {isMobile} from 'react-device-detect';
import '../../css/app.css';
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
        this.state = {
            open_menu: false,
        }

        this.change_menu = this.change_menu.bind(this);
        this.handle_change = this.handle_change.bind(this);
    }

    change_menu(){
        // get app-desktop-container element and find the top position
        const home_desktop_container = document.getElementById('app-desktop-container');
        const home_desktop_container_top = home_desktop_container.getBoundingClientRect().top;
        const home_desktop_menu = document.getElementById('home-desktop-menu');
        const home_desktop_menu_item = document.getElementById('home-desktop-menu-item');
        if(home_desktop_container_top < -(40)){
            // Get home-desktop-menu element and add class
            home_desktop_menu.style.position = 'fixed';
            home_desktop_menu.style.zIndex = 2;
            home_desktop_menu.style.backgroundColor = 'white';

            // Get home-desktop-menu-item element and add class
            home_desktop_menu_item.style.color = 'black';
            home_desktop_menu_item.style.margin = '0 20px 0 0';
            home_desktop_menu_item.style.fontWeight = '600';
            home_desktop_menu_item.style.border = '1px solid black';
        } else {
            // Get home-desktop-menu element and add class
            home_desktop_menu.style.position = 'absolute';
            home_desktop_menu.style.zIndex = 2;
            home_desktop_menu.style.backgroundColor = 'transparent';

            // Get home-desktop-menu-item element and add class
            home_desktop_menu_item.style.color = 'grey';
            home_desktop_menu_item.style.margin = '60px 40px 0 0';
            home_desktop_menu_item.style.fontWeight = 'normal';
            home_desktop_menu_item.style.border = '1px solid grey';
        }
        home_desktop_menu.style.transition = 'all 0.3s ease';
        home_desktop_menu_item.style.transition = 'all 0.3s ease';
    }

    handle_change(key, value){
        this.setState({[key]: value})
    }

    componentDidMount() {
        window.addEventListener('scroll', this.change_menu);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.change_menu);
    }

    render () {
        return (
            <div className='app-desktop-container' id='app-desktop-container'>
                <Router>
                    <div className='home-desktop-menu' id='home-desktop-menu'>
                        <div onClick={() => this.handle_change('open_menu', true)} className='home-desktop-menu-item' id='home-desktop-menu-item'>MENU</div>
                    </div>
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