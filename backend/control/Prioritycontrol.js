const mongoose = require('mongoose');
const Priority = require('../schema/Priorityschema.js');
const Register = require('../schema/Userschema');


const Get_User_Priority = async(req,res)=>{
  try{
  const User_Priority = await Priority.find({user: req.user._id});
  if(User_Priority.length > 0){
  res.status(200).json(User_Priority);
  }else{
    res.json({message:"THE USER DATA NOT FOUND"});
  }
  }catch(err){
    res.json({message:"THERE IS NO DATA"})
    console.log(err);
  }
}
const Create_Priority = async(req,res)=>{
  try{
  const {text} = req.body;
  if(!text){
    res.status(400).json({message:"Plz enter the Priority "});
  }
  const Add_Priority = await Priority.create({
      text: text,
      user: req.user._id,
  })
  res.status(201).json(Add_Priority);
}catch(err){
  res.status(500).json({message:"CANT CREATE A PRIORITY LIST"});
  console.log(err);
}
}
const update_Priority = async (req, res) => {
    try {
        const priority = await Priority.findById(req.params.id);

        if (!priority) {
            return res.status(404).json({ message: 'Priority not found' });
        }
        if (priority.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        priority.completed = !priority.completed;
        const updatedPriority = await priority.save();

        res.json(updatedPriority);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
const delete_Priority = async (req, res) => {
    try {
        const priority = await Priority.findById(req.params.id);

        if (!priority) {
            return res.status(404).json({ message: 'Priority not found' });
        }
        if (priority.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await priority.deleteOne(); 

        res.json({ message: 'Priority removed' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {Get_User_Priority,Create_Priority,update_Priority,delete_Priority};