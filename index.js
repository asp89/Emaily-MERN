const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const configKeys = require("./config/keys");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

// NOTE: Connect MongoDatabase.
mongoose.connect(configKeys.mongoURI);

// NOTE: Create Express App.
const app = express();

// NOTE: Cookie Session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// NOTE: Initialise passport
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running at ${PORT}`));
