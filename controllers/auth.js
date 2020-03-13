const bcrypt = require('bcryptjs');
const User = require('../models/users');
const nodemailer = require('nodemailer');
const sendGrid = require('sendgrid-nodemailer-transport');
const crypto = require('crypto');

const { validationResult } = require('express-validator');

const transport = nodemailer.createTransport(
	sendGrid({
		auth: {
			api_key: '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'
		}
	})
);

exports.getloginRoute = (req, res) => {
	res.render('auth/login', { errorMessage: req.flash('error'), passMessage: req.flash('pass') });
};

exports.getsignUp = (req, res) => {
	// const isLoggedIn=(req.get("Cookie").split(";")[1].trim().split("=")[1])

	res.render('auth/sign-up', {
		errorMessage: req.flash('Error'),
		oldInput: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationErrors: []

	});
};

exports.postLogin = (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ username: username })
		.then((user) => {
			if (!user) {
				req.flash('error', 'Invalid username or password');
				console.log('User not found');
				return res.redirect('/login');
			}

			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						console.log('user logged in');
						req.session.isLoggedIn = true;
						req.session.user = user;
						req.session.save((err) => {
							console.log(err);
							return res.redirect('/');
						});
					} else {
						req.flash('pass', 'incorrect password');
						console.log('incorrect password');
						res.redirect('back');
					}
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.logOut = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};

exports.postSignUp = (req, res, next) => {
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email;
	let confirmPassword = req.body.confirmPassword;

	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		req.flash('Error', errors.array()[0].msg);
		return res.status(422).render('auth/sign-up', {
			errorMessage: req.flash('Error'),
			oldInput: {
				username: username,
				email: email,
				password: password,
				confirmPassword: confirmPassword,
			},
			validationErrors: errors.array()

		});
	}

	User.findOne({ username: username })
		.then((user) => {
			if (user) {
				console.log('user already exist');
				return res.redirect('/login');
			}

			bcrypt
				.hash(password, 12)
				.then((pass) => {
					const newUser = new User({
						username: username,
						password: pass,
						email: email
					});
					newUser
						.save()
						.then((user) => {
							console.log('new user registered');
							transport.sendMail({
								to: user.email,
								from: 'blogsapp@gmail.com',
								subject: 'testing',
								html: '<h2>' + 'Successfully signed up' + '</h2>'
							}),
								(err, res) => {
									if (err) {
										console.log(err);
									} else {
										console.log(res);
									}
								};
							res.redirect('/login');
						})
						.catch((err) => {
							console.log(err);
							console.log('user not registered');
						});
				})
				.catch((err) => {
					console.log(err);
					console.log('password not hashed');
				});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getReset = (req, res, next) => {
	res.render('auth/reset', { errorMessage: req.flash('error') });
};

exports.postReset = (req, res, next) => {
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err);
			return res.redirect('/reset');
		}

		const token = buffer.toString('hex');
		User.findOne({ email: req.body.email })
			.then((user) => {
				if (!user) {
					req.flash('error', 'no user with the email found');
					return res.redirect('/reset');
				}

				user.resetToken = token;
				user.resetTokenExpiration = Date.now() + 3600000;
				user
					.save()
					.then((user) => {
						res.redirect('/');
						transport.sendMail({
							to: req.body.email,
							from: 'blogsapp@gmail.com',
							subject: 'Reset password',
							html: `<p>Click this <a href="http://blogss-app.herokuapp.com/reset/${token}">link</a> to reset the password </p>
                    `
						});
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

exports.getNewPassword = (req, res, next) => {
	const token = req.params.token;
	User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
		.then((user) => {
			if (user) {
				res.render('auth/new-password', { userId: user._id, passwordToken: token });
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postNewPassword = (req, res, next) => {
	let newPassword = req.body.password;
	let passToken = req.body.passwordToken;
	let id = req.body.userId;

	User.findOne({ resetToken: passToken, resetTokenExpiration: { $gt: Date.now() }, _id: id })
		.then((user) => {
			bcrypt
				.hash(newPassword, 12)
				.then((hashedPassword) => {
					user.password = hashedPassword;
					user
						.save()
						.then((user) => {
							console.log('password updated');
							return res.redirect('/login');
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => {
			console.log(err);
		});
};
