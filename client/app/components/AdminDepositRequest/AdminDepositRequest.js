import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timestamp from "react-timestamp";
import 'whatwg-fetch';
import {getDeposits} from "../../actions/admindeposit.actions";
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


class AdminDepositRequest extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      transid:'',
      depositid:''
    }
    this.confirmDeposit = this.confirmDeposit.bind(this);
  }

  componentWillMount(){
    this.props.getDeposits();
  }
  confirmDeposit(){
    const{transid,depositid}=this.state;
    fetch('/api/deposit/confirmdeposit?transID='+transid+'&depositID='+depositid,{method:'POST'})
      .then(res=>res.json(),error=>console.log(error))
      .then(json=>console.log(json.message));
    window.location.reload();
  }

  render(){
    const { router, params, location, routes } = this.props;

    this.handleClickOpen = () => {
      this.setState({ open: true });
    };
    this.setdeposit=(dep)=>{
      this.setState({depositid:dep});
      this.handleClickOpen();
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
          {this.props.depositList.map(deposit=>
            <li>User:{deposit.user} Amount:{deposit.amount} Transaction ID:{deposit.transactionID} Status:{deposit.status}
            {(deposit.status!=="Pending")?null:<Button onClick={()=>this.setdeposit(deposit._id)} className="micro-button -accented ">Confirm</Button>}</li>
          )}          </ul>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            style={{height:"500px"}}
          >
            <DialogTitle id="form-dialog-title">Confirm Deposit</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter transaction ID to complete confirmation
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={this.state.transid}
                onChange={this.handleChange('transid')}
                label="Transaction ID"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.confirmDeposit} color="primary">
                Confirm Deposit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );

  }
}

function mapStateToProps(state,props){
  return{
    depositList:state.deposits.depositList,
    loading:state.deposits.loading
  }
}
function mapDispatchToProps(dispatch){
  return{
    getDeposits: bindActionCreators(getDeposits, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminDepositRequest);
