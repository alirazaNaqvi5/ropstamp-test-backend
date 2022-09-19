// create user model and schema for mongo db 

module.exports = mongoose => {
    const categories = mongoose.model(
      "categories",
      mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                unique: true,
                minlength: 3
            },

        },
        { timestamps: true }
      )
    );
  
    return categories;
  };