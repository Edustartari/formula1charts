import React from 'react';
import { isMobile } from 'react-device-detect';
import '../../css/app.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './home.js';
import AllSeasons from './all_seasons.js';
import Season from './season.js';
import Pilots from './pilots.js';
import AllTime from './all_time.js';
import Constructors from './constructors.js';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function Menu() {
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	});

	const toggleDrawer = (anchor, open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = anchor => (
		<Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
			<List className='home-desktop-menu-list'>
				<Link to='/'>
					<ListItem key={'Home'} disablePadding>
						<ListItemButton>
							<ListItemText primary={'Home'} />
						</ListItemButton>
					</ListItem>
				</Link>
				<Link to='/all-seasons'>
					<ListItem key={'All Seasons'} disablePadding>
						<ListItemButton>
							<ListItemText primary={'All Seasons'} />
						</ListItemButton>
					</ListItem>
				</Link>
				<Link to='/pilots'>
					<ListItem key={'Pilots'} disablePadding>
						<ListItemButton>
							<ListItemText primary={'Pilots'} />
						</ListItemButton>
					</ListItem>
				</Link>
				<Link to='/all-time'>
					<ListItem key={'All Time'} disablePadding>
						<ListItemButton>
							<ListItemText primary={'All Time'} />
						</ListItemButton>
					</ListItem>
				</Link>
				<Link to='/constructors'>
					<ListItem key={'Constructors'} disablePadding>
						<ListItemButton>
							<ListItemText primary={'Constructors'} />
						</ListItemButton>
					</ListItem>
				</Link>
			</List>
			<Divider />
			<List>
				<ListItem key={'About'} disablePadding>
					<ListItemButton>
						<ListItemText primary={'About'} />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<div>
			<React.Fragment key={'right'}>
				<Button onClick={toggleDrawer('right', true)}>MENU</Button>
				<Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
					{list('right')}
				</Drawer>
			</React.Fragment>
		</div>
	);
}

class AppDesktop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open_menu: false
		};

		this.change_menu = this.change_menu.bind(this);
		this.handle_change = this.handle_change.bind(this);
	}

	change_menu() {
		// get app-desktop-container element and find the top position
		const home_desktop_container = document.getElementById('app-desktop-container');
		const home_desktop_container_top = home_desktop_container.getBoundingClientRect().top;
		const home_desktop_menu = document.getElementById('home-desktop-menu');
		const home_desktop_menu_item_button = document.getElementById('home-desktop-menu-item-button');
		if (home_desktop_container_top < -40) {
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

	handle_change(key, value) {
		this.setState({ [key]: value });
	}

	componentDidMount() {
		window.addEventListener('scroll', this.change_menu);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.change_menu);
	}

	render() {
		return (
			<div className='app-desktop-container' id='app-desktop-container'>
				<Router>
					<div className='home-desktop-menu' id='home-desktop-menu'>
						<div
							className='home-desktop-menu-item'
							id='home-desktop-menu-item'
							onClick={() => this.handle_change('open_menu', true)}
						>
							<div className='home-desktop-menu-item-button' id='home-desktop-menu-item-button'>
								<Menu />
							</div>
						</div>
					</div>
					<Switch>
						<Route exact path='/'>
							<Home />
						</Route>
						<Route path='/all-seasons'>
							<AllSeasons />
						</Route>
						<Route path='/pilots'>
							<Pilots />
						</Route>
						<Route path='/all-time'>
							<AllTime />
						</Route>
						<Route path='/constructors'>
							<Constructors />
						</Route>
						<Route path='/:slug'>
							<Season />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}
class AppMobile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return <div>Edu testing mobile</div>;
	}
}
const app = isMobile ? AppMobile : AppDesktop;
export default app;
