/* eslint-disable-next-line */
import React, { lazy, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isMobile } from 'react-device-detect';
import '../css/app.css';
/* eslint-disable-next-line */
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Menu } from './components/menu.js';
import Home from './pages/home.js';
const AllSeasons = lazy(() => import('./pages/all_seasons.js'));
const Season = lazy(() => import('./pages/season.js'));
const Pilots = lazy(() => import('./pages/pilots.js'));
const AllTime = lazy(() => import('./pages/all_time.js'));
const Constructors = lazy(() => import('./pages/constructors.js'));
const Others = lazy(() => import('./pages/others.js'));

import { LinearProgress } from '@mui/material';

const AppDesktop = () => {
  const change_menu = () => {
    // get app-desktop-container element and find the top position
    const home_desktop_container = document.getElementById('app-desktop-container');
    const home_desktop_container_top = home_desktop_container.getBoundingClientRect().top;
    const home_desktop_menu = document.getElementById('home-desktop-menu');
    const home_desktop_menu_item_button = document.getElementById('home-desktop-menu-item-button');
    if (home_desktop_container_top < -40) {
      home_desktop_menu.style.position = 'fixed';
      home_desktop_menu.style.zIndex = 2;
      home_desktop_menu.style.backgroundColor = 'white';

      home_desktop_menu_item_button.style.color = 'black';
      home_desktop_menu_item_button.style.margin = '0 20px 0 0';
      home_desktop_menu_item_button.style.fontWeight = '600';
      home_desktop_menu_item_button.style.border = '1px solid black';
      home_desktop_menu_item_button.style.backgroundColor = 'unset';
    } else {
      home_desktop_menu.style.position = 'absolute';
      home_desktop_menu.style.zIndex = 2;
      home_desktop_menu.style.backgroundColor = 'transparent';

      home_desktop_menu_item_button.style.color = '#454545';
      home_desktop_menu_item_button.style.margin = '60px 40px 0 0';
      home_desktop_menu_item_button.style.fontWeight = 'normal';
      home_desktop_menu_item_button.style.border = '1px solid #454545';
      home_desktop_menu_item_button.style.backgroundColor = 'rgba(0,0,0,0.4)';
    }
    home_desktop_menu.style.transition = 'all 0.3s ease';
    home_desktop_menu_item_button.style.transition = 'all 0.3s ease';
  }

  useEffect(() => {
    window.addEventListener('scroll', change_menu);
    return () => {
      window.removeEventListener('scroll', change_menu);
    };
  }, []);

  return (
    <div className='app-desktop-container' id='app-desktop-container'>
      <Router>
        <div className='home-desktop-menu' id='home-desktop-menu'>
          <div
            className='home-desktop-menu-item'
            id='home-desktop-menu-item'
          >
            <div className='home-desktop-menu-item-button' id='home-desktop-menu-item-button'>
              <Menu />
            </div>
          </div>
        </div>
        <Suspense fallback={
          <div className='linear-progress-bg'>
            <LinearProgress style={{ width: '50%' }} />
          </div>
        }>
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
            <Route path='/others'>
              <Others />
            </Route>
            <Route path='/:slug'>
              <Season />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

const AppMobile = () => {
  return <div>testing mobile</div>;
}

const App = isMobile ? AppMobile : AppDesktop;
export default App;

ReactDOM.render(<App />, document.getElementById('react-app'));