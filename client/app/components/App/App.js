import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import {withStyles} from "@material-ui/core/styles/index";
import classNames from "classnames";
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import {faFutbol} from '@fortawesome/free-solid-svg-icons'


library.add(faStroopwafel);
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex:1
  },
  appFrame: {
    height: 430,
    zIndex: theme.zIndex.drawer + 1,
    position: 'absolute',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fixed',

    backgroundColor: '#000000',
  },
  menuButton: {

    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    zIndex:1,
    position: 'relative',
    width: drawerWidth,
    backgroundColor: '#18211F',
    color: "#ffffff",
    fontFamily: 'Source Sans Pro',
    fontSize: 13,
    fontWeight: 500,
    minHeight: 40,

  },
  drawerHeader: {
    marginTop:'3vw',

  },
  list: {
    marginRight: '1.2rem',
    marginTop: '-.25rem',
    paddingLeft: '15px',
    display: 'inline-block',
  },
  fontawesomeicon: {
    marginLeft: '1.2rem',
    marginTop: '-.25rem',
    textAlign: 'center',
    width: '1.2rem',
    display: 'inline-block',
    textAlign: 'center',


  }

});

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchor: 'left',
    };

  }

  render() {

    this.handleDrawerOpen = () => {
      this.setState({open: true});
    };

    this.handleDrawerClose = () => {
      this.setState({open: false});
    };

    this.handleChangeAnchor = event => {
      this.setState({
        anchor: event.target.value,
      });
    };
    const {classes, theme} = this.props;
    const {anchor, open} = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>

        </div>
        <Divider/>
        <div className="group-label">Quick Links</div>

        <List>
          <div className={classes.fontawesomeicon}><FontAwesomeIcon icon={faFutbol}
                                                                    style={{width: '1.25rem', height: '1.25rem'}}/>
          </div>
          <div className={classes.list}>Futebol</div>
        </List>
        <Divider/>
        <List>
          <div className={classes.fontawesomeicon}><FontAwesomeIcon icon={faUsers}
                                                                    style={{width: '1.25rem', height: '1.25rem'}}/>
          </div>
          <div className={classes.list}>Política</div>
        </List>

      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {})}
          >
            <Toolbar disableGutters={!open}>
              <IconButton

                color="inherit"
                aria-label="Open drawer"
                onClick={(!open) ? this.handleDrawerOpen : this.handleDrawerClose}
                className={classNames(classes.menuButton, open)}
              >
                <MenuIcon/>
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Habudo
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main onClick={this.handleDrawerClose}


          >
            <div className={classes.drawerHeader}/>
            <Home/>
          </main>
          {after}
        </div>
      </div>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
