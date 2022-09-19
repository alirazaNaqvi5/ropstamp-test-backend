const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./users.model.js")(mongoose);
db.categories = require("./categories.model.js")(mongoose);
db.cars = require("./cars.model.js")(mongoose);

module.exports = db;