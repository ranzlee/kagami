import * as express from "express";
import * as compression from "compression"; // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as mongo from "connect-mongo";
import * as flash from "express-flash";
import * as path from "path";
import * as mongoose from "mongoose";
import * as passport from "passport";
import expressValidator = require("express-validator");
import fs = require("fs");
import https = require("https");
//read .env.config variables
dotenv.config({ path: path.join(__dirname, ".env.config") });

//create mongo store
const MongoStore = mongo(session);

//read connection uri from config
const connectionUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || "";
console.log("Mongo connection URI: " + connectionUri);

//connect to mongo
mongoose.connect(connectionUri, { useMongoClient: true });
mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

//display environment variable (development or production)
console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);

//create express server
const app = express();

//if not production, setup webpack middleware for HMR and express detailed errors
if (process.env.NODE_ENV !== "production") {
  console.log(
    "development mode - using webpack-dev-middleware with HMR enabled"
  );
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const config = require("../webpack.dev.js");
  const compiler = webpack(config);
  // Tell express to use the webpack-dev-middleware and use the webpack.dev.js configuration file as a base.
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
  app.use(errorHandler());
}

//set the listener port from config or default to 3000
app.set("port", process.env.PORT || 3000);
//use compression
app.use(compression());
//use morgan logger
//TODO: perhaps this should be dev only! RESEARCH
app.use(logger("dev"));
//TODO: do we need this parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//TODO: what the hell is this
app.use(expressValidator());
//TODO: Research this session stuff
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "",
    store: new MongoStore({
      url: connectionUri,
      autoReconnect: true
    })
  })
);
//use passport for authentication
app.use(passport.initialize());
app.use(passport.session());
//use flash messages
//TODO: Research this
app.use(flash());
//TODO: what the hell is this
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
//TODO: I assume this is putting the request user in the response
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//set default options and default '/' root
app.use(
  "/",
  express.static(path.join(__dirname, "public"), {
    index: "index.html",
    maxAge: 31557600000
  })
);

//passport variables are in .env.config, so load the variables first
import * as passportConfig from "./config/passport";

//import controllers
import * as apiController from "./controllers/api";
import * as authenticationController from "./controllers/authentication";

//app routes
//test controller
app.get("/test/dummy", (req, res) => {
  res.send({ message: "Hello World!" });
});
//api controller
app.get(
  "/api/facebook",
  passportConfig.isAuthenticated,
  passportConfig.isAuthorized,
  apiController.getFacebook
);
//authentication controller
app.get(
  "/auth/facebook",
  authenticationController.redirectRootIfAuthenticated,
  authenticationController.authenticateFacebook()
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  authenticationController.authenticateFacebookCallback()
);

const privateKey = fs.readFileSync("key.pem");
const certificate = fs.readFileSync("certificate.pem");

https
  .createServer(
    {
      key: privateKey,
      cert: certificate
    },
    app
  )
  .listen(app.get("port"), () => {
    console.log(
      "  App is running at https://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });

module.exports = app;
