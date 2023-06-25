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

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function TemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
                <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
    <div>
        {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>
        </React.Fragment>
        ))}
    </div>
    );
}

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
        const home_desktop_menu_item_button = document.getElementById('home-desktop-menu-item-button');
        if(home_desktop_container_top < -(40)){
            // Get home-desktop-menu element and add class
            home_desktop_menu.style.position = 'fixed';
            home_desktop_menu.style.zIndex = 2;
            home_desktop_menu.style.backgroundColor = 'white';

            // Get home-desktop-menu-item element and add class
            home_desktop_menu_item_button.style.color = 'black';
            home_desktop_menu_item_button.style.margin = '0 20px 0 0';
            home_desktop_menu_item_button.style.fontWeight = '600';
            home_desktop_menu_item_button.style.border = '1px solid black';
            home_desktop_menu_item_button.style.backgroundColor = 'unset';

        } else {
            // Get home-desktop-menu element and add class
            home_desktop_menu.style.position = 'absolute';
            home_desktop_menu.style.zIndex = 2;
            home_desktop_menu.style.backgroundColor = 'transparent';
            
            // Get home-desktop-menu-item element and add class
            home_desktop_menu_item_button.style.color = '#454545';
            home_desktop_menu_item_button.style.margin = '60px 40px 0 0';
            home_desktop_menu_item_button.style.fontWeight = 'normal';
            home_desktop_menu_item_button.style.border = '1px solid #454545';
            home_desktop_menu_item_button.style.backgroundColor = 'rgba(0,0,0,0.4)';
        }
        home_desktop_menu.style.transition = 'all 0.3s ease';
        home_desktop_menu_item_button.style.transition = 'all 0.3s ease';
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
                        <div className='home-desktop-menu-item' id='home-desktop-menu-item'>
                            <div className='home-desktop-menu-item-button' id='home-desktop-menu-item-button' onClick={() => this.handle_change('open_menu', true)}>
                                <TemporaryDrawer/>
                            </div>
                            {/* {this.state.open_menu &&
                                <div className='home-desktop-menu-list' id='home-desktop-menu-list'>
                                    <div className='home-desktop-menu-list-item'>
                                        <Link onClick={() => this.handle_change('open_menu', false)} to="/">Home</Link>
                                    </div>
                                    <div className='home-desktop-menu-list-item'>
                                        <Link onClick={() => this.handle_change('open_menu', false)} to="/all-seasons">All Seasons</Link>
                                    </div>
                                    <div className='home-desktop-menu-list-item'>
                                        <Link onClick={() => this.handle_change('open_menu', false)} to="/pilots">Pilots</Link>
                                    </div>
                                </div>
                            } */}
                        </div>
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