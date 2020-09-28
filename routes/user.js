
const express = require('express');
const passport = require('passport');
const { check, body } = require('express-validator/check');


const authController = require('../controller/user');

const router = express.Router();

router.post('/signup', authController.postSignup);
module.exports = router;