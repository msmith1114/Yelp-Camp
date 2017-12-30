const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
//=========================
// Root Route
//=========================
router.get('/', function(req, res){
  res.render('landing')
})
//=========================
// Register
//=========================
router.get("/register", function(req, res){
   res.render("register", {page: 'register'});
});

router.post('/register', function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err)
    {
      return res.render('register', {'error': err.message})
    }
    passport.authenticate('local')(req, res, function(){
      req.flash('success', 'Welcome to YelpCamp ' + user.username)
      res.redirect('/campgrounds')
    })
  })
})
//=========================
// Login
//=========================
router.get("/login", function(req, res){
   res.render("login", {page: 'login'});
});

router.post('/login', passport.authenticate('local',{
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}) ,function(req, res){
})
//=========================
// Logout
//=========================
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', "Logged you out!")
  res.redirect('/');
})
//=========================
//
//=========================

module.exports = router
