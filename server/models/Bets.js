const mongoose = require('mongoose');
const BetsSchema = new mongoose.Schema({
  eventID: {
    type: String,
    default: ''
  },
  userID:{
    type:String,
    default:''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  status:{
    type:String,
    default:'Undetermined'
  },
  betAmount:{
    type:Number,
    default:0
  },

  currentOdds:{
    type:Number,
    default:0
  }

});
module.exports = mongoose.model('Bet', BetsSchema);
