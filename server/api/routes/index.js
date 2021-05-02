const express = require("express")
const router = express.Router()

const { isAuth } = require("../middlewares/verifyToken")
const { loginValidation, signupValidation } = require("../middlewares/validations/usersValidations")

const { health } = require("../controllers/application")
const { getAllCourses } = require("../controllers/courses")
const { login, signup } = require("../controllers/users")

// Application
router.get("/", health)
router.get("/health", health)

router.get("/courses", isAuth, getAllCourses)

router.post("/login", loginValidation, login)
router.post("/signup", signupValidation, signup)

module.exports = router