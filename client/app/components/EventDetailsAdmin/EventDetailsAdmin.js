import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timestamp from "react-timestamp";
import 'whatwg-fetch';
import {getUpcoming} from "../../actions/upevent.actions";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class EventDetailsAdmin extends Component {
  componentWillMount(){
    this.props.getUpcoming();
  }

  render(){

      return(
        <div>
          <ul>

              <li>ddddddd</li>

          </ul>
        </div>
      )
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

export default connect(mapStateToProps,mapDispatchToProps)(EventDetailsAdmin);
