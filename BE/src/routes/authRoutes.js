const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const loginValidation = require('../validators/loginValidation');
const registerValidation = require('../validators/registerValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const {
    registerUser,
    loginUser,
    logoutUser,
} = require('../controllers/authController');

// POST /register - Register route
router.post('/register', registerValidation, registerUser);

// POST /login - Login route
router.post('/login', loginValidation, loginUser);

router.post('/logout',authMiddleware, logoutUser);

router.post
module.exports = router;
