const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  win:{
    type:Number,
    default:0
  },
  loss:{
    type:Number,
    default:0
  },
  amount:{
    type:Number,
    default:10000
  },
  thumbnail:{
    type:String,
    default:''
  },
  isDisabled:{
    type:Boolean,
    default:false
  }

});

module.exports = mongoose.model('Option', OptionSchema);
