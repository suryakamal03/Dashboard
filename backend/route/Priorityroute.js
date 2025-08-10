const express = require('express');
const router = express.Router();
const {
    Get_User_Priority,
    Create_Priority,
    update_Priority,
    delete_Priority
} = require('../control/Prioritycontrol.js'); 
const { protect } = require('../middleware/authmiddleware.js');
router.route('/')
    .get(protect, Get_User_Priority)
    .post(protect, Create_Priority);
router.route('/:id')
    .put(protect, update_Priority)
    .delete(protect, delete_Priority);
module.exports = router;