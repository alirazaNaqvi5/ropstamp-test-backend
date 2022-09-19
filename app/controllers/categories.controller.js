// get db parameters from models
const db = require("../models");
// get categories model from db parameters
const categories = db.categories;



//============================ get all categories =================================
exports.getAll = (req, res) => {
    // get all categories from db
    categories.find({})
    .then(data => {
        // send all categories to frontend
        res.status(200).send(data);
    })
    .catch(err => {
        // send error to frontend
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving categories."
        });
    });
};


//============================= update category by id ===============================
exports.update = (req, res) => {
    // get category id from frontend
    const id = req.body.id;
    // get category name from frontend
    const name = req.body.name;
    

    // update category by id
    categories.findByIdAndUpdate(id, {name: name})
    .then(data => {
       if (!data) {
            res.status(404).send({
                message: `Cannot update category with id=${id}. Maybe category was not found!`
            });
        } else {
            // send success message to frontend
            res.status(200).send({message: "Category updated successfully."});
        }
    })
    .catch(err => {
        // send error to frontend
        res.status(500).send({
            message:
            err.message || "Some error occurred while updating the category."
        });
    });
};

//================================== delete category by id ===============================
exports.delete = (req, res) => {
    // get category id from frontend
    const id = req.body.id;

    // delete category by id
    categories.findByIdAndRemove(id)
    .then(data => {
        if(!data) {
            res.status(404).send({
                message: `Cannot delete category with id=${id}. Maybe category was not found!`
            });
        } else {
            // send success message to frontend
            res.status(200).send({message: "Category deleted successfully."});
        }
    })
    .catch(err => {
        // send error to frontend
        res.status(500).send({
            message:
            err.message || "Some error occurred while deleting the category."
        });
    });
};

//================================= create category ========================================
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a category
    const category = new categories({
        name: req.body.name
    });

    // Save category in the database
    category
        .save(category)
        .then(data => {
            // send success message to frontend
            res.status(200).send({message: "Category created successfully."});
        })
        .catch(err => {
            // send error to frontend
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the category."
            });
        });
};

// =====================================================================
