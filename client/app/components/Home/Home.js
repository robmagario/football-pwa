import React, { Component } from 'react';
import 'whatwg-fetch';
import{
  getFromStorage,setInStorage
} from "../../utils/storage";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token:'',
      signUpError:'',
      signInError:'',
      signInEmail:'',
      signInPassword:'',
      signUpFirstName:'',
      signUpLastName:'',
      signUpEmail:'',
      signUpPassword:''

    };
    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this);
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);
    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this);
    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this);
    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this);
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout= this.logout.bind(this);

  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if(obj&&obj.token){
      const {token} = obj;

      fetch('/api/account/verify?token='+token)
        .then(res=>res.json())
        .then(json=>{
          if(json.success){
            this.setState({
              token,
              isLoading:false
            });
          }else{
            this.setState({
              isLoading:false
            })
          }
        });
    }else{
      this.setState({
        isLoading:false
      });
    }
  }
  onSignIn(){
    const{
      signInEmail,
      signInPassword,
    }=this.state;

    this.setState({
      isLoading:true
    });

    fetch('api/account/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({

        email:signInEmail,
        password:signInPassword
      }),
    }).then(res=>res.json())
      .then(json=>{
        if(json.success){
          setInStorage('the_main_app',{token:json.token});
          this.setState({
            signInError:json.message,
            isLoading:false,
            signInEmail:'',
            signInPassword:'',
            token:json.token,
          });
        }else{
          this.setState({
            signInError:json.message,
            isLoading:false,
          });
        }
      });
  }
  onSignUp(){
    const{
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    }=this.state;

    this.setState({
      isLoading:true
    });

    fetch('api/account/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        firstName:signUpFirstName,
        lastName:signUpLastName,
        email:signUpEmail,
        password:signUpPassword
      }),
    }).then(res=>res.json())
      .then(json=>{
        if(json.success){
          this.setState({
            signUpError:json.message,
            isLoading:false,
            signUpEmail:'',
            signUpPassword:'',
            signUpFirstName:'',
            signUpLastName:'',
          });
        }else{
          this.setState({
            signUpError:json.message,
            isLoading:false,
          });
        }
      });
  }
  logout(){
    this.setState({
      isLoading:true,
    });
    const obj = getFromStorage('the_main_app');
    if(obj&&obj.token){
      const {token} = obj;

      fetch('/api/account/logout?token='+token)
        .then(res=>res.json())
        .then(json=>{
          if(json.success){
            this.setState({
              token:'',
              isLoading:false
            });
          }else{
            this.setState({
              isLoading:false
            })
          }
        });
    }else{
      this.setState({
        isLoading:false
      });
    }
  }
  onTextBoxChangeSignInEmail(event){
    this.setState({
      signInEmail:event.target.value,
    });
  }
  onTextBoxChangeSignInPassword(event){
    this.setState({
      signInPassword:event.target.value,
    });
  }
  onTextBoxChangeSignUpEmail(event){
    this.setState({
      signUpEmail:event.target.value,
    });
  }
  onTextBoxChangeSignUpFirstName(event){
    this.setState({
      signUpFirstName:event.target.value,
    });
  }
  onTextBoxChangeSignUpLastName(event){
    this.setState({
      signUpLastName:event.target.value,
    });
  }
  onTextBoxChangeSignUpPassword(event){
    this.setState({
      signUpPassword:event.target.value,
    });
  }

  render() {
    const{isLoading,token,signUpError,signInError,signInEmail,signInPassword,signUpFirstName, signUpLastName, signUpEmail,signUpPassword}=this.state;
    if(isLoading){
      return(<div><p>Loading...</p></div>);
    }
    if(!token){
      return(
        <div>
          <div>
            {
              {signInError}?(
                <p>{signInError}</p>
              ):(null)

            }
            <p>Sign In </p>
            <input type="email" placeholder="Email" onChange={this.onTextBoxChangeSignInEmail} value={signInEmail}/><br/>
            <input type="password" onChange={this.onTextBoxChangeSignInPassword} placeholder="Password" value={signInPassword}/><br/>
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <br/>
          <br/>
          <div>
            {
              {signUpError}?(
                <p>{signUpError}</p>
              ):(null)}
            <p>Sign Up</p>
            <input type="text" onChange={this.onTextBoxChangeSignUpFirstName} value ={signUpFirstName} placeholder="First Name"/><br/>
            <input type="text" onChange={this.onTextBoxChangeSignUpLastName} value ={signUpLastName} placeholder="Last Name"/><br/>
            <input type="email" onChange={this.onTextBoxChangeSignUpEmail} value ={signUpEmail} placeholder="Email"/><br/>
            <input type="password" onChange={this.onTextBoxChangeSignUpPassword} value ={signUpPassword} placeholder="Password"/><br/>
            <button onClick={this.onSignUp}>Sign Up</button>


          </div>
        </div>
      );
    }
    return (
      <>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>

      </>
    );
  }
}

export default Home;
