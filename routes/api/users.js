const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//Load User Model
const User = require('../../models/User');

//@route  GET api/classes
//@desc   Testing
//@access Public
router.get('/', (req,res)=>{
    res.json({msg:"Users work"})
});

//@route  GET api/classes
//@desc   Register
//@access Public
router.post('/register', (req,res)=>{

    const {errors, isValid} =validateRegisterInput(req.body);

    //check validation
    if(!isValid){
        return res.status(400).json(errors);
        };

    User.findOne({email:req.body.email})
    .then(user =>{
        if(user){
            errors.email = 'Этот email уже занят'
            return res.status(400).json({errors});
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user=>res.json(user))
                    .catch(err=>console.log(err))
                })
            })
        };
    })
});

//@route  GET api/classes
//@desc   LoginUser / Return JWT token
//@access Public
router.post('/login', (req,res)=>{


    const {errors, isValid} =validateLoginInput(req.body);

    //check validation
    if(!isValid){
        return res.status(400).json(errors);
        };

    const email = req.body.email;
    const password = req.body.password;

    //Find by email
    User.findOne({email})
    .then(user => {
        //Check
        if(!user){
            errors.email = 'Пользователь не найден';
            return res.status(400).json(errors);
        }
        //Check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch){
                    //user matched
                    const payload = {id: user.id, name: user.name }; //payload create
                    //sign token
                    jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600},
                        (err,token) => {
                            res.json({
                                success:true,
                                token: 'Bearer '+ token
                            })
                        }
                    )
                }else{
                    errros.password = 'Неверный пароль'
                    return res.status(400).json(errors)
                }
            })
    })

});

//@route  GET api/users/current
//@desc   Return current user
//@access Private

router.get('/current', passport.authenticate('jwt',{session:false}),(req,res)=>
{
    res.json(req.user)
});


module.exports = router;