module.exports = app => {
    const categories = require("../controllers/categories.controller.js");
    var router = require("express").Router();

    // get all categories
    router.get("/", categories.getAll);

    // update category by id
    router.put("/update", categories.update);

    // delete category by id
    router.delete("/delete", categories.delete);

    // create category
    router.post("/create", categories.create);



 
    app.use('/api/cat', router);
  };