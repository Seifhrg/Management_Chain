var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware/errorMiddleware");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

var indexRouter = require("./routes/index");

const connectDB = require("./config/db");
const passport = require("passport");
const port = process.env.PORT;
connectDB();

var app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
/////////////inf////////////////////
app.use(
  "/api/operator/infrastructure",
  require("./routes/infrastructureRoutes")
);
/////////////////inf data////////
///////data Sfc///////////
app.use(
  "/api/operator/infrastructure/infrastructureData",
  require("./routes/infrastructure/infrastructureDataRoutes")
);

app.use("/api/customer/sfc", require("./routes/sfcRoutes"));

///////data Sfc///////////
app.use("/api/customer/sfc/sfcData", require("./routes/sfc/sfcDataRoutes"));

////////////////////////////

/* passport */
app.use(passport.initialize());
require("./security/passport")(passport);

app.use("/api", indexRouter);
app.use(errorHandler);
app.listen(port, () => console.log(`server started ${port}`));

module.exports = app;
