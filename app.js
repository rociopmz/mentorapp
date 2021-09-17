require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const cors = require("cors");

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable authentication using session + passport
app.use(
  session({
    secret: "irongenerator",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);

app.use(flash());
require("./passport")(app);

const index = require("./routes/index");
const authRoutes = require("./routes/auth");
const mentor_routes = require("./routes/mentor");
const mentee_routes = require("./routes/mentee");
const reviews_routes = require("./routes/reviews");

app.use("/api", index);
app.use("/api/auth", authRoutes);
app.use("/api/mentor", mentor_routes);
app.use("/api/mentee", mentee_routes);
app.use("/api/reviews", reviews_routes);

module.exports = app;
