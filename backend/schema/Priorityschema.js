const mongoose = require('mongoose');
const priority = new mongoose.Schema({
  text:{
    type:String,
    required:true
  },
  completed:{
    type: Boolean,
    default: false,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'Register',
  }
});
const Priority = mongoose.model('Priority',priority);
module.exports = Priority