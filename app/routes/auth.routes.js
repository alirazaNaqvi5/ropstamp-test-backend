module.exports = app => {
    const user = require("../controllers/users.controller.js");
    var router = require("express").Router();
    // Create a new user
    router.post("/signup", user.create);

    // login user
    router.post("/login", user.login);





    
    app.use('/api/auth', router);
  };