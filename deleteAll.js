const mongoose = require("mongoose");
const User = require("./models/user");      // adjust path if needed
const Listing = require("./models/listing"); // adjust path if needed

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // or your Atlas URL

mongoose.connect(MONGO_URL)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Delete all listings
    await Listing.deleteMany({});
    console.log("All listings deleted");

    // Delete all users
    await User.deleteMany({});
    console.log("All users deleted");

    mongoose.connection.close();
    console.log("Done!");
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
