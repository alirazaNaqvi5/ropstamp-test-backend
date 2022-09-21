const db = require("../models");

// get cars model from db parameters
const cars = db.cars;

//===========================================================================

//============================ get all cars =================================

exports.findAll = (req, res) => {
    // get all cars from db
    cars.find({})
        .then(data => {
            // send all cars to frontend
            res.status(200).send(data);
        })
        .catch(err => {
            // send error to frontend
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cars."
            });
        });
};

//==============================================================================

//============================= update car by id ===============================

exports.update = (req, res) => {
    // get car id from frontend
    const id = req.body._id;
    // get car details from frontend
    const car = req.body;



    // update car by id
    cars.findByIdAndUpdate(id, car)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update car with id=${id}. Maybe car was not found!`
                });
            }
            else {
                // send success message to frontend
                res.status(200).send({ message: "Car updated successfully." });
            }
        })
        .catch(err => {
            // send error to frontend
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the car."
            });
        });
};


//===================================================================================

//================================== delete car by id ===============================

exports.delete = (req, res) => {
    // get car id from frontend
    const id = req.body.id;

    // delete car by id
    cars.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete car with id=${id}. Maybe car was not found!`
                });
            }
            else {
                // send success message to frontend
                res.status(200).send({ message: "Car deleted successfully." });
            }
        })
        .catch(err => {
            // send error to frontend
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the car."
            });
        });
};

//===============================================================================

//================================== create car =================================

exports.create = (req, res) => {
    // get car details from frontend
    const file = req.file.filename;
    const image = 'http://localhost:5000/uploads/cars/' + file;
    const car = req.body;

    // check if car already exists in db by registration number
    cars.findOne({ registration_no: car.registration_no })
        .then(data => {
            if (data) {
                // send error to frontend
                res.status(500).send({
                    message:
                        "Car already exists."
                });
            }
            else {


                // create car in db
                cars.create({
                    category: car.category,
                    title: car.title,
                    color: car.color,
                    model: car.model,
                    make: car.make,
                    registration_no: car.registration_no,
                    image: image
                })
                    .then(data => {
                        // send success message to frontend
                        res.status(200).send(data);
                    })
                    .catch(err => {
                        // send error to frontend
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the car."
                        });
                    });

            }
        })
       
};

//===========================================================================================

//================================== get car by category name ===============================

exports.findAllByCategory = (req, res) => {
    // get category name from frontend
    const category = req.params.category;

    // get all cars by category name
    cars.find({ category: category })
        .then(data => {
            // send all cars to frontend
            res.status(200).send(data);
        })
        .catch(err => {
            // send error to frontend
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cars."
            });
        });
};


// ============================================================================================