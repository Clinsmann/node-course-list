require('dotenv').config();
const port = process.env.PORT;

const Sentry = require('@sentry/node');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const productsRoute = require('./controllers/products');
const CourseRoute = require('./controllers/course');
const HomeRoute = require('./controllers/home');

// Sentry.init({ dsn: "https://44db41316ea940dbb15fde9e322b7ee3@o511888.ingest.sentry.io/5609830" });
Sentry.init({ dsn: process.env.SENTRY_DSN });

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to database'));

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.set('view engine', 'ejs');
app.use(cors());//using cors for all api endpoint
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/products', productsRoute);
app.use('/course', CourseRoute);
app.use('/', HomeRoute);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(port, () => console.log('listening to port: ' + port + '...'));