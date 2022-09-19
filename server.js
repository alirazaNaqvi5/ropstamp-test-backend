// create a server with mongo db and express
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
const { authJwt } = require("./app/middlewares");

// allow http methods with request body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static folder in base directory uploads > cars
app.use('/uploads', express.static('uploads'));


app.use(cors());


const urlencoded = bodyParser.urlencoded({ extended: false })


const db = require("./app/models");


// connect to mongo db
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

// ============================== Unprotected Routes ==============================
// require('./app/routes/email.routes')(app);
require('./app/routes/auth.routes')(app);


// ============================== JWT token verification middleware configration ==============================
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


// ============================== Protected Routes =============================================================
require('./app/routes/categories.routes')(app);

require('./app/routes/cars.routes')(app);




app.listen(5000, () => {
    console.log('server is running on port 5000');
});