import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timestamp from "react-timestamp";
import 'whatwg-fetch';

import {getUpcoming} from "../../actions/upevent.actions";
import {getOdds} from "../../actions/odds.actions";

class MatchList extends Component {
  componentWillMount(){
     this.props.getUpcoming();
  }
  render(){
    if(this.props.loading){
      return(
        <div><h1>Loading</h1></div>
      )
    }

    if(!this.props.loading){
    return(
      <div>
        {(!this.props.loading)?console.log("Hi"):null}
      <h1 style={{marginTop:"2vw"}}>Upcoming Events</h1>
        <ul>
          {this.props.upcomingList.map(events=>
            <li key={events.id}>{this.gettheodds()}Home:{events.home.name} Away:{events.away.name} Time: <Timestamp time={events.time} format={"full"}/></li>
          )}
        </ul>
      </div>

    )}
  }
}


function mapStateToProps(state,props){
  return{
    upcomingList:state.upcomingevents.upcomingList,
    loading:state.upcomingevents.loading,
    error:state.upcomingevents.error,
    odds: state.eventodds.odds
  }
}
function mapDispatchToProps(dispatch){
  return {
    getUpcoming: bindActionCreators(getUpcoming, dispatch),
    getOdds: bindActionCreators(getOdds,dispatch)
  }
}
export default connect (mapStateToProps,mapDispatchToProps)(MatchList);
