require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const mongoose = require("mongoose");
const db = process.env.DATABASE_URI;
const secret = process.env.SECRET;
const PORT = process.env.PORT || 3000;
const app = express();
const signupRoute = require("./routes/api/signup");
const loginRoute = require("./routes/api/login");
const checkAuthRoute = require("./routes/api/checkAuth");
require("./passport/index");

app.use(express.json());
// Enable CORS
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow the client app to access the server
    credentials: true, // Allow cookies/session to be sent from the client
  })
);

const store = new MongoDBSession({
  uri: db,
  collection: "sessions",
});

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: store, // Don't create session until something stored
    cookie: {
      secure: false, // Requires https
      httpOnly: true, // Prevents client side JS from reading the cookie
      maxAge: 60000, // Cookie will live for 24H
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post("/signup", signupRoute);
app.post("/login", loginRoute);
app.get("/checkAuth", checkAuthRoute);
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
