/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const {User} = require('../models/User');
const {auth} = require('../middleware/auth');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
// const async = require('async');

// =================================
//             User
// =================================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'auctopus1010@gmail.com',
    pass: 'Auctopus123+',
  },
});

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post('/register', (req, res) => {
  const user = new User(req.body);
  console.log(user);
  const email_ = user.email;
  // crypto.randomBytes(32, (err, buffer)=>{
  //   if (err) {
  //     console.log(err);
  //   }
  //   const token = buffer.toString('hex');
  //   console.log(token);
  User.findOne({email: email_})
      .then((savedUser)=>{
        if (savedUser) {
          return res.status(422).json({error: 'user already exists with that email'});
        }
        user.save((err, doc) => {
          if (err) return res.json({success: false, err});
          transporter.sendMail({
            to: email_,
            from: 'auctopus1010@gmail.com',
            subject: 'Welcome',
            html: `
                     <p>Please confirm the mail by using the token below</p>
                     <h5>
                     Welcome to AUCTOPUS!!
                     </h5>
                     `,
          });
          return res.status(200).json({
            success: true,
          });
        });
      });
});

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({loginSuccess: false, message: 'Wrong password'});
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('w_authExp', user.tokenExp);
        res
            .cookie('w_auth', user.token)
            .status(200)
            .json({
              loginSuccess: true, userId: user._id,
            });
      });
    });
  });
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, {token: '', tokenExp: ''}, (err, doc) => {
    if (err) return res.json({success: false, err});
    return res.status(200).send({
      success: true,
    });
  });
});
router.post('/reset-password', (req, res) => {
  console.log(req.body);
  const email_ = req.body.email;
  crypto.randomBytes(32, (err, buffer)=>{
    if (err) {
      console.log(err);
    }
    const token = buffer.toString('hex');
    console.log(token);

    const expireToken = Date.now() + 3600000;
    User.findOneAndUpdate({email: email_}, {$set: {'resetToken': token}}, {$set: {'expireToken': expireToken}})
        .exec((err, result)=>{
          if (err) return req.status(400).send(err);
          // console.log(email_);

          transporter.sendMail({
            to: email_,
            from: 'auctopus1010@gmail.com',
            subject: 'password reset',
            html: `
                     <p>You requested for password reset</p>
                     <h5>
                     click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password
                     </h5>
                     `,
          });
          return res.status(200).json({success: true, message: 'check your email', result});
          // res.json({message: 'check your email'});
        });
  });
});


router.post('/new-password', (req, res)=>{
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({resetToken: sentToken})
      .then((user)=>{
        if (!user) {
          return res.status(422).json({error: 'Try again session expired'});
        }
        bcrypt.hash(newPassword, 12).then((hashedpassword)=>{
          user.password = hashedpassword;
          user.resetToken = undefined;
          user.expireToken = undefined;
          user.save().then((saveduser)=>{
            res.json({message: 'password updated success'});
          });
        });
      }).catch((err)=>{
        console.log(err);
      });
});


router.get('/getNameWithId/:id', (req, res) => {
  User.find({_id: req.params.id})
      .then((result) => {
        res.status(200).send(result[0].name);
      });
});


module.exports = router;
