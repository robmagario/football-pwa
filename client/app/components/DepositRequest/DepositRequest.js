import React, {Component} from 'react';
import Webcam from 'react-webcam';

class DepositRequest extends Component{
  constructor(props){
    super(props);
    this.state={
      imagesrc:''
    };
  }
  setRef = webcam => {
    this.webcam = webcam;
  };
  capture =()=>{
    const imageSrc = this.webcam.getScreenshot();
    this.setState({imagesrc:imageSrc});
  };

  render(){
    return(
      <div>
      <Webcam  audio={false}
               height={350}
               ref={this.setRef}
               screenshotFormat="image/jpeg"
               width={350}
               />
      <button onClick={this.capture}>Capture photo</button>
        {(this.state.imagesrc!=='')?
          <img src={this.state.imagesrc} />:null}
      </div>
  );

  }
}
export default DepositRequest;
