require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const mongoose = require("mongoose");
const db = process.env.DATABASE_URI;
const secret = process.env.SECRET;
const PORT = process.env.PORT || 3000;
const app = express();
const signupRoute = require("./routes/api/signup");
const loginRoute = require("./routes/api/login");

require("./passport/index");

app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow the client app to access the server
    credentials: true, // Allow cookies/session to be sent from the client
  })
);

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false, // Don't create session until something stored
    cookie: {
      secure: false, // Requires https
      httpOnly: true, // Prevents client side JS from reading the cookie
      maxAge: 1000 * 60 * 60 * 24, // Cookie will live for 24H
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post("/signup", signupRoute);
app.post("/login", loginRoute);

// Database + Server Connection Validation
mongoose
  .connect(db)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database Connected!");
      console.log(`server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
