// create a server with mongo db and express
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const cors = require('cors');

// allow http methods with request body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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


require('./app/routes/email.routes')(app);
require('./app/routes/auth.routes')(app);


app.listen(5000, () => {
    console.log('server is running on port 5000');
});