const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require ('jsonwebtoken')

const User = require('../models/user')

//Router

router.post('/register' , (req,res,next) => {

  let newUser = new User({

    name : req.body.name,
    email : req.body.email,
    username : req.body.username,
    password : req.body.password
  })

  User.addUser(newUser , (err, user) => {
    if(err){
      res.json({ success: false  , msg: err})
    }else {
      res.json({ success: true  , msg: 'You been Register'})
    }

  })


});

//Authenticate
router.post('/authenticate' , (req,res,next) => {
  res.send('Authentication Page');
});

//Profile
router.get('/profile' , (req,res,next) => {
  res.send('Profile Page');
});

module.exports = router;
