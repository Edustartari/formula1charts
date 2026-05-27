import React, { memo, useState } from "react";
import { LinearProgress, Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const MenuComponent = () => {
  const [state, setState] = useState({
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
        <Link to='/others'>
          <ListItem key={'Others'} disablePadding>
            <ListItemButton>
              <ListItemText primary={'Others'} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      {/* <List>
                <ListItem key={'About'} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={'About'} />
                    </ListItemButton>
                </ListItem>
            </List> */}
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

const Menu = memo(MenuComponent)

export { Menu };