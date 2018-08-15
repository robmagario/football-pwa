import React, { Component } from 'react';
import EventListAdmin from "./EventListAdmin/EventListAdmin"
import 'whatwg-fetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {
  getFromStorage,
  setInStorage,
} from './../utils/storage';
import {faUsers} from "@fortawesome/free-solid-svg-icons/index";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'password',
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      isitAdmin:false,
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);

    this.showHide = this.showHide.bind(this);
  }


  showHide(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false,
              isitAdmin:json.admin
            });
          } else {
            this.setState({
              isLoading: false,

            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
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

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
      isitAdmin
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
            isitAdmin:json.isAdmin
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div id="login-page">
          <div className=".form-page-header">
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <h1>Entrar</h1>
            <label htmlFor="login-form-email" className="field-label">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
              className="form-input"
            />
            <br />
            <label htmlFor="login-form-password" className="field-label">Senha</label>


            <div className="inputbox"><span className="before"></span>
              <input
                type={this.state.type}
                placeholder="Password"
                value={signInPassword}
                onChange={this.onTextboxChangeSignInPassword}
                className="form-input"
              />
              <span className="after">

                <span className="password__show" onClick={this.showHide}>{this.state.type === 'input' ? <FontAwesomeIcon icon={faEye}
                                                                                                                         style={{width: '1.25rem', height: '1.25rem'}}/> : <FontAwesomeIcon icon={faEyeSlash}
                                                                                                                                  style={{width: '1.25rem', height: '1.25rem'}}/>}</span>
            </span>
            </div>


            <br />
            <button className="micro-button -accented " onClick={this.onSignIn}>Entrar</button>
          </div>
          <br />
          <br />


        </div>
      );
    }

    return (
      <div>
        {(this.state.isitAdmin)?<EventListAdmin/>:<p>Hi User!</p>}
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Login;
