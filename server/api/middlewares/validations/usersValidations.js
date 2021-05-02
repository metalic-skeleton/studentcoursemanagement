const { body } = require('express-validator')

exports.loginValidation = [
    body('username').trim().escape().exists().isLength({min: 3}),
    body('password').trim().escape().exists().isLength({min: 3})
]

exports.signupValidation = [
    body('firstname').trim().escape().exists().isLength({min: 2}).withMessage('must be at least 2 chars long'),
    body('lastname').trim().escape().exists().isLength({min: 2}).withMessage('must be at least 2 chars long'),
    body('username').trim().escape().exists().isLength({min: 5}).withMessage('must be at least 5 chars long'),
    body('password').trim().escape().exists().isLength({min: 5}).withMessage('must be at least 5 chars long')
]