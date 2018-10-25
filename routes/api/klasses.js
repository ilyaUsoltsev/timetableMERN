const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Klass = require('../../models/Klass');
const User = require('../../models/User');
const validateKlassesInput = require('../../validation/klasses');

//@route  api/klasses
//@desc  get all klasses for a given user
//@access private
router.get('/', passport.authenticate('jwt',{session:false}), (req,res)=>{
    const errors = {};
    Klass.find({user: req.user.id })
    .populate('users','schoolName') //sending user id and schoolName with profile json
    .then(klass =>{
        res.json(klass);
    })
    .catch(err => res.status(404).json(err));
});
//@route  api/klasses
//@desc  create a klass
//@access private
router.post('/', passport.authenticate('jwt',{session:false}), (req,res)=>{

    const {errors,isValid} = validateKlassesInput(req.body);

    //check validation
    if(!isValid){
        //return errors
        return res.status(400).json(errors);
    }

    //get fields
    let klassFields = {
        user: req.user.id,
        klassName: req.body.klassName,
        lessons: req.body.lessons
    };
    new Klass(klassFields).save().then(klass=>res.json(klass));

});

//@route  api/klasses
//@desc  update a klass
//@access private
router.post('/:id/edit', passport.authenticate('jwt',{session:false}), (req,res)=>{

    //get fields
    let klassFields = {
        user: req.user.id,
        klassName: req.body.klassName,
        lessons: req.body.lessons
    };

    Klass.findOneAndUpdate(req.params.id,klassFields,{new:true})
                    .then(klass=>res.json(klass))
                    .catch(err=>console.log(err));
});


module.exports = router;

