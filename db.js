const mongoose = require("mongoose");
require('dotenv').config();


const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

const url =
  `mongodb+srv://${username}:${password}@cluster0.xkolo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => console.log("Error: ", error));
};

// PPnke6XGIAttXHgb