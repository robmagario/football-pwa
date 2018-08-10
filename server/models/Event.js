const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  slug:{
    type:String,
    default:''
  },
  amount:{
    type:Number,
    default:10000
  },
  options:{
    type:Array,
    default:[]
  },
  category:{
    type:String,
    default:''
  }

});

module.exports = mongoose.model('Event', EventSchema);
