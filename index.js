const express = require("express");
const app = express();
const passport = require("passport");

var facebook = express.Router();
app.use("/", facebook);
require("./Auth/facebook")(app, passport);

app.listen(8013, () => {
  console.log("we are connescted 8013");
});
