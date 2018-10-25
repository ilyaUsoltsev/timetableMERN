const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load profile model
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');


//@route  GET api/classes
//@desc   get user's profile
//@access private
router.get('/', passport.authenticate('jwt',{session:false}), (req,res)=>{
    const errors = {};
    Profile.findOne({user: req.user.id })
    .populate('users','schoolName') //sending user id and schoolName with profile json
    .then(profile =>{
        if(!profile){
            errors.noprofile = "нет такого профиля"
            return res.status(404).json(errors);
        } 
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route  post api/classes
//@desc  create or edit user's profile
//@access private
router.post('/', passport.authenticate('jwt',{session:false}), (req,res)=>{

    const {errors,isValid} = validateProfileInput(req.body);

    //check validation
    if(!isValid){
        //return errors
        return res.status(400).json(errors);
    }

    //get fields
    let profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.schoolName) profileFields.schoolName = req.body.schoolName;
    if(req.body.lessonsPerDay) profileFields.lessonsPerDay = req.body.lessonsPerDay;
    if(req.body.daysPerWeek) profileFields.daysPerWeek = req.body.daysPerWeek;

    Profile.findOne({user:req.user.id})
            .then(profile=>{
                //update
                if(profile){
                    Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
                    .then(profile=>res.json(profile));
                }else{ 
                    //create
                     //save profile
                     new Profile(profileFields).save().then(profile=>res.json(profile));
                }
            })
            .catch(err=>console.log(err));
});



module.exports = router;