const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb://vaishalinile896:vaibhavi1027@ac-h0jbzen-shard-00-00.tjcwitb.mongodb.net:27017,ac-h0jbzen-shard-00-01.tjcwitb.mongodb.net:27017,ac-h0jbzen-shard-00-02.tjcwitb.mongodb.net:27017/?ssl=true&replicaSet=atlas-fy9xn5-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ChargeMate",
  {}
);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");

  // Start the server after the database connection is established
  app.listen(5038, () => {
    console.log("Server is running on port 3000");
  });
});

// creating Schema
const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  password: String,
  user_id: String,
  role: String,
});
// charging station schema
const chargingStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  hours: String,
  phone: String,
  emails: [String],
  coordinates: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  website: String,
  category: String,
  claimed: {
    type: Boolean,
    default: false,
  },
});

const bookingSchema = new mongoose.Schema({
  bk_id: String,
  user_id: String,
  st_id: String,
  completed: {
    type: Boolean,
    default: false,
  },
  slot: String,
  tr_id: String,
});
const transactionSchema = new mongoose.Schema({
  tr_id: String,
  user_id: String,
  st_id: String,
  completed: {
    type: Boolean,
    default: false,
  },
  amount: String,
  type: String,
  bk_id: String,
});
const ChargingStation = mongoose.model("Stations", chargingStationSchema);

// collection part
const User = mongoose.model("User", userSchema);

const Bookings = mongoose.model("Bookings", bookingSchema);
const Transactions = mongoose.model("Transactions", transactionSchema);

// Route to get stations
app.get("/Backend/test/stations", async (request, response) => {
  try {
    const stations = await ChargingStation.find({});
    response.json(stations);
  } catch (error) {
    console.error("Error fetching stations:", error);
    response.status(500).json({ error: error.message });
  }
});

app.get("/Backend/test/users", async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    console.error("Error fetching stations:", error);
    response.status(500).json({ error: error.message });
  }
});
