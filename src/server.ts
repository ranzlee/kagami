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

//create express server
const app = express();

var Raven = require("raven");
// Must configure Raven before doing anything else with it
Raven.config('https://7284ce6e12634582bd9ed45a5efd9008:57ff2d00f5644a34901aae7e5e3c0a2d@sentry.io/264284').install();

// The request handler must be the first middleware on the app
app.use(Raven.requestHandler());

// The error handler must be before any other error middleware
app.use(Raven.errorHandler());

//if not production, setup webpack middleware for HMR and express detailed errors
if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const config = require("../webpack.dev.js");
  const compiler = webpack(config);
  // Tell express to use the webpack-dev-middleware and use the webpack.dev.js configuration file as a base.
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    })
  );
  app.use(webpackHotMiddleware(compiler));
  //app.use(errorHandler());
}

//set the listener port from config or default to 3000
app.set("port", process.env.PORT || 3000);
//use compression
app.use(compression());
//use morgan logger
//TODO: perhaps this should be dev only! RESEARCH
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//TODO: what the hell is this
app.use(expressValidator());
app.use(
  session({
    resave: true,
    name: "connect.sid",
    cookie: { expires: false, secure: true },
    saveUninitialized: false,
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
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
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
require("./config/passport");

//import controllers
import * as authenticationController from "./controllers/authentication";
import * as configurationController from "./controllers/configuration";
import * as configElementController from "./controllers/configElement";
import { Socket } from "dgram";
import { SocketServer } from "./socketServer";

//app routes
//authentication controller common
app.get("/auth/user", authenticationController.getUser);
app.get("/auth/logout", authenticationController.logout);
//facebook
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
//google
app.get(
  "/auth/google",
  authenticationController.redirectRootIfAuthenticated,
  authenticationController.authenticateGoogle()
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  authenticationController.authenticateGoogleCallback()
);

app.get("/api/config/:id/configElement", configElementController.fetchConfigElementsByConfigId);
app.get("/api/config", configurationController.fetchConfigurations);
app.put("/api/config", configurationController.addConfiguration);
app.post("/api/config/:id", configurationController.updateConfiguration);
app.put("/api/config/:configId/configElement/:configElementType", configElementController.addConfigElement);
app.post("/api/configElement/:id", configElementController.updateConfigElement)

const privateKey = fs.readFileSync(path.join(__dirname, "key.pem"));
const certificate = fs.readFileSync(path.join(__dirname, "certificate.pem"));

let server = https.createServer({
  key: privateKey,
  cert: certificate
}, app).listen(app.get("port"), () => {
  console.log(
    "  App is running at https://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

let socketServer = new SocketServer(server);

module.exports = app;
