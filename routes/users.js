const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require ('jsonwebtoken')
const config = require('../config/database')

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

//Authenticate Route

router.post('/authenticate' , (req,res,next) => {

const username = req.body.username;
const password = req.body.password;
// 
// console.log(User.getUserByUsername(username, callback()))

User.getUserByUsername(username , function (err,user){


if(err) throw err;
// If User not found
if(!user) {
  return res.json({success: false , msg: 'You not a User Son!'});
}

User.comparePassword(password, user.password, function (err, isMatch) {

if(err) throw err

if(isMatch) {

const token = jwt.sign({data:user}, config.secret, {
  expiresIn:604800
  // 1 week in milliseconds
});

// response to front end
res.json({
success: true,
token: 'JWT ' + token,
user: {
  //send user info without password
  id: user._id,
  name: user.name,
  username: user.username,
  email: user.email
}
})
} else {
return res.json({success: false , msg: 'You Been Drinking Again? Wrong Password'});
}})

})




});




//Profile
router.get('/profile' , (req,res,next) => {
  res.send('Profile Page');
});

module.exports = router;
