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
  transactionID:{
    type:String,
    default:''
  },

  status:{
    type:String,
    default:'Pending'
  }
});

module.exports = mongoose.model('Deposit', DepositSchema);
