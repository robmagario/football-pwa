import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timestamp from "react-timestamp";
import 'whatwg-fetch';
import {getOptions} from "../../actions/eventoptions.actions";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class EventDetailsAdmin extends Component {
  componentWillMount(){
    this.props.getOptions(location.pathname.split("/")[1]);
  }


  render(){
  const { router, params, location, routes } = this.props

      return(
        <div>
          <ul>
            {this.props.optionsList.map(option=>
              <li>Name:{option.name} Win:{option.win} Loss:{option.loss} Amount:{option.amount}</li>
            )}          </ul>
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
