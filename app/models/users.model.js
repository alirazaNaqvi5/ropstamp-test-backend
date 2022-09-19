// create user model and schema for mongo db 
// and validate user input


module.exports = mongoose => {
    const users = mongoose.model(
      "users",
      mongoose.Schema(
        {
            email: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                minlength: 3,
                validate: {
                    validator: function(v) {
                        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
                    },
                    message: props => `${props.value} is not a valid email!`
                }
            },
            password: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
            },
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                validate: {
                    validator: function(v) {
                        return /^[a-zA-Z ]{2,30}$/.test(v);
                    },
                    message: props => `${props.value} is not a valid name!`
                }
            },
            phone: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
            }
        },
        { timestamps: true }
      )
    );
  
    return users;
  };