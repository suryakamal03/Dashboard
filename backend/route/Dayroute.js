    const express = require('express');
    const router = express.Router();
    const {getDay,createDay,updateDay,deleteDay,} = require('../control/Daycontrol.js');
    const { protect } = require('../middleware/authmiddleware.js');
    router.route('/:day')
        .get(protect, getDay)
        .post(protect, createDay);
    router.route('/:id')
        .put(protect, updateDay)
        .delete(protect, deleteDay);
    module.exports = router;
