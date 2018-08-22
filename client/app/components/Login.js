import React, { Component} from 'react';
import 'whatwg-fetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {signInUser,verifyUser} from "../actions/user.actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      signInEmail:'',
      signInPassword:'',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.showHide = this.showHide.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onLogout = this.onSignIn.bind(this);

  }
  showHide(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })
  }


  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;
    this.props.signInUser({signInEmail,signInPassword});
  }


  render() {
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    if (this.props.currentUser === null) {
      return (
        <div id="login-page">
          <div className=".form-page-header">
            <h1>Entrar</h1>
            <label htmlFor="login-form-email" className="field-label">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
              className="form-input"
            />
            <br/>
            <label htmlFor="login-form-password" className="field-label">Senha</label>


            <div className="inputbox"><span className="before"></span>
              <input
                type={this.state.type}
                placeholder="Password"
                value={signInPassword}
                onChange={this.onTextboxChangeSignInPassword}
                className="form-input"
              />
              <span className="password__show" onClick={this.showHide}>{this.state.type === 'input' ?
                <FontAwesomeIcon icon={faEye}
                                 style={{width: '1.25rem', height: '1.25rem'}}/> : <FontAwesomeIcon icon={faEyeSlash}
                                                                                                    style={{
                                                                                                      width: '1.25rem',
                                                                                                      height: '1.25rem'
                                                                                                    }}/>}</span>
            </div>
            <br/>
            <button className="micro-button -accented "
                    onClick={this.onSignIn}>Entrar {(this.props.user === null) ? null : this.props.user.email}</button>
          </div>
          <br/>
          <br/>

        </div>
      );
    }
    return(
      <div>      {this.props.currentUser.isAdmin?<p>Hi ADMIN</p>:null}
        Already Logged in!</div>
    )
  }
}
function mapStateToProps(state,props){
  return{
    user:state.user.user,
    loading:state.user.loading,
    currentUser:state.verify.currentUser
  }
};
function mapDispatchToProps(dispatch){
  return{
    signInUser: bindActionCreators(signInUser,dispatch),
  }
}
export default connect (mapStateToProps,mapDispatchToProps)(Login);
