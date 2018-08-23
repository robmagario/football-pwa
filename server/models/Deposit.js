const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema({
  user: {
    type: String,
    default: ''
  },
  amount:{
    type:Number,
    default:0
  },
  advice:{
    type:String,
    default:''
  },
  confirmed:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model('Deposit', DepositSchema);
