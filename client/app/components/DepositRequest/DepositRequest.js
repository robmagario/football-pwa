import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserDeposits} from "../../actions/userdeposit.actions";
import {bindActionCreators} from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Webcam from 'react-webcam';

class DepositRequest extends Component{
  constructor(props) {
    super(props);
    this.state={
      amount:'',
      advice:'',
      open:false,
      loaded:false
    };


    this.getDeposits =this.getDeposits.bind(this);
    this.makeDeposit = this.makeDeposit.bind(this);
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({advice:imageSrc});
  };
  getDeposits(){
    this.props.getUserDeposits(this.props.currentUser._id);
    this.setState({loaded:true});
  }
  makeDeposit() {
    const {amount, advice} = this.state;
    fetch('/api/deposit/depositrequest?userid=' + this.props.currentUser._id + "&advice=" + advice + "&amount=" + amount, {method: 'POST'})
      .then(res => res.json(), error => console.log(error))
      .then(json => console.log(json.message));


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
    if(this.props.currentUser!==null){
      if(this.state.loaded===false){
        this.getDeposits();
        return(<div>Loading</div>);
      }
      else{
        return(
          <div>
            <ul>
            {this.props.userDepositList.map(deposit=>
            <li>Deposit ID: {deposit._id} Amount: {deposit.amount}  Advice:<img src="../../../../out.jpg"/> Status:{deposit.status}</li>
              )}
            </ul>
            <Button onClick={this.handleClickOpen} className="micro-button -accented ">Add Deposit</Button>
            <div>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                style={{height:"500px"}}
              >
                <DialogTitle id="form-dialog-title">Add Deposit</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please fill out details to make deposit
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    value={this.state.amount}
                    onChange={this.handleChange('amount')}
                    label="Deposit Amount"
                    type="Number"
                    fullWidth
                  />
                  <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/png"
                    width={350}

                  />
                  <button onClick={this.capture}>Capture photo</button>
                  <img src={this.state.advice}/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.makeDeposit} color="primary">
                    Confirm Deposit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        )
      }
    }
    return(
      <div>Please login to view this page</div>
    )
  }
}


function mapStateToProps(state,props){
  return{
    currentUser:state.verify.currentUser,
    userDepositList:state.userdeposits.userDepositList
  }
}
function mapDispatchToProps(dispatch){
  return{
    getUserDeposits:bindActionCreators(getUserDeposits,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DepositRequest);

