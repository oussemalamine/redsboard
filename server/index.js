const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Enable CORS
app.use(cors());

// Database Connection
mongoose
  .connect(
    "mongodb+srv://superadmin:reddeadred2@atlascluster.qaabaa5.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// Single Admin Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  role: String,
  password: String,
  confirmation: String,
  validation: Boolean,
});

// Single Admin Model
const UserModel = mongoose.model("users", UserSchema);

// POST Request to get user's data and save it
app.post("/api/register", async (req, res) => {
  console.log("i'm alive");
  console.log("data ==> ", req.body);
  try {
    const { username, email, phone, role, password, confirmation } = req.body;
    // If Username exists return response to front "Username already exists";
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }
    // If Email exists return response to front "Email already exists";
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // If Phone Number exists return response to front "Phone Number already in use";
    const existingPhoneNumber = await UserModel.findOne({ phone });
    if (existingPhoneNumber) {
      return res.status(400).json({ error: "Phone Number already in use" });
    }
    // Create new user and give it data from req.body sent from front;
    const newUser = new UserModel({
      username,
      email,
      phone,
      role,
      password,
      confirmation,
      validation: false,
    });
    // Save the new user in database;
    const savedUser = await newUser.save();
    // If user is saved succeessfuly send response to front "Registration Succeeded, Welcome On Board!";
    res.status(200).send("Registration Succeeded, Welcome On Board!");
    console.log("Registered...");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Registration Failed!" });
  }
});

// Server Connection Validation
app.listen(PORT, () => {
  console.log("I'M ALIVE :D");
  console.log(`server is running on PORT: ${PORT}`);
});
