import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timestamp from "react-timestamp";
import 'whatwg-fetch';
import {getUpcoming,createEvent} from "../../actions/upevent.actions";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EventListAdmin extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      name:'',
      category:'',
      amount:0,
    };
    this.onTextboxChangeName = this.onTextboxChangeName.bind(this);
    this.onTextboxChangeCategory = this.onTextboxChangeCategory.bind(this);
    this.onTextboxChangeAmount = this.onTextboxChangeAmount.bind(this);

    this.makeEvent = this.makeEvent.bind(this);
  }
  onTextboxChangeName(event){
    this.setState({
      name:event.target.value
    })
  }
  onTextboxChangeCategory(event) {
    this.setState({
      category: event.target.value
    })
  }

  onTextboxChangeAmount(event) {
    this.setState({
      amount: event.target.value
    })
  }
    componentWillMount(){
    this.props.getUpcoming();

  }
  makeEvent(){
    const{name,amount,category}=this.state;
    this.props.createEvent({name,amount,category});
    window.location.reload();
  }




  render(){
    const{
      name,
      category,
      amount
    }  =this.state;
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
        {this.props.currentUser===null?null:(this.props.currentUser.isAdmin?<Button onClick={this.handleClickOpen} className="micro-button -accented ">Add new event</Button>:null)}
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
            value={name}
            onChange={this.onTextboxChangeName}
            label="Name of the event"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={category}
            onChange={this.onTextboxChangeCategory}
            label="Category"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            value={amount}
            onChange={this.onTextboxChangeAmount}
            type="number"
            defaultValue={10000}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.makeEvent} color="primary">
            Create Event
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
    loading:state.upcomingevents.loading,
    currentUser:state.verify.currentUser
  }
}
function mapDispatchToProps(dispatch){
  return{
    getUpcoming: bindActionCreators(getUpcoming, dispatch),
    createEvent: bindActionCreators(createEvent, dispatch)

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventListAdmin);
