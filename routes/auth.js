const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middleware/auth');
const { check, body } = require('express-validator');

router.get('/login', authController.getloginRoute);

router.post('/login', authController.postLogin);

router.get('/sign-up', authController.getsignUp);

router.post(
	'/sign-up',
	check('email').isEmail().withMessage('please enter a valid email'),
	body('password', 'Enter a alphanumeric password of mininmum 5 characters ').isLength({ min: 5 }).isAlphanumeric(),
	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('passwords dont match');
		}
		return true;
	}),
	authController.postSignUp
);

router.post('/log-out', authController.logOut);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
