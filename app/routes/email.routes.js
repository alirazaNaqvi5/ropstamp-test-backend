module.exports = app => {
    const email = require("../controllers/email.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", email.sendMail);





    
    app.use('/email', router);
  };