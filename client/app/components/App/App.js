import React, { Component } from 'react';
import Main from '../Main';
import {bindActionCreators} from "redux";
import {signInUser, verifyUser} from "../../actions/user.actions";

import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import {withStyles} from "@material-ui/core/styles/index";
import classNames from "classnames";
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
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
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";




library.add(faStroopwafel);
const drawerWidth = 200;

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
    backgroundColor: "black",
  },
  appBar: {
    position: 'fixed',


    backgroundColor: '#000000',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
    marginTop:'6vw',
  },
  hide: {
    display: 'none',
  },
  flex: {
    flexGrow: 1,
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
  },
  button: {

    color: "#ffffff",
    backgroundColor: "#00b073",
    fontSize: "0.7rem",
    height: "0.7rem",
    letterSpacing: "0.1rem",

  },
  input: {
    display: 'none',
  },
  toolBar: {
    minHeight: '0.5rem',
  },

  content: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.default,
    backgroundColor: "black",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },


});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchor: 'left',
    };

  }
  componentWillMount(){
    const token = sessionStorage.getItem("jwtToken");
    if(!token||token===''){
      return;
    }
    this.props.verifyUser(token);
  }

  render(){

  this.logout=()=>{
  sessionStorage.clear();
  window.location.reload()
    };
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
        <a  href={"/members/login"}>
        <List>

          <div className={classes.fontawesomeicon}><FontAwesomeIcon icon={faFutbol}
                                                                    style={{width: '1.25rem', height: '1.25rem'}}/>
          </div>
          <div className={classes.list}>Futebol</div>

        </List>
        </a>

        <Divider/>
        <a  href={"/events"}>
        <List>

          <div className={classes.fontawesomeicon}><FontAwesomeIcon icon={faUsers}
                                                                    style={{width: '1.25rem', height: '1.25rem'}}/>
          </div>
          <div className={classes.list}>Política</div>
        </List>
        </a>


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
            className={classNames(classes.appBar, {})}>
            <Toolbar className={classes.toolBar} >
              <IconButton

                color="inherit"
                aria-label="Open drawer"
                onClick={(!open) ? this.handleDrawerOpen : this.handleDrawerClose}
                className={classNames(classes.menuButton, open)}
              >
                <MenuIcon/>
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.flex}>
                Habudo
              </Typography>
              {this.props.currentUser===null?<a style={{textDecoration:"none"}} href={"/members/login"}><Button variant="contained" className={classes.button} >Entrar</Button></a>:

                (<div>
                  <div className={classes.fontawesomeicon}><FontAwesomeIcon icon={faUser}
                                                                            style={{width: '1.25rem', height: '1.25rem'}}/>
                  </div> Account: {this.props.currentUser.bankAmount}<a style={{textDecoration:"none"}}>  <Button variant="contained" className={classes.button} onClick={this.logout} >Logout</Button></a></div>)
              }
            </Toolbar>
          </AppBar>
          {before}

            <main onClick={this.handleDrawerClose}
              className={classNames(classes.content, classes[`content-${anchor}`], {
                [classes.contentShift]: open,
                [classes[`contentShift-${anchor}`]]: open,
              })}
            >
            <div className={classes.drawerHeader} />
            <Main/>

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

function mapStateToProps(state,props){
  return{
    currentUser:state.verify.currentUser
  }
};
function mapDispatchToProps(dispatch){
  return{
    verifyUser:bindActionCreators(verifyUser,dispatch)
  }
}

export default  connect (mapStateToProps,mapDispatchToProps)(withStyles(styles, { withTheme: true })(App));
