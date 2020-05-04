var express = require('express');

var passport = require('./passport');

var user = require('../controllers/userController');
var auth = require('../controllers/authController');

const userController = new user();
const authController = new auth();

var validate = require('express-validation');
var validation = require('./validation');

const router =  express.Router();

    /*
        -=Routes to users=-
     */
router.get('/api/v1/users', passport.authenticate("jwt", {session: false}), validate(validation.getUsers), userController.index);
router.post('/api/v1/users', passport.authenticate("jwt", {session: false}), validate(validation.postUser), userController.store);
router.get('/api/v1/users/:id', validate(validation.getUser), userController.show);
router.put('/api/v1/users/:id', validate(validation.putUser), userController.update);
router.delete('/api/v1/users/:id', validate(validation.deleteUser), userController.destroy);

/*
    -=Routes to authorisation=-
 */
router.post('/api/v1/auth/signin', authController.signin);
router.post('/api/v1/auth/token', authController.token);

module.exports = router;