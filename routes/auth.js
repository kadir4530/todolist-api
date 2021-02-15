const router = require("express").Router();
const { required } = require("@hapi/joi");
const User = require("../models/userModel");
const { registerValidation, loginValidation } = require("./validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//REGISTER
router.post("/register", async (req, res) => {
    console.log(req.body);
    //Validate before save
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });

    //Checking if the user is already in the database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send({ message: "Email already exists" });

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id, message: user.userName + " kaydedildi" });
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }

});


//LOGIN
router.post("/login", async (req, res) => {
    console.log(req.body)
    //Validate Data
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    //Checkin if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: "Email is not found" });

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ message: "Invalid password" });


    //Create and assign a tokken
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    return res.header('auth-token', token).send({ token, message: "Logged in" });

});

module.exports = router;