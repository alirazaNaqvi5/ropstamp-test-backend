// create user model and schema for mongo db 

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
                minlength: 3
            },
            password: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
            },
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
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