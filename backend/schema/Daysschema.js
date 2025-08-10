const mongoose = require('mongoose');
const day = new mongoose.Schema({
  text:{
    type:String,
    required:true,
  },
  day:{
    type:String,
    required:true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Register',
  }
});
const Day = mongoose.model('Day',day);
module.exports = Day