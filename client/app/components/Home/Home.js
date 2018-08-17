import React, { Component } from 'react';
import EventListAdmin from "../EventListAdmin/EventListAdmin"
import 'whatwg-fetch';
import {connect} from 'react-redux';

class Home extends Component {

  render() {
    return (
      <div>
        {this.props.user.email}
      </div>
    );
  }
}
function mapStateToProps(state,props){
  return{
    user:state.user
  }
}
export default connect(mapStateToProps)(Home);
