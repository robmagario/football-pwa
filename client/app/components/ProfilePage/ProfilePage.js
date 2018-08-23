import React, { Component} from 'react';
import {connect} from "react-redux";

class ProfilePage extends Component{
  render(){
    if(this.props.currentUser===null){
      return(
        <div>Loading...</div>
      )
    }
    return(
      <div>{this.props.currentUser.email}</div>
    )
  }
}
function mapStateToProps(state,props){
  return {
    currentUser: state.verify.currentUser
  }
}
function mapDispatchToProps(dispatch){
  return {
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);
