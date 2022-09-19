// create user model and schema for mongo db 
// creating a model for cars 
module.exports = mongoose => {
    const cars = mongoose.model(
      "cars",
      mongoose.Schema(
        {
            category: {
                type: String,
                required: true,
                minlength: 3
            },
            title: {
                type: String,
                required: true,
                minlength: 3
            },
            color: {
                type: String,
                required: true,
                minlength: 3
            },
            model: {
                type: String,
                required: true,
                minlength: 3
            },
            make: {
                type: String,
                required: true,
                minlength: 3
            },
            registration_no: {
                type: String,
                required: true,
                minlength: 3,
                unique: true
            },
            image: {
                type: String,
                required: true,
                minlength: 3,
                validate: {
                    validator: function(v) {
                        return /^https?:\/\/.+\.(?:png|jpg|jpeg)$/.test(v);
                    },
                    message: props => `${props.value} is not a valid image url!`
                }
            },

        },
        { timestamps: true }
      )
    );
  
    return cars;
  };