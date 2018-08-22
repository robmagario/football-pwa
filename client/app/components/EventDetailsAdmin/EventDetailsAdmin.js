import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timestamp from "react-timestamp";
import 'whatwg-fetch';
import {getOptions} from "../../actions/eventoptions.actions";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';


class EventDetailsAdmin extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,

    };
  }
  componentWillMount(){
    this.props.getOptions(location.pathname.split("/")[1]);
  }


  render(){
  const { router, params, location, routes } = this.props;
    this.handleClickOpen = () => {
      this.setState({ open: true });
    };

    this.handleClose = () => {
      this.setState({ open: false });
    };
    this.handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };

    return(
        <div style={{width:"50%"}}>
          <ul>
            {this.props.optionsList.map(option=>
              <li>Name:{option.name} Win:{option.win} Loss:{option.loss} Amount:{option.amount}</li>
            )}          </ul>
          <div>
            <Button onClick={this.handleClickOpen} className="micro-button -accented ">Add a new option</Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              style={{height:"500px"}}
            >
              <DialogTitle id="form-dialog-title">Add a new option</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please add a new option here.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name of the option"
                  type="text"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Win"
                  type="number"
                  defaultValue="1.0"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Loss"
                  type="number"
                  defaultValue="1.0"
                  fullWidth
                />
                <FormControl fullWidth >
                  <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                  <Input
                    id="adornment-amount"
                    value={this.state.amount}
                    defaultValue="10000"
                    onChange={this.handleChange('amount')}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary">
                  Add new option
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )
    return(
      <div>Loading...</div>
    )
  }
}

function mapStateToProps(state,props){
  return{
    optionsList:state.options.optionsList,
    loading:state.upcomingevents.loading
  }
}
function mapDispatchToProps(dispatch){
  return{
    getOptions: bindActionCreators(getOptions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventDetailsAdmin);
