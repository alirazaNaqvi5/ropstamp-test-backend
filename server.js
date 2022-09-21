const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
const { authJwt } = require("./app/middlewares");

// prevent frontend to access cookies information
var session = require('express-session');
app.use(session({
  secret: "secret",
  cookie: {
      httpOnly: true,
      secure: true
  }
}))

// allow http methods with request body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static folder in base directory uploads > cars
app.use('/uploads', express.static('uploads'));

// allow cors to access api from any origin 
app.use(cors());

// ==============================================================================
// require db to establish connection to mongodb using mongoose 
// ==============================================================================


// require db from models folder to get mongoose connection to mongodb
const db = require("./app/models");


// connecting to mongo db using mongoose 
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });





// ==================================================================================

// ============================== Unprotected Routes ================================

//  all Auth routes [login , signup, ]
require('./app/routes/auth.routes')(app);



// ==================================================================================

// ================ JWT token verification middleware configration ==================


// access token is required to access these routes with parameter x-access-token in header
app.use(function (req, res, next) {
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});


// using token verification middleware to verify token
app.use([authJwt.verifyToken]);


// =============================================================================================================

//                                                    Protected Routes
//                                       car routes [get , create , update , delete]
//                                      category routes [get , create , update , delete]

// ============================================== Protected Routes =============================================

// all category routes [get , create , update , delete]
require('./app/routes/categories.routes')(app);

// all car routes [get , create , update , delete]
require('./app/routes/cars.routes')(app);

// =============================================================================================================


// set port, listen for requests
app.listen(5000, () => {
    console.log('server is running on port 5000');
});