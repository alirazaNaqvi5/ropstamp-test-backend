module.exports = app => {
    const cars = require("../controllers/cars.controller.js");
    var router = require("express").Router();

// =================================== Multer config for image upload ===================================
    // require Multer to upload files
    const multer = require('multer');
    // set multer disk storage engine
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/cars');
        },
        filename: (req, file, cb) => {
            // create new file name with extension
            cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });
    // set multer upload object
    const upload = multer({ storage: storage });
// =======================================================================================================


    // Create a new car in the database with multer image upload middleware
    router.post("/", upload.single('image') , cars.create);

    // Retrieve all cars from the database.
    router.get("/", cars.findAll);

    // get all cars by category name
    router.get("/category/:category", cars.findAllByCategory);

    // update car by id
    router.put("/update", cars.update);

    // delete car by id
    router.delete("/delete", cars.delete);



    
    app.use('/api/cars', router);
  };