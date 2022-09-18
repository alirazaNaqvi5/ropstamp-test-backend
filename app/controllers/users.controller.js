const bcrypt = require('bcrypt');
const db = require("../models");
const jwt = require('jsonwebtoken');
const users = db.users;

const nodemailer = require('nodemailer');
require('dotenv').config();


// creating helper function to send email to user

// first we need to create a transport object
// this is the object that will send the email
// we will use nodemailer to create the transport object
// =============================== EMAIL ===============================
const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: process.env.smtp_email,
        pass: process.env.smtp_pass,
    },
});


const sendMail = (email, password) => {
    
    const mailOptions = {
        from: 'ropstamp@test.com',
        to: email,
        subject: "ROPSTAMP - Email Verification AND Password Reset",
        text: "Thanks for signing up with ROPSTAMP. your login infor for test web designed by ALi Naqvi is EMAIL: " + email + " PASSWORD: " + password,
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Internal Error' });
        } else {
            // res.status(200).json({ message: 'Email sent successfully' });
            return password;
        }
    });
    return password;
}
// ====================================================================



// =============================== SIGNUP ===============================
// Create and Save a new user
exports.create = async (req, res) => {
    
    // Validate request
    if (!req.body.email || !req.body.name || !req.body.phone) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // send email to user and get the password
    var pass = (Math.random() + 1).toString(36).substring(2);
    


    // encrypt the password
    password = await bcrypt.hash(pass, 10);


    // Create a user
    const user = new users({
        email: req.body.email,
        password: password,
        name: req.body.name,
        phone: req.body.phone
    });

    // Save user in the database
    user
        .save(user)
        .then(async(data) => {
            // send email to user
            await sendMail(req.body.email, pass);
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};

// =====================================================================

//                     Login API code starts from here

// =============================== LOGIN ===============================


exports.login = async (req, res) => {
    // Validate request
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // find the user
    const user = await users.findOne({ email: req.body.email });

    if (!user) {
        res.status(400).send({ message: "User not found!" });
        return;
    }

    // check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        res.status(400).send({ message: "Invalid password!" });
        return;
    }

    // create a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    
    // send the token and user info to the client
    res.status(200).send({ token: token, user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone

    } });


}