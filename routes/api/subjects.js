const express = require('express');
const router = express.Router();

//@route  GET api/classes
//@desc   Testing
//@access Public
router.get('/', (req,res)=>{
    res.json({msg:"Subject work"})
});

module.exports = router;