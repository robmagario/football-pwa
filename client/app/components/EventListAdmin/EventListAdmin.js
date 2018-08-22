import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timestamp from "react-timestamp";
import 'whatwg-fetch';
import {getUpcoming} from "../../actions/upevent.actions";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EventListAdmin extends Component {
  componentWillMount(){
    this.props.getUpcoming();
    this.state = {
      open: false,
    };
  }





  render(){
    this.handleClickOpen = () => {
      this.setState({ open: true });
    };

    this.handleClose = () => {
      this.setState({ open: false });
    };
    if(!this.props.loading){
    return(
      <div style={{width:"50%"}}>
        <ul>
        {this.props.upcomingList.map(events=>
          <li>Name:{events.name} Category:{events.category} Amount:{events.amount}
            <a href={events.slug}>Click to view options</a></li>
        )}
        </ul>

      <div>
      <Button onClick={this.handleClickOpen} className="micro-button -accented ">Add new event</Button>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the event below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name of the event"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            type="number"
            defaultValue={10000}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      </div>
    )}
    return(
      <div>Loading...</div>
    )
  }
}

function mapStateToProps(state,props){
  return{
    upcomingList:state.upcomingevents.upcomingList,
    loading:state.upcomingevents.loading
  }
}
function mapDispatchToProps(dispatch){
  return{
    getUpcoming: bindActionCreators(getUpcoming, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventListAdmin);
