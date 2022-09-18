// export mongodb connection string
// requre dotenv to access environment variables
 require('dotenv').config();

module.exports = {
    url: `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.mwnbz0e.mongodb.net/?retryWrites=true&w=majority`
};