import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timestamp from "react-timestamp";
import 'whatwg-fetch';
import {getUpcoming} from "../../actions/upevent.actions";

class EventListAdmin extends Component {
  componentWillMount(){
    this.props.getUpcoming();
  }

  render(){
    if(!this.props.loading){
    return(
      <div>
        <ul>
        {this.props.upcomingList.map(events=>
          <li>Name:{events.name} Category:{events.category} Amount:{events.amount} <button>Click to view options</button></li>
        )}
        </ul>
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
