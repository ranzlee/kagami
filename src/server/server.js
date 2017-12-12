const express = require("express");
const app = express();
const mongoose = require('mongoose');


if (process.env.NODE_ENV !== "production") {
  console.log(
    "development mode - using webpack-dev-middleware with HMR enabled"
  );
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const config = require("../../webpack.dev.js");
  const compiler = webpack(config);
  // Tell express to use the webpack-dev-middleware and use the webpack.dev.js configuration file as a base.
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
}

app.get('/MongoTest', (req, res) => {
  var promise = mongoose.connect('mongodb://mongoDb/test', {
    useMongoClient: true,
    /* other options */
  });

  var db = mongoose.connection;
  db.on('error', function (e) {
    console.log(e);
  });

  db.once('open', function () {
    res.send('Connected');
    // we're connected!
  });

})

// Serve the files on port 3000.
app.listen(3000, () => {
  console.log("Qwik app listening on port 3000!\n");
});