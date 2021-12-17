const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const configKeys = require("./config/keys");
const keys = require("./config/keys");
const res = require("express/lib/response");
require("./models/User");
require("./services/passport");

// NOTE: Connect MongoDatabase.
mongoose.connect(configKeys.mongoURI);

// NOTE: Create Express App.
const app = express();

app.use(bodyParser.json());

// NOTE: Cookie Session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

// NOTE: Initialise passport
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("website/build"));

  const path = require("path");
  res.sendFile(path.resolve(__dirname, "website", "build", "index.html"));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running at ${PORT}`));
